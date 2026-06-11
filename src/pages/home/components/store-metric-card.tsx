type StoreMetricCardProps = {
  demoCount: number
}

export function StoreMetricCard({ demoCount }: StoreMetricCardProps) {
  return (
    <div className="border-border/70 bg-muted/35 rounded-[1.75rem] border p-5">
      <div className="bg-background/90 space-y-3 rounded-[1.5rem] p-5 shadow-sm">
        <div className="text-muted-foreground text-xs font-medium tracking-[0.22em] uppercase">
          Zustand module
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-5xl font-semibold tracking-tight">
              {demoCount}
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              This comes from <code>src/stores/modules/app</code>.
            </p>
          </div>
          <span className="i-solar-chart-outline text-muted-foreground inline-block size-12" />
        </div>
      </div>
    </div>
  )
}
