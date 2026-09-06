'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { LogoMark } from '@/components/logo-mark'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PLATFORMS } from '@/constants/platforms'
import {
  BRAND_NAME,
  NAV_ABOUT_LABEL,
  NAV_MENU_LABEL,
  NAV_TOOLS_LABEL,
} from '@/constants/site'

function Wordmark(): React.ReactElement {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <LogoMark className="size-7" />
      <span className="font-heading text-[15px] font-semibold tracking-tight">
        {BRAND_NAME}
      </span>
    </Link>
  )
}

export function SiteHeader(): React.ReactElement {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-6 px-5">
        <Wordmark />

        <nav aria-label={NAV_TOOLS_LABEL} className="hidden flex-1 items-center gap-1 md:flex">
          {PLATFORMS.map((platform) => (
            <Button
              key={platform.slug}
              variant="ghost"
              size="sm"
              data-active={pathname === `/${platform.slug}`}
              className="text-muted-foreground data-[active=true]:text-foreground data-[active=true]:bg-secondary"
              render={<Link href={`/${platform.slug}`}>{platform.navLabel}</Link>}
            />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hidden md:inline-flex"
            render={<Link href="/about">{NAV_ABOUT_LABEL}</Link>}
          />
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label={NAV_MENU_LABEL}
                >
                  <Menu className="size-4" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-heading">{NAV_TOOLS_LABEL}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {PLATFORMS.map((platform) => (
                  <Button
                    key={platform.slug}
                    variant="ghost"
                    className="justify-between"
                    onClick={() => {
                      setOpen(false)
                    }}
                    render={
                      <Link href={`/${platform.slug}`}>
                        <span>{platform.navLabel}</span>
                        {platform.status === 'planned' ? (
                          <Badge variant="secondary">Soon</Badge>
                        ) : null}
                      </Link>
                    }
                  />
                ))}
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setOpen(false)
                  }}
                  render={<Link href="/about">{NAV_ABOUT_LABEL}</Link>}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
