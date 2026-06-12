import type { AppSummary } from '@/services/api'

type StoreMetricCardProps = {
  demoCount: number
  summary: AppSummary
}

export function StoreMetricCard({ demoCount, summary }: StoreMetricCardProps) {
  return (
    <div className="border-border/70 bg-muted/35 rounded-[1.75rem] border p-5">
      <div className="bg-background/90 space-y-3 rounded-[1.5rem] p-5 shadow-sm">
        <div className="text-muted-foreground text-xs font-medium tracking-[0.22em] uppercase">
          Query + Zustand
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-5xl font-semibold tracking-tight">
              {demoCount}
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Server data comes from TanStack Query. Local UI state stays in
              Zustand.
            </p>
          </div>
          <span className="i-solar-chart-outline text-muted-foreground inline-block size-12" />
        </div>

        <div className="border-border/70 bg-muted/55 rounded-[1.25rem] border p-4">
          <div className="text-sm font-medium">{summary.name}</div>
          <div className="text-muted-foreground mt-1 text-xs leading-6">
            Version {summary.version}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {summary.stack.map((item) => (
              <span
                key={item}
                className="bg-background/80 rounded-full px-2.5 py-1 text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
