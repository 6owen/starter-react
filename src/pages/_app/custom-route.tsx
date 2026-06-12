import { Link, createFileRoute, useRouterState } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_app/custom-route')({
  component: CustomRoutePage,
  head: () => ({
    meta: [{ title: 'Custom Route | Starter React' }],
  }),
})

function CustomRoutePage() {
  const snapshot = useRouterState({
    select: (state) => ({
      href: state.location.href,
      matches: state.matches.map((match) => match.routeId),
      pathname: state.location.pathname,
      status: state.status,
    }),
  })

  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">
          This page is now a normal file route under `src/pages`, not a custom
          registration in a separate router folder.
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">Custom Route</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border-border/70 bg-background/80 rounded-3xl border p-5">
          <div className="text-sm font-medium">Router state</div>
          <pre className="bg-muted/70 mt-3 overflow-auto rounded-2xl p-4 text-xs">
            {JSON.stringify(snapshot, null, 2)}
          </pre>
        </div>

        <div className="border-border/70 bg-background/80 rounded-3xl border p-5">
          <div className="space-y-3">
            <div className="text-sm font-medium">What changed</div>
            <p className="text-muted-foreground text-sm leading-6">
              Layout composition, search validation, loaders, and route guards
              now all belong to the TanStack route tree instead of a separate
              runtime assembly step.
            </p>
            <Button asChild>
              <Link to="/">Back Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
