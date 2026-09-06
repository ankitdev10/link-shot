import type { Metadata } from 'next'
import Link from 'next/link'

import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PLATFORMS } from '@/constants/platforms'
import {
  ABOUT_PRINCIPLES,
  BRAND_NAME,
  AUTHOR_BIO,
  AUTHOR_NAME,
  AUTHOR_PORTFOLIO,
  AUTHOR_PORTFOLIO_LABEL,
  AUTHOR_ROLE,
} from '@/constants/site'

export const metadata: Metadata = {
  title: 'About',
  description: `${BRAND_NAME} is built by ${AUTHOR_NAME}, a ${AUTHOR_ROLE.toLowerCase()}. Read why it renders posts instead of photographing them.`,
  alternates: { canonical: '/about' },
}

export default function AboutPage(): React.ReactElement {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-5 py-14 sm:py-20">
      <header className="flex flex-col gap-4">
        <h1 className="text-[2.2rem] leading-[1.08] text-balance sm:text-[2.75rem]">
          About {BRAND_NAME}
        </h1>
        {AUTHOR_BIO.map((paragraph) => (
          <p
            key={paragraph}
            className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-pretty"
          >
            {paragraph}
          </p>
        ))}
      </header>

      <Separator />

      <Section id="who" title={`Made by ${AUTHOR_NAME}`}>
        <div className="flex flex-col gap-5">
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            I am {AUTHOR_NAME}, a {AUTHOR_ROLE.toLowerCase()} who enjoys building
            small tools end to end. You can see the rest of what I work on, and how
            to reach me, on my portfolio.
          </p>
          <Button
            variant="outline"
            className="w-fit"
            render={
              <a href={AUTHOR_PORTFOLIO} target="_blank" rel="noopener noreferrer">
                {AUTHOR_PORTFOLIO_LABEL}
              </a>
            }
          />
        </div>
      </Section>

      <Section id="principles" title="How it is built">
        <div className="grid gap-4 sm:grid-cols-3">
          {ABOUT_PRINCIPLES.map((principle) => (
            <Card key={principle.title}>
              <CardHeader>
                <CardTitle className="font-heading text-base">
                  {principle.title}
                </CardTitle>
                <CardDescription className="mt-1 leading-relaxed">
                  {principle.detail}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="tools" title="Tools">
        <ul className="flex flex-col">
          {PLATFORMS.map((platform) => (
            <li key={platform.slug}>
              <Link
                href={`/${platform.slug}`}
                className="hover:bg-secondary/60 flex items-center justify-between rounded-lg px-3 py-3 transition-colors"
              >
                <span>{platform.pageTitle}</span>
                <span className="text-muted-foreground text-sm">
                  {platform.status === 'live' ? 'Available' : 'In development'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  )
}
