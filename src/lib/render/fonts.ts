import {
  FONT_FAMILY,
  FONT_WEIGHTS,
  GOOGLE_FONTS_CSS,
  LEGACY_USER_AGENT,
} from '@/constants/render'

type FontWeight = (typeof FONT_WEIGHTS)[number]

export type LoadedFont = {
  name: string
  data: ArrayBuffer
  weight: FontWeight
  style: 'normal'
}

const FACE_SEPARATOR = '@font-face'
const WEIGHT_PATTERN = /font-weight:\s*(\d+)/
const URL_PATTERN = /src:\s*url\((https:\/\/[^)]+\.ttf)\)/

let pending: Promise<LoadedFont[]> | null = null

async function resolveFontUrls(): Promise<Map<number, string>> {
  const endpoint = new URL(GOOGLE_FONTS_CSS)
  endpoint.searchParams.set('family', `${FONT_FAMILY}:wght@${FONT_WEIGHTS.join(';')}`)

  const response = await fetch(endpoint, {
    headers: { 'user-agent': LEGACY_USER_AGENT },
  })
  if (!response.ok) {
    throw new Error(`Font stylesheet request failed with ${response.status}.`)
  }

  const stylesheet = await response.text()
  const urls = new Map<number, string>()

  for (const face of stylesheet.split(FACE_SEPARATOR)) {
    const weight = WEIGHT_PATTERN.exec(face)?.[1]
    const url = URL_PATTERN.exec(face)?.[1]
    if (weight !== undefined && url !== undefined) {
      urls.set(Number(weight), url)
    }
  }

  return urls
}

async function downloadFonts(): Promise<LoadedFont[]> {
  const urls = await resolveFontUrls()

  return Promise.all(
    FONT_WEIGHTS.map(async (weight) => {
      const url = urls.get(weight)
      if (url === undefined) {
        throw new Error(`No TrueType face for ${FONT_FAMILY} ${weight}.`)
      }
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Font download failed with ${response.status}.`)
      }
      return {
        name: FONT_FAMILY,
        data: await response.arrayBuffer(),
        weight,
        style: 'normal' as const,
      }
    }),
  )
}

export function loadFonts(): Promise<LoadedFont[]> {
  pending ??= downloadFonts().catch((error: unknown) => {
    pending = null
    throw error
  })
  return pending
}
