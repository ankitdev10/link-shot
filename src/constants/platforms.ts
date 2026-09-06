import { BRAND_NAME } from '@/constants/site'

export type PlatformStatus = 'live' | 'planned'

export type Platform = {
  slug: string
  name: string
  shortName: string
  status: PlatformStatus
  navLabel: string
  pageTitle: string
  metaTitle: string
  metaDescription: string
  headline: string
  intro: string
  urlExample: string
  urlHint: string
  keywords: string[]
  faq: { question: string; answer: string }[]
}

export const PLATFORMS: Platform[] = [
  {
    slug: 'x-post-screenshot',
    name: 'X (Twitter)',
    shortName: 'X',
    status: 'live',
    navLabel: 'X',
    pageTitle: 'X post screenshot',
    metaTitle: 'X Post Screenshot — Turn a Tweet Into a Clean Image',
    metaDescription:
      'Paste an X or Twitter post link and download a crisp PNG screenshot. Light, dim and dark themes, adjustable padding, no login and no watermark.',
    headline: 'Screenshot an X post without the clutter',
    intro:
      'Paste the link to any public post on X and get back a clean, high resolution image. No sidebars, no cookie banners, no cropping by hand.',
    urlExample: 'https://x.com/user/status/1234567890',
    urlHint: 'Works with x.com and twitter.com links to a single public post.',
    keywords: [
      'x post screenshot',
      'tweet screenshot',
      'screenshot a tweet',
      'tweet to image',
      'twitter screenshot generator',
    ],
    faq: [
      {
        question: 'How do I screenshot a post on X?',
        answer:
          'Open the post on x.com, copy the link from the share menu or your address bar, paste it above and press Render screenshot. You can download the PNG straight away.',
      },
      {
        question: 'Does it capture images and quoted posts?',
        answer:
          'Yes. Attached photos and quoted posts are rendered inside the card, along with the author, timestamp, likes and replies.',
      },
      {
        question: 'Can I screenshot a private or deleted post?',
        answer:
          'No. Only posts that are publicly visible can be rendered, because the tool reads the same public data an embedded post uses.',
      },
    ],
  },
  {
    slug: 'instagram-post-screenshot',
    name: 'Instagram',
    shortName: 'Instagram',
    status: 'planned',
    navLabel: 'Instagram',
    pageTitle: 'Instagram post screenshot',
    metaTitle: 'Instagram Post Screenshot — Clean Image Export',
    metaDescription:
      `Turn an Instagram post link into a clean, shareable image. Instagram support is in development at ${BRAND_NAME}.`,
    headline: 'Screenshot an Instagram post',
    intro:
      'Instagram support is being built. The renderer and the card layout already work, so what remains is a reliable way to read public post data.',
    urlExample: 'https://www.instagram.com/p/Cxxxxxxxxxx/',
    urlHint: 'Instagram links are not accepted yet.',
    keywords: [
      'instagram post screenshot',
      'instagram to image',
      'screenshot instagram post',
    ],
    faq: [
      {
        question: 'Can I screenshot an Instagram post today?',
        answer:
          'Not yet. Instagram does not expose public post data the way X does, so it needs a different approach before it can ship.',
      },
      {
        question: 'What works right now?',
        answer:
          'X and Twitter links are fully supported today, with the same themes and padding options planned for every other platform.',
      },
    ],
  },
  {
    slug: 'facebook-post-screenshot',
    name: 'Facebook',
    shortName: 'Facebook',
    status: 'planned',
    navLabel: 'Facebook',
    pageTitle: 'Facebook post screenshot',
    metaTitle: 'Facebook Post Screenshot — Clean Image Export',
    metaDescription:
      `Turn a Facebook post link into a clean, shareable image. Facebook support is in development at ${BRAND_NAME}.`,
    headline: 'Screenshot a Facebook post',
    intro:
      'Facebook support is being built. The card layout is platform neutral already, so adding Facebook is a matter of reading public post data reliably.',
    urlExample: 'https://www.facebook.com/user/posts/1234567890',
    urlHint: 'Facebook links are not accepted yet.',
    keywords: [
      'facebook post screenshot',
      'facebook to image',
      'screenshot facebook post',
    ],
    faq: [
      {
        question: 'Can I screenshot a Facebook post today?',
        answer:
          'Not yet. Facebook requires authentication for most post data, so it needs a different approach before it can ship.',
      },
      {
        question: 'What works right now?',
        answer:
          'X and Twitter links are fully supported today, with the same themes and padding options planned for every other platform.',
      },
    ],
  },
  {
    slug: 'linkedin-post-screenshot',
    name: 'LinkedIn',
    shortName: 'LinkedIn',
    status: 'planned',
    navLabel: 'LinkedIn',
    pageTitle: 'LinkedIn post screenshot',
    metaTitle: 'LinkedIn Post Screenshot — Clean Image Export',
    metaDescription:
      `Turn a LinkedIn post link into a clean, shareable image. LinkedIn support is in development at ${BRAND_NAME}.`,
    headline: 'Screenshot a LinkedIn post',
    intro:
      'LinkedIn support is being built. Long posts and document carousels need layout work before it can render them faithfully.',
    urlExample: 'https://www.linkedin.com/posts/user_activity-1234567890',
    urlHint: 'LinkedIn links are not accepted yet.',
    keywords: [
      'linkedin post screenshot',
      'linkedin to image',
      'screenshot linkedin post',
    ],
    faq: [
      {
        question: 'Can I screenshot a LinkedIn post today?',
        answer:
          'Not yet. LinkedIn does not offer public post data without authentication, so it needs a different approach before it can ship.',
      },
      {
        question: 'What works right now?',
        answer:
          'X and Twitter links are fully supported today, with the same themes and padding options planned for every other platform.',
      },
    ],
  },
]

export function findPlatform(slug: string): Platform | undefined {
  return PLATFORMS.find((platform) => platform.slug === slug)
}

export const LIVE_PLATFORMS = PLATFORMS.filter(
  (platform) => platform.status === 'live',
)
