import { Badge } from '@/components/ui/badge'

export function ShowroomHero({
  eyebrow,
  headline,
  intro,
  children,
}: {
  eyebrow: string
  headline: string
  intro: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <section className="showroom dark text-foreground -mt-14 pt-14">
      <div className="aurora" aria-hidden />
      <div className="grid-lines" aria-hidden />
      <div className="grain" aria-hidden />
      <div className="beam" aria-hidden />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-9 px-5 pt-20 pb-28 sm:pt-28">
        <Badge
          variant="secondary"
          className="border-white/12 bg-white/8 text-foreground/80 rounded-full px-3 py-1 backdrop-blur"
        >
          {eyebrow}
        </Badge>

        <div className="flex max-w-4xl flex-col items-center gap-6 text-center">
          <h1 className="sheen text-[clamp(2.75rem,8vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.035em] text-balance">
            {headline}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-white/55 text-pretty sm:text-xl">
            {intro}
          </p>
        </div>

        {children}
      </div>
    </section>
  )
}
