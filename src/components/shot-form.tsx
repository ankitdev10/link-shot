'use client'

import { Download, Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { DEFAULT_PADDING } from '@/constants/render'
import {
  EMPTY_STATE_HINT,
  ERROR_HINT,
  EXAMPLE_CAPTION,
  EXAMPLE_IMAGE_LIGHT,
  PADDING_OPTIONS,
  RENDER_LABEL,
  SHOT_ENDPOINT,
  THEME_OPTIONS,
} from '@/constants/ui'

type Status = 'idle' | 'loading' | 'ready' | 'error'

type Option = { readonly value: string; readonly label: string }

function labelFor(options: readonly Option[], value: unknown): string {
  return options.find((option) => option.value === value)?.label ?? ''
}

export function ShotForm({
  placeholder,
  hint,
  disabled = false,
  showExample = false,
}: {
  placeholder: string
  hint: string
  disabled?: boolean
  showExample?: boolean
}): React.ReactElement {
  const [url, setUrl] = useState('')
  const [theme, setTheme] = useState<string>(THEME_OPTIONS[0].value)
  const [padding, setPadding] = useState(String(DEFAULT_PADDING))
  const [submitted, setSubmitted] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')

  const shotUrl = useMemo(() => {
    if (submitted === null) return null
    const params = new URLSearchParams({ url: submitted, theme, padding })
    return `${SHOT_ENDPOINT}?${params.toString()}`
  }, [submitted, theme, padding])

  const markPending = (): void => {
    if (submitted !== null) setStatus('loading')
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <form
        className="flex w-full max-w-2xl flex-col items-center gap-4"
        onSubmit={(event) => {
          event.preventDefault()
          const next = url.trim() === '' ? null : url.trim()
          setSubmitted(next)
          setStatus(next === null ? 'idle' : 'loading')
        }}
      >
        <div className="bg-card focus-within:border-ring focus-within:ring-ring/25 flex w-full items-center gap-2 rounded-2xl border p-2 shadow-sm transition-shadow focus-within:ring-4">
          <Label htmlFor="url" className="sr-only">
            Post link
          </Label>
          <Input
            id="url"
            name="url"
            type="url"
            value={url}
            disabled={disabled}
            onChange={(event) => {
              setUrl(event.target.value)
            }}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck={false}
            className="h-11 flex-1 border-0 bg-transparent px-3 text-base shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
          />
          <Button
            type="submit"
            size="lg"
            disabled={disabled}
            className="h-11 rounded-xl px-5"
          >
            {status === 'loading' ? <Loader2 className="size-4 animate-spin" /> : null}
            {RENDER_LABEL}
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="theme" className="text-muted-foreground text-xs">
              Theme
            </Label>
            <Select
              value={theme}
              onValueChange={(value) => {
                if (value === null) return
                setTheme(value)
                markPending()
              }}
            >
              <SelectTrigger id="theme" size="sm" className="w-26">
                <SelectValue>{(value) => labelFor(THEME_OPTIONS, value)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {THEME_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="padding" className="text-muted-foreground text-xs">
              Padding
            </Label>
            <Select
              value={padding}
              onValueChange={(value) => {
                if (value === null) return
                setPadding(value)
                markPending()
              }}
            >
              <SelectTrigger id="padding" size="sm" className="w-26">
                <SelectValue>{(value) => labelFor(PADDING_OPTIONS, value)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {PADDING_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-muted-foreground w-full text-center text-xs sm:w-auto">
            {hint}
          </p>
        </div>
      </form>

      <figure className="deck w-full">
        <div className="deck-plate relative mx-auto w-full max-w-2xl">
          <div className="deck-ghost -top-5 scale-[0.93] opacity-30" />
          <div className="deck-ghost -top-2.5 scale-[0.965] opacity-50" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:p-4">
            {shotUrl === null && showExample ? (
              <img
                src={EXAMPLE_IMAGE_LIGHT}
                alt="Example of a rendered post screenshot"
                width={1200}
                height={454}
                className="w-full rounded-xl"
              />
            ) : null}
            {shotUrl === null && !showExample ? (
              <p className="text-muted-foreground px-6 py-20 text-center text-sm">
                {EMPTY_STATE_HINT}
              </p>
            ) : null}
            {shotUrl === null ? null : (
              <>
                {status === 'loading' ? (
                  <Skeleton className="h-64 w-full rounded-xl bg-white/10" />
                ) : null}
                {status === 'error' ? (
                  <p className="text-muted-foreground px-6 py-20 text-center text-sm">
                    {ERROR_HINT}
                  </p>
                ) : null}
                <img
                  src={shotUrl}
                  alt="Screenshot rendered from the submitted post link"
                  data-hidden={status !== 'ready'}
                  className="w-full rounded-xl data-[hidden=true]:hidden"
                  onLoad={() => {
                    setStatus('ready')
                  }}
                  onError={() => {
                    setStatus('error')
                  }}
                />
              </>
            )}
          </div>
        </div>
      </figure>

      <figcaption className="text-muted-foreground -mt-2 text-xs">
        {status === 'ready' && shotUrl !== null ? (
          <Button
            variant="outline"
            size="sm"
            render={
              <a href={shotUrl} download>
                <Download className="size-4" />
                Download PNG
              </a>
            }
          />
        ) : (
          EXAMPLE_CAPTION
        )}
      </figcaption>

    </div>
  )
}
