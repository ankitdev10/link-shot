export const TWITTER_HOSTS = new Set([
  'twitter.com',
  'www.twitter.com',
  'x.com',
  'www.x.com',
  'mobile.twitter.com',
  'mobile.x.com',
  'fxtwitter.com',
  'vxtwitter.com',
])

export const TWITTER_STATUS_PATTERN = /\/status(?:es)?\/(\d+)/
export const SYNDICATION_ENDPOINT = 'https://cdn.syndication.twimg.com/tweet-result'
export const SYNDICATION_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
export const AVATAR_SIZE_TOKEN = '_normal'
export const AVATAR_SIZE_LARGE = '_400x400'
export const TRAILING_LINK_PATTERN = /\s*https:\/\/t\.co\/\w+\s*$/
