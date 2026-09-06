import Link from 'next/link'

import { Separator } from '@/components/ui/separator'
import { PLATFORMS } from '@/constants/platforms'
import {
  AUTHOR_NAME,
  AUTHOR_PORTFOLIO,
  AUTHOR_PORTFOLIO_LABEL,
  BRAND_NAME,
  FOOTER_NOTE,
  NAV_ABOUT_LABEL,
  NAV_TOOLS_LABEL,
} from '@/constants/site'

export function SiteFooter(): React.ReactElement {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto grid w-full max-w-5xl gap-10 px-5 py-12 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <span className="font-heading text-[15px] font-semibold">{BRAND_NAME}</span>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            {FOOTER_NOTE}
          </p>
        </div>

        <nav aria-label={NAV_TOOLS_LABEL} className="flex flex-col gap-2.5 text-sm">
          <span className="text-foreground font-medium">{NAV_TOOLS_LABEL}</span>
          {PLATFORMS.map((platform) => (
            <Link
              key={platform.slug}
              href={`/${platform.slug}`}
              className="text-muted-foreground hover:text-foreground w-fit transition-colors"
            >
              {platform.pageTitle}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5 text-sm">
          <span className="text-foreground font-medium">Made by</span>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground w-fit transition-colors"
          >
            {NAV_ABOUT_LABEL}
          </Link>
          <a
            href={AUTHOR_PORTFOLIO}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground w-fit transition-colors"
          >
            {AUTHOR_PORTFOLIO_LABEL}
          </a>
        </div>
      </div>

      <Separator />
      <div className="text-muted-foreground mx-auto w-full max-w-5xl px-5 py-6 text-xs">
        Built by {AUTHOR_NAME}
      </div>
    </footer>
  )
}
