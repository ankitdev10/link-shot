import { PLATFORM_ACCENTS } from '@/constants/tokens'
import {
  AVATAR_SIZE_LARGE,
  AVATAR_SIZE_TOKEN,
  SYNDICATION_ENDPOINT,
  SYNDICATION_USER_AGENT,
  TRAILING_LINK_PATTERN,
  TWITTER_HOSTS,
  TWITTER_STATUS_PATTERN,
} from '@/constants/twitter'
import {
  ProviderError,
  type Author,
  type Media,
  type Post,
  type Provider,
  type QuotedPost,
} from '@/lib/types'

type RawUser = {
  name: string
  screen_name: string
  profile_image_url_https: string
  verified?: boolean
  is_blue_verified?: boolean
}

type RawMedia = {
  media_url_https: string
  type: string
  original_info?: { width: number; height: number }
}

type RawTweet = {
  id_str: string
  text?: string
  created_at?: string
  user: RawUser
  favorite_count?: number
  conversation_count?: number
  mediaDetails?: RawMedia[]
  quoted_tweet?: RawTweet
}

const RADIX = 36
const TOKEN_SCALE = 1e15
const FALLBACK_MEDIA_WIDTH = 1200
const FALLBACK_MEDIA_HEIGHT = 675

function extractTweetId(url: URL): string | null {
  return TWITTER_STATUS_PATTERN.exec(url.pathname)?.[1] ?? null
}

function buildSyndicationToken(id: string): string {
  return ((Number(id) / TOKEN_SCALE) * Math.PI)
    .toString(RADIX)
    .replace(/(0+|\.)/g, '')
}

function toAuthor(user: RawUser): Author {
  return {
    name: user.name,
    handle: user.screen_name,
    avatarUrl: user.profile_image_url_https.replace(
      AVATAR_SIZE_TOKEN,
      AVATAR_SIZE_LARGE,
    ),
    verified: Boolean(user.verified ?? user.is_blue_verified),
  }
}

function toMedia(details: RawMedia[] | undefined): Media[] {
  if (details === undefined) return []
  return details.map((item) => ({
    url: item.media_url_https,
    width: item.original_info?.width ?? FALLBACK_MEDIA_WIDTH,
    height: item.original_info?.height ?? FALLBACK_MEDIA_HEIGHT,
    kind: item.type === 'photo' ? 'photo' : 'video',
  }))
}

function toText(raw: string | undefined, hasMedia: boolean): string {
  const text = raw ?? ''
  return hasMedia ? text.replace(TRAILING_LINK_PATTERN, '') : text
}

function toQuoted(raw: RawTweet | undefined): QuotedPost | null {
  if (raw === undefined) return null
  const media = toMedia(raw.mediaDetails)
  return {
    id: raw.id_str,
    url: `https://x.com/${raw.user.screen_name}/status/${raw.id_str}`,
    author: toAuthor(raw.user),
    text: toText(raw.text, media.length > 0),
    media,
    createdAt: raw.created_at ?? null,
  }
}

function toPost(raw: RawTweet, url: URL): Post {
  const media = toMedia(raw.mediaDetails)
  return {
    id: raw.id_str,
    url: url.toString(),
    platform: 'twitter',
    accent: PLATFORM_ACCENTS.twitter,
    author: toAuthor(raw.user),
    text: toText(raw.text, media.length > 0),
    media,
    createdAt: raw.created_at ?? null,
    metrics: {
      likes: raw.favorite_count,
      replies: raw.conversation_count,
    },
    quoted: toQuoted(raw.quoted_tweet),
  }
}

async function fetchPost(url: URL): Promise<Post> {
  const id = extractTweetId(url)
  if (id === null) {
    throw new ProviderError('Could not find a tweet id in that URL.', 400)
  }

  const endpoint = new URL(SYNDICATION_ENDPOINT)
  endpoint.searchParams.set('id', id)
  endpoint.searchParams.set('lang', 'en')
  endpoint.searchParams.set('token', buildSyndicationToken(id))

  const response = await fetch(endpoint, {
    headers: {
      'user-agent': SYNDICATION_USER_AGENT,
      accept: 'application/json',
    },
  })

  if (response.status === 404) {
    throw new ProviderError('That tweet does not exist or has been deleted.', 404)
  }
  if (!response.ok) {
    throw new ProviderError(`X returned ${response.status} for that tweet.`, 502)
  }

  const raw = (await response.json()) as Partial<RawTweet>
  if (raw.user === undefined || raw.id_str === undefined) {
    throw new ProviderError(
      'That tweet is protected, age restricted, or otherwise not publicly embeddable.',
      403,
    )
  }

  return toPost(raw as RawTweet, url)
}

export const twitterProvider: Provider = {
  name: 'twitter',
  match: (url) =>
    TWITTER_HOSTS.has(url.hostname.toLowerCase()) && extractTweetId(url) !== null,
  fetchPost,
}
