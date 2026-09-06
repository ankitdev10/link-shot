import { BRAND_NAME } from '@/constants/site'

export const SHOT_ENDPOINT = '/api/shot'
export const RENDER_LABEL = 'Render screenshot'
export const DOWNLOAD_LABEL = 'Download'
export const RENDERING_LABEL = 'Rendering'
export const EXAMPLE_IMAGE_LIGHT = '/example-light.png'
export const EXAMPLE_IMAGE_DARK = '/example-dark.png'
export const EXAMPLE_CAPTION = 'An example render. Paste a link to make your own.'
export const EMPTY_STATE_HINT =
  'Your screenshot appears here, matted and ready to download.'
export const ERROR_HINT =
  'That link could not be rendered. Check it points to a single public post and try again.'

export const HOME_HEADLINE = 'Post screenshots that look framed, not captured'
export const HOME_INTRO = `Paste a link and ${BRAND_NAME} draws the post as a fresh image. No browser chrome, no cropping, no watermark, and it stays sharp wherever you put it.`
export const HOME_URL_PLACEHOLDER = 'https://x.com/user/status/1234567890'
export const HOME_URL_HINT =
  'X and Twitter links work today. Instagram, Facebook and LinkedIn are on the way.'

export const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dim', label: 'Dim' },
  { value: 'dark', label: 'Dark' },
] as const

export const PADDING_OPTIONS = [
  { value: '0', label: 'None' },
  { value: '24', label: 'Small' },
  { value: '48', label: 'Medium' },
  { value: '96', label: 'Large' },
] as const

export const HERO_EYEBROW = 'Renders X posts today'

export const BENTO_HEADING = 'Built for images you actually ship'
export const BENTO_INTRO =
  'The card is drawn from the post data, not photographed from a page, and everything follows from that.'

export const BENTO = [
  {
    title: 'Twice the resolution',
    detail:
      'Every render is supersampled, so text stays crisp on retina screens and in printed decks instead of turning to mush.',
    span: 'sm:col-span-2',
  },
  {
    title: 'Three card themes',
    detail: 'Light, dim and dark, matched to how the post looks in the app.',
    span: '',
  },
  {
    title: 'No browser in the loop',
    detail: 'No headless Chrome, no cookie banners, no login walls in your image.',
    span: '',
  },
  {
    title: 'Media and quotes included',
    detail:
      'Photos, quoted posts, verified badges, timestamps and counts all land in the card exactly where they belong.',
    span: 'sm:col-span-2',
  },
] as const

export const PLATFORMS_HEADING = 'Pick a platform'
export const PLATFORMS_INTRO =
  'Every network gets its own page, because a LinkedIn post and a tweet do not carry the same information.'

export const STEPS_HEADING = 'How it works'
export const STEPS = [
  {
    title: 'Copy the post link',
    detail: 'Open the post, then copy its address from the share menu or address bar.',
  },
  {
    title: 'Set the frame',
    detail: 'Choose a light, dim or dark card and how much mat sits around it.',
  },
  {
    title: 'Download the image',
    detail: 'The PNG renders at double resolution, ready for slides and articles.',
  },
] as const

export const FAQ_HEADING = 'Common questions'
export const STATUS_LIVE_LABEL = 'Available'
export const STATUS_PLANNED_LABEL = 'In development'
