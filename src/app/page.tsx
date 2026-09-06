import type { Metadata } from 'next'

import { PlatformGrid } from '@/components/platform-grid'
import { Section } from '@/components/section'
import { ShotForm } from '@/components/shot-form'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/constants/seo'
import {
  HOME_HEADLINE,
  HOME_INTRO,
  HOME_URL_HINT,
  HOME_URL_PLACEHOLDER,
  PLATFORMS_HEADING,
  PLATFORMS_INTRO,
  STEPS,
  STEPS_HEADING,
} from '@/constants/ui'

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
}

export default function HomePage(): React.ReactElement {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-5 pb-14">
      <div className="relative flex flex-col items-center gap-9 pt-16 sm:pt-24">
        <div className="hero-veil -z-10" aria-hidden />
        <header className="flex max-w-3xl flex-col items-center gap-5 text-center">
          <h1 className="text-[clamp(2.5rem,7vw,4.25rem)] leading-[0.98] text-balance">
            {HOME_HEADLINE}
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed text-pretty sm:text-xl">
            {HOME_INTRO}
          </p>
        </header>

        <ShotForm
          placeholder={HOME_URL_PLACEHOLDER}
          hint={HOME_URL_HINT}
          showExample
        />
      </div>

      <Section id="platforms" title={PLATFORMS_HEADING} intro={PLATFORMS_INTRO}>
        <PlatformGrid />
      </Section>

      <Section id="steps" title={STEPS_HEADING}>
        <ol className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="bg-card flex flex-col gap-2 p-5">
              <span className="text-muted-foreground font-mono text-xs">
                {index + 1}
              </span>
              <h3 className="text-base font-medium">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </main>
  )
}
