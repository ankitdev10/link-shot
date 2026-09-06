export type ThemeName = 'light' | 'dim' | 'dark'

export type CardTheme = {
  pageFrom: string
  pageTo: string
  surface: string
  border: string
  text: string
  muted: string
  shadow: string
}

export const CARD_THEMES: Record<ThemeName, CardTheme> = {
  light: {
    pageFrom: '#eef2f7',
    pageTo: '#dbe4ee',
    surface: '#ffffff',
    border: '#e5e7eb',
    text: '#0f1419',
    muted: '#5b7083',
    shadow: '0 24px 60px rgba(15, 23, 42, 0.16)',
  },
  dim: {
    pageFrom: '#22303c',
    pageTo: '#15202b',
    surface: '#15202b',
    border: '#38444d',
    text: '#f7f9f9',
    muted: '#8899a6',
    shadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
  },
  dark: {
    pageFrom: '#1c1c1c',
    pageTo: '#000000',
    surface: '#000000',
    border: '#2f3336',
    text: '#e7e9ea',
    muted: '#71767b',
    shadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
  },
}

export const PLATFORM_ACCENTS = {
  twitter: '#1d9bf0',
} as const
