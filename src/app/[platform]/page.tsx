import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { FaqList } from '@/components/faq-list'
import { PlatformGrid } from '@/components/platform-grid'
import { Section } from '@/components/section'
import { ShotForm } from '@/components/shot-form'
import { Badge } from '@/components/ui/badge'
import { PLATFORMS, findPlatform } from '@/constants/platforms'
import {
  FAQ_HEADING,
  PLATFORMS_HEADING,
  STATUS_LIVE_LABEL,
  STATUS_PLANNED_LABEL,
} from '@/constants/ui'
import { buildFaqSchema } from '@/lib/seo/structured-data'

export const dynamicParams = false

type PageProps = { params: Promise<{ platform: string }> }

export function generateStaticParams(): { platform: string }[] {
  return PLATFORMS.map((platform) => ({ platform: platform.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { platform: slug } = await params
  const platform = findPlatform(slug)
  if (platform === undefined) return {}

  return {
    title: platform.metaTitle,
    description: platform.metaDescription,
    keywords: platform.keywords,
    alternates: { canonical: `/${platform.slug}` },
    openGraph: {
      title: platform.metaTitle,
      description: platform.metaDescription,
      url: `/${platform.slug}`,
    },
  }
}

export default async function PlatformPage({
  params,
}: PageProps): Promise<React.ReactElement> {
  const { platform: slug } = await params
  const platform = findPlatform(slug)
  if (platform === undefined) notFound()

  const isLive = platform.status === 'live'

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-5 pb-14">
      <div className="relative flex flex-col items-center gap-9 pt-16 sm:pt-24">
        <div className="hero-veil -z-10" aria-hidden />
        <header className="flex max-w-3xl flex-col items-center gap-5 text-center">
          <Badge variant={isLive ? 'default' : 'secondary'}>
            {isLive ? STATUS_LIVE_LABEL : STATUS_PLANNED_LABEL}
          </Badge>
          <h1 className="text-[clamp(2.25rem,6vw,3.75rem)] leading-[1] text-balance">
            {platform.headline}
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed text-pretty">
            {platform.intro}
          </p>
        </header>

        <ShotForm
          placeholder={platform.urlExample}
          hint={platform.urlHint}
          disabled={!isLive}
          showExample={isLive}
        />
      </div>

      <Section id="faq" title={FAQ_HEADING}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildFaqSchema(platform.faq) }}
        />
        <FaqList items={platform.faq} />
      </Section>

      <Section id="platforms" title={PLATFORMS_HEADING}>
        <PlatformGrid currentSlug={platform.slug} />
      </Section>
    </main>
  )
}
