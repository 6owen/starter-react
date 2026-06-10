import { Button } from '@workspace/ui/components/button'
import { NavLink } from 'react-router-dom'

import { useRouteStore } from '@/stores'

export function CustomRoutePage() {
  const currentRoute = useRouteStore((state) => state.currentRoute)

  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">
          This page is registered from <code>src/routers/routes.tsx</code>, not
          from <code>src/pages</code>.
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Custom Route</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border-border/70 bg-background/80 rounded-3xl border p-5">
          <div className="text-sm font-medium">Current route snapshot</div>
          <pre className="bg-muted/70 mt-3 overflow-auto rounded-2xl p-4 text-xs">
            {JSON.stringify(currentRoute, null, 2)}
          </pre>
        </div>

        <div className="border-border/70 bg-background/80 rounded-3xl border p-5">
          <div className="space-y-3">
            <div className="text-sm font-medium">Why keep `routers/`</div>
            <p className="text-muted-foreground text-sm leading-6">
              `pages/` handles conventional routes. `routers/` keeps custom
              entries, route guards, and any future auth or permission logic in
              one place.
            </p>
            <Button asChild>
              <NavLink to="/">Back Home</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
