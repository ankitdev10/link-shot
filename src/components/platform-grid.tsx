import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PLATFORMS } from '@/constants/platforms'
import { STATUS_LIVE_LABEL, STATUS_PLANNED_LABEL } from '@/constants/ui'

export function PlatformGrid({
  currentSlug,
}: {
  currentSlug?: string
}): React.ReactElement {
  const platforms = PLATFORMS.filter((platform) => platform.slug !== currentSlug)

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {platforms.map((platform) => (
        <Card
          key={platform.slug}
          className="hover:border-foreground/20 group relative transition-colors"
        >
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="font-heading text-lg">
                <Link href={`/${platform.slug}`} className="after:absolute after:inset-0">
                  {platform.pageTitle}
                </Link>
              </CardTitle>
              <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors" />
            </div>
            <CardDescription className="mt-1 leading-relaxed">
              {platform.headline}
            </CardDescription>
            <Badge
              variant={platform.status === 'live' ? 'default' : 'secondary'}
              className="mt-3 w-fit"
            >
              {platform.status === 'live' ? STATUS_LIVE_LABEL : STATUS_PLANNED_LABEL}
            </Badge>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
