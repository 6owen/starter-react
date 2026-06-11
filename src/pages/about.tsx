import { Button } from '@/components/ui/button'

import { useRouteStore } from '@/stores'

export default function AboutPage() {
  const [isExpanded, toggleExpanded] = useToggle(false)
  const currentRoute = useRouteStore((state) => state.currentRoute)

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">
          `react-use` is installed and can be auto-imported inside app code.
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          About This Starter
        </h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="border-border/70 bg-background/80 rounded-3xl border p-5">
          <div className="space-y-3">
            <div className="text-sm font-medium">Current route snapshot</div>
            <pre className="bg-muted/70 overflow-auto rounded-2xl p-4 text-xs">
              {JSON.stringify(currentRoute, null, 2)}
            </pre>
          </div>
        </div>

        <div className="border-border/70 bg-background/80 rounded-3xl border p-5">
          <div className="space-y-4">
            <div className="text-sm font-medium">Service conventions</div>
            <p className="text-muted-foreground text-sm leading-6">
              Axios setup is now under <code>src/services/request</code>, and
              app-level API entrypoints follow the <code>*Api</code> suffix
              convention under <code>src/services/api</code>. Route pages can
              either be top-level files like <code>src/pages/about.tsx</code>,
              or nested entries like <code>src/pages/home/page.tsx</code>.
            </p>
            <Button onClick={() => toggleExpanded()}>
              <span className="i-solar-alt-arrow-down-outline inline-block size-4" />
              {isExpanded ? 'Hide extra notes' : 'Show extra notes'}
            </Button>
            {isExpanded && (
              <p className="text-muted-foreground text-sm leading-6">
                This is driven by <code>useToggle</code> from `react-use`
                without a manual import in this file.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
