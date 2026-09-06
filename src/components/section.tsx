export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string
  title: string
  intro?: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-6">
      <div className="flex max-w-xl flex-col gap-2">
        <h2 id={id} className="text-2xl sm:text-[28px]">
          {title}
        </h2>
        {intro === undefined ? null : (
          <p className="text-muted-foreground leading-relaxed">{intro}</p>
        )}
      </div>
      {children}
    </section>
  )
}
