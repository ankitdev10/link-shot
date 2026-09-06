import {
  MAX_PADDING,
  MAX_SCALE,
  MIN_PADDING,
  MIN_SCALE,
} from '@/constants/render'
import type { ThemeName } from '@/constants/tokens'

export function isThemeName(value: string | null): value is ThemeName {
  return value === 'light' || value === 'dim' || value === 'dark'
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function parseNumber(
  raw: string | null,
  fallback: number,
  min: number,
  max: number,
): number {
  if (raw === null) return fallback
  const parsed = Number(raw)
  if (!Number.isFinite(parsed)) return fallback
  return clampNumber(parsed, min, max)
}

export function parseScale(raw: string | null, fallback: number): number {
  return parseNumber(raw, fallback, MIN_SCALE, MAX_SCALE)
}

export function parsePadding(raw: string | null, fallback: number): number {
  return parseNumber(raw, fallback, MIN_PADDING, MAX_PADDING)
}
