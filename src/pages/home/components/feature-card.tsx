type FeatureCardProps = {
  description: string
  icon: string
  title: string
}

export function FeatureCard({ description, icon, title }: FeatureCardProps) {
  return (
    <article className="border-border/70 bg-background/80 rounded-[1.5rem] border p-5 shadow-sm">
      <div className="flex h-full flex-col gap-4">
        <span className={`${icon} inline-block size-7`} />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm leading-6">
            {description}
          </p>
        </div>
      </div>
    </article>
  )
}
