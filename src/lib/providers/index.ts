import { twitterProvider } from '@/lib/providers/twitter'
import { ProviderError, type Post, type Provider } from '@/lib/types'

export const providers: Provider[] = [twitterProvider]

export function resolveProvider(rawUrl: string): { provider: Provider; url: URL } {
  let url: URL
  try {
    url = new URL(rawUrl.trim())
  } catch {
    throw new ProviderError('That is not a valid URL.', 400)
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new ProviderError('Only http and https URLs are supported.', 400)
  }

  const provider = providers.find((candidate) => candidate.match(url))
  if (provider === undefined) {
    const supported = providers.map((candidate) => candidate.name).join(', ')
    throw new ProviderError(
      `No provider handles ${url.hostname}. Supported: ${supported}.`,
      400,
    )
  }

  return { provider, url }
}

export async function fetchPost(rawUrl: string): Promise<Post> {
  const { provider, url } = resolveProvider(rawUrl)
  return provider.fetchPost(url)
}
