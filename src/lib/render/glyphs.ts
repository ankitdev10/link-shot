import {
  GOOGLE_FONTS_CSS,
  LEGACY_USER_AGENT,
  SCRIPT_FONTS,
  TWEMOJI_BASE,
} from '@/constants/render'

const ZERO_WIDTH_JOINER = 0x200d
const VARIATION_SELECTOR = 0xfe0f

const emojiCache = new Map<string, string>()
const fontCache = new Map<string, ArrayBuffer | null>()

function toTwemojiName(segment: string): string {
  const points = Array.from(segment, (character) => character.codePointAt(0) ?? 0)
  const hasJoiner = points.includes(ZERO_WIDTH_JOINER)
  const kept = hasJoiner
    ? points
    : points.filter((point) => point !== VARIATION_SELECTOR)
  return kept.map((point) => point.toString(16)).join('-')
}

async function loadEmoji(segment: string): Promise<string> {
  const cached = emojiCache.get(segment)
  if (cached !== undefined) return cached

  const name = toTwemojiName(segment)
  const response = await fetch(`${TWEMOJI_BASE}/${name}.svg`)
  if (!response.ok) {
    throw new Error(`No emoji asset for ${name}`)
  }

  const svg = await response.text()
  const encoded = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
  emojiCache.set(segment, encoded)
  return encoded
}

async function loadScriptFont(
  code: string,
  segment: string,
): Promise<ArrayBuffer | null> {
  const family = SCRIPT_FONTS[code]
  if (family === undefined) return null

  const key = `${family}:${segment}`
  const cached = fontCache.get(key)
  if (cached !== undefined) return cached

  const endpoint = new URL(GOOGLE_FONTS_CSS)
  endpoint.searchParams.set('family', family)
  endpoint.searchParams.set('text', segment)

  const css = await fetch(endpoint, {
    headers: { 'user-agent': LEGACY_USER_AGENT },
  }).then((response) => response.text())

  const url = /src:\s*url\((https:\/\/[^)]+)\)/.exec(css)?.[1]
  if (url === undefined) {
    fontCache.set(key, null)
    return null
  }

  const data = await fetch(url).then((response) => response.arrayBuffer())
  fontCache.set(key, data)
  return data
}

export async function loadAdditionalAsset(
  code: string,
  segment: string,
): Promise<string | { name: string; data: ArrayBuffer; weight: 400; style: 'normal' }[]> {
  if (code === 'emoji') {
    try {
      return await loadEmoji(segment)
    } catch {
      return []
    }
  }

  try {
    const data = await loadScriptFont(code, segment)
    if (data === null) return []
    const family = SCRIPT_FONTS[code] ?? code
    return [{ name: family, data, weight: 400 as const, style: 'normal' as const }]
  } catch {
    return []
  }
}
