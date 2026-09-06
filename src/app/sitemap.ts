import type { MetadataRoute } from 'next'

import { PLATFORMS } from '@/constants/platforms'
import { SITE_URL } from '@/constants/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...PLATFORMS.map((platform) => ({
      url: `${SITE_URL}/${platform.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: platform.status === 'live' ? 0.9 : 0.6,
    })),
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
