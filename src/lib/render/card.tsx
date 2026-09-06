import {
  AVATAR_SIZE,
  CARD_PADDING,
  CARD_RADIUS,
  CARD_WIDTH,
  FONT_FAMILY,
  MEDIA_GAP,
  MEDIA_GRID_HEIGHT,
  MEDIA_MAX_COUNT,
  MEDIA_PAIR_HEIGHT,
  MEDIA_SINGLE_MAX_HEIGHT,
  QUOTE_AVATAR_SIZE,
  TEXT_LENGTH_LARGE,
  TEXT_LENGTH_MEDIUM,
  TEXT_SIZE_LARGE,
  TEXT_SIZE_MEDIUM,
  TEXT_SIZE_SMALL,
} from '@/constants/render'
import type { CardTheme } from '@/constants/tokens'
import type { Media, Post, QuotedPost } from '@/lib/types'
import { formatCount, formatTimestamp } from '@/utils/format'

const CONTENT_WIDTH = CARD_WIDTH - CARD_PADDING * 2
const DEFAULT_ASPECT = 0.5625

function resolveTextSize(length: number): number {
  if (length > TEXT_LENGTH_LARGE) return TEXT_SIZE_SMALL
  if (length > TEXT_LENGTH_MEDIUM) return TEXT_SIZE_MEDIUM
  return TEXT_SIZE_LARGE
}

function resolveMediaHeight(item: Media, count: number, width: number): number {
  if (count === 1) {
    const ratio = item.width > 0 ? item.height / item.width : DEFAULT_ASPECT
    return Math.min(Math.round(width * ratio), MEDIA_SINGLE_MAX_HEIGHT)
  }
  return count === 2 ? MEDIA_PAIR_HEIGHT : MEDIA_GRID_HEIGHT
}

function VerifiedBadge({ color }: { color: string }): React.ReactElement {
  return (
    <svg width={20} height={20} viewBox="0 0 22 22" style={{ marginLeft: 4 }}>
      <path
        fill={color}
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.816.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.303 1.906.185.64-.118 1.232-.413 1.703-.85.437-.47.732-1.063.85-1.702.117-.64.052-1.3-.188-1.905.586-.274 1.084-.705 1.438-1.246.354-.54.551-1.17.569-1.816zm-11.334 4.264L5.68 11.882l1.318-1.316 2.063 2.063 5.303-5.302 1.318 1.317z"
      />
    </svg>
  )
}

function MediaGrid({
  media,
  theme,
  width,
}: {
  media: Media[]
  theme: CardTheme
  width: number
}): React.ReactElement | null {
  const visible = media.slice(0, MEDIA_MAX_COUNT)
  if (visible.length === 0) return null

  const itemWidth =
    visible.length === 1 ? width : Math.floor((width - MEDIA_GAP) / 2)

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: MEDIA_GAP,
        marginTop: 14,
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${theme.border}`,
      }}
    >
      {visible.map((item) => {
        const height = resolveMediaHeight(item, visible.length, itemWidth)
        return (
          <img
            key={item.url}
            src={item.url}
            width={itemWidth}
            height={height}
            style={{ width: itemWidth, height, objectFit: 'cover' }}
          />
        )
      })}
    </div>
  )
}

function QuotedCard({
  post,
  theme,
}: {
  post: QuotedPost
  theme: CardTheme
}): React.ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 14,
        padding: 14,
        borderRadius: 16,
        border: `1px solid ${theme.border}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={post.author.avatarUrl}
          width={QUOTE_AVATAR_SIZE}
          height={QUOTE_AVATAR_SIZE}
          style={{ borderRadius: QUOTE_AVATAR_SIZE / 2, marginRight: 8 }}
        />
        <div style={{ display: 'flex', fontSize: 15, fontWeight: 700, color: theme.text }}>
          {post.author.name}
        </div>
        <div style={{ display: 'flex', fontSize: 15, color: theme.muted, marginLeft: 6 }}>
          @{post.author.handle}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 6,
          fontSize: 16,
          lineHeight: 1.4,
          color: theme.text,
          whiteSpace: 'pre-wrap',
        }}
      >
        {post.text}
      </div>
    </div>
  )
}

function Footer({
  post,
  theme,
}: {
  post: Post
  theme: CardTheme
}): React.ReactElement {
  const timestamp = formatTimestamp(post.createdAt)
  const likes = formatCount(post.metrics.likes)
  const replies = formatCount(post.metrics.replies)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 16,
        borderTop: `1px solid ${theme.border}`,
        fontSize: 16,
        color: theme.muted,
      }}
    >
      {timestamp === null ? null : <div style={{ display: 'flex' }}>{timestamp}</div>}
      {likes === null ? null : (
        <div style={{ display: 'flex', marginLeft: 16 }}>
          <span style={{ color: theme.text, fontWeight: 700 }}>{likes}</span>
          <span style={{ marginLeft: 5 }}>Likes</span>
        </div>
      )}
      {replies === null ? null : (
        <div style={{ display: 'flex', marginLeft: 16 }}>
          <span style={{ color: theme.text, fontWeight: 700 }}>{replies}</span>
          <span style={{ marginLeft: 5 }}>Replies</span>
        </div>
      )}
    </div>
  )
}

export function Card({
  post,
  theme,
  padding,
}: {
  post: Post
  theme: CardTheme
  padding: number
}): React.ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        width: CARD_WIDTH + padding * 2,
        padding,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(135deg, ${theme.pageFrom}, ${theme.pageTo})`,
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: CARD_WIDTH,
          padding: CARD_PADDING,
          borderRadius: CARD_RADIUS,
          backgroundColor: theme.surface,
          border: `1px solid ${theme.border}`,
          boxShadow: theme.shadow,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={post.author.avatarUrl}
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            style={{ borderRadius: AVATAR_SIZE / 2 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{ display: 'flex', fontSize: 19, fontWeight: 700, color: theme.text }}
              >
                {post.author.name}
              </div>
              {post.author.verified ? <VerifiedBadge color={post.accent} /> : null}
            </div>
            <div style={{ display: 'flex', fontSize: 17, color: theme.muted, marginTop: 2 }}>
              @{post.author.handle}
            </div>
          </div>
        </div>

        {post.text === '' ? null : (
          <div
            style={{
              display: 'flex',
              marginTop: 18,
              fontSize: resolveTextSize(post.text.length),
              lineHeight: 1.38,
              color: theme.text,
              whiteSpace: 'pre-wrap',
            }}
          >
            {post.text}
          </div>
        )}

        <MediaGrid media={post.media} theme={theme} width={CONTENT_WIDTH} />
        {post.quoted === null ? null : <QuotedCard post={post.quoted} theme={theme} />}
        <Footer post={post} theme={theme} />
      </div>
    </div>
  )
}
