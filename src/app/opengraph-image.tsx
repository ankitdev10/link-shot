import {
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
} from '@/constants/seo'
import { HOME_HEADLINE, HOME_INTRO } from '@/constants/ui'
import { renderOgPng } from '@/lib/render/og'

export const alt = OG_IMAGE_ALT
export const size = { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT }
export const contentType = 'image/png'

export default async function OpengraphImage(): Promise<Response> {
  const png = await renderOgPng(HOME_HEADLINE, HOME_INTRO, SITE_NAME)
  return new Response(png as BodyInit, {
    headers: { 'content-type': contentType },
  })
}
