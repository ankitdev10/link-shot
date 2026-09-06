import type { NextRequest } from 'next/server'

import { DEFAULT_PADDING, DEFAULT_SCALE } from '@/constants/render'
import { CARD_THEMES } from '@/constants/tokens'
import { fetchPost } from '@/lib/providers'
import { renderPostPng } from '@/lib/render/image'
import { ProviderError } from '@/lib/types'
import { isThemeName, parsePadding, parseScale } from '@/utils/params'

export const runtime = 'nodejs'

const PNG_HEADERS = {
  'content-type': 'image/png',
  'cache-control':
    'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
}

function errorResponse(message: string, status: number): Response {
  return Response.json({ error: message }, { status })
}

export async function GET(request: NextRequest): Promise<Response> {
  const params = request.nextUrl.searchParams
  const target = params.get('url')

  if (target === null || target === '') {
    return errorResponse('Missing required "url" query parameter.', 400)
  }

  const themeParam = params.get('theme')
  const theme = CARD_THEMES[isThemeName(themeParam) ? themeParam : 'light']
  const padding = parsePadding(params.get('padding'), DEFAULT_PADDING)
  const scale = parseScale(params.get('scale'), DEFAULT_SCALE)

  try {
    const post = await fetchPost(target)
    const png = await renderPostPng({ post, theme, padding, scale })
    return new Response(png as BodyInit, { headers: PNG_HEADERS })
  } catch (error: unknown) {
    if (error instanceof ProviderError) {
      return errorResponse(error.message, error.status)
    }
    return errorResponse('Failed to render that post.', 500)
  }
}
