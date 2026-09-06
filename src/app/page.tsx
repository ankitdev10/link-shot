import type { Metadata } from 'next'

import { PlatformGrid } from '@/components/platform-grid'
import { Section } from '@/components/section'
import { ShotForm } from '@/components/shot-form'
import { ShowroomHero } from '@/components/showroom-hero'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/constants/seo'
import {
  BENTO,
  BENTO_HEADING,
  BENTO_INTRO,
  HERO_EYEBROW,
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
    <main className="flex w-full flex-col">
      <ShowroomHero
        eyebrow={HERO_EYEBROW}
        headline={HOME_HEADLINE}
        intro={HOME_INTRO}
      >
        <ShotForm
          placeholder={HOME_URL_PLACEHOLDER}
          hint={HOME_URL_HINT}
          showExample
        />
      </ShowroomHero>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-5 py-24">
        <Section id="bento" title={BENTO_HEADING} intro={BENTO_INTRO}>
          <div className="grid gap-4 sm:grid-cols-3">
            {BENTO.map((cell) => (
              <Card key={cell.title} className={`halo transition-all ${cell.span}`}>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">{cell.title}</CardTitle>
                  <CardDescription className="mt-2 leading-relaxed">
                    {cell.detail}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="platforms" title={PLATFORMS_HEADING} intro={PLATFORMS_INTRO}>
          <PlatformGrid />
        </Section>

        <Section id="steps" title={STEPS_HEADING}>
          <ol className="grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="bg-card flex flex-col gap-2 p-6">
                <span className="text-primary font-mono text-xs">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base font-medium">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      </div>
    </main>
  )
}
