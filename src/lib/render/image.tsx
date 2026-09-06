import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'

import { CARD_WIDTH } from '@/constants/render'
import type { CardTheme } from '@/constants/tokens'
import { Card } from '@/lib/render/card'
import { loadFonts } from '@/lib/render/fonts'
import type { Post } from '@/lib/types'

export type RenderOptions = {
  post: Post
  theme: CardTheme
  padding: number
  scale: number
}

export async function renderPostPng({
  post,
  theme,
  padding,
  scale,
}: RenderOptions): Promise<Uint8Array> {
  const fonts = await loadFonts()
  const width = CARD_WIDTH + padding * 2

  const svg = await satori(<Card post={post} theme={theme} padding={padding} />, {
    width,
    fonts: fonts.map((font) => ({
      name: font.name,
      data: font.data,
      weight: font.weight,
      style: font.style,
    })),
  })

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: Math.round(width * scale) },
  })

  return resvg.render().asPng()
}
