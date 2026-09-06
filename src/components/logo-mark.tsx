export function LogoMark({
  className,
}: {
  className?: string
}): React.ReactElement {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <rect width="32" height="32" rx="9" className="fill-foreground" />
      <rect x="8" y="7.5" width="16" height="12" rx="2.75" className="fill-background" />
      <rect
        x="10.75"
        y="10.5"
        width="7.5"
        height="1.75"
        rx="0.875"
        className="fill-muted-foreground"
      />
      <rect
        x="10.75"
        y="13.75"
        width="10.5"
        height="1.75"
        rx="0.875"
        className="fill-muted-foreground"
      />
      <rect x="11" y="22.5" width="10" height="2.75" rx="1.375" className="fill-primary" />
    </svg>
  )
}
