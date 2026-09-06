export type MediaKind = 'photo' | 'video'

export type Media = {
  url: string
  width: number
  height: number
  kind: MediaKind
}

export type Author = {
  name: string
  handle: string
  avatarUrl: string
  verified: boolean
}

export type Metrics = {
  likes?: number
  replies?: number
  reposts?: number
}

export type QuotedPost = {
  id: string
  url: string
  author: Author
  text: string
  media: Media[]
  createdAt: string | null
}

export type Post = {
  id: string
  url: string
  platform: string
  accent: string
  author: Author
  text: string
  media: Media[]
  createdAt: string | null
  metrics: Metrics
  quoted: QuotedPost | null
}

export type Provider = {
  name: string
  match: (url: URL) => boolean
  fetchPost: (url: URL) => Promise<Post>
}

export class ProviderError extends Error {
  readonly status: number

  constructor(message: string, status = 502) {
    super(message)
    this.name = 'ProviderError'
    this.status = status
  }
}
