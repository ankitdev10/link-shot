const THOUSAND = 1000
const MILLION = 1_000_000

export function formatCount(value: number | undefined): string | null {
  if (value === undefined) return null
  if (value < THOUSAND) return String(value)
  if (value < MILLION) {
    const scaled = value / THOUSAND
    return `${scaled.toFixed(scaled < 10 ? 1 : 0).replace(/\.0$/, '')}K`
  }
  return `${(value / MILLION).toFixed(1).replace(/\.0$/, '')}M`
}

export function formatTimestamp(iso: string | null): string | null {
  if (iso === null) return null
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
