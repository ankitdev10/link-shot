import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'

import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '@/constants/seo'
import { CARD_THEMES } from '@/constants/tokens'
import { loadFonts } from '@/lib/render/fonts'
import { loadAdditionalAsset } from '@/lib/render/glyphs'

const theme = CARD_THEMES.dim

function OgCard({
  title,
  subtitle,
  brand,
}: {
  title: string
  subtitle: string
  brand: string
}): React.ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        padding: 80,
        backgroundImage: `linear-gradient(135deg, ${theme.pageFrom}, ${theme.pageTo})`,
        fontFamily: 'Inter',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 26,
          fontWeight: 500,
          letterSpacing: 2,
          color: theme.muted,
        }}
      >
        {brand.toUpperCase()}
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 24,
          fontSize: 68,
          fontWeight: 700,
          lineHeight: 1.15,
          color: theme.text,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 24,
          fontSize: 30,
          lineHeight: 1.4,
          color: theme.muted,
        }}
      >
        {subtitle}
      </div>
    </div>
  )
}

export async function renderOgPng(
  title: string,
  subtitle: string,
  brand: string,
): Promise<Uint8Array> {
  const fonts = await loadFonts()

  const svg = await satori(
    <OgCard title={title} subtitle={subtitle} brand={brand} />,
    {
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      fonts: fonts.map((font) => ({
        name: font.name,
        data: font.data,
        weight: font.weight,
        style: font.style,
      })),
      loadAdditionalAsset,
    },
  )

  return new Resvg(svg).render().asPng()
}
