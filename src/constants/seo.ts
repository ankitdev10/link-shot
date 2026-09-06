import { BRAND_NAME } from '@/constants/site'
import { env } from '@/env'

export const SITE_URL = env.NEXT_PUBLIC_SITE_URL

export const SITE_NAME = BRAND_NAME
export const SITE_TITLE = `${BRAND_NAME} — Turn any post link into a clean screenshot`
export const SITE_TITLE_TEMPLATE = `%s | ${BRAND_NAME}`

export const SITE_DESCRIPTION =
  'Paste a tweet or X post link and get a crisp, shareable PNG screenshot in seconds. Light, dim and dark themes, adjustable padding, and a free image API. No login, no watermark.'

export const SITE_KEYWORDS = [
  'tweet screenshot',
  'tweet to image',
  'screenshot tweet',
  'x post screenshot',
  'twitter screenshot generator',
  'tweet image generator',
  'tweet to png',
  'social post screenshot',
  'tweet card generator',
  'screenshot api',
]

export const OG_IMAGE_ALT = `${BRAND_NAME} — turn any post link into a clean screenshot`
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_LOCALE = 'en_US'
export const TWITTER_CARD = 'summary_large_image'

export const FAQ = [
  {
    question: 'How do I screenshot a tweet?',
    answer:
      `Paste the tweet or X post URL into ${BRAND_NAME} and press Render screenshot. You get a high resolution PNG of the post that you can download or share immediately.`,
  },
  {
    question: `Is ${BRAND_NAME} free?`,
    answer:
      'Yes. Rendering screenshots is free, there is no account to create, and images have no watermark.',
  },
  {
    question: 'Can I use it as an API?',
    answer:
      'Yes. Request /api/shot with a url query parameter and it returns a PNG directly, so you can embed it anywhere an image tag works.',
  },
  {
    question: 'Does it work on private or deleted posts?',
    answer:
      `No. ${BRAND_NAME} only renders posts that are publicly visible, because it reads the same public data an embedded post uses.`,
  },
]
