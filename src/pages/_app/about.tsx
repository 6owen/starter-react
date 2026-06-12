import { Link, createFileRoute, useRouterState } from '@tanstack/react-router'
import { z } from 'zod'
import { useToggle } from 'react-use'

import { Button } from '@/components/ui/button'

const aboutSearchSchema = z.object({
  view: z.enum(['notes', 'summary']).catch('summary').optional(),
})

export const Route = createFileRoute('/_app/about')({
  component: AboutPage,
  head: () => ({
    meta: [{ title: 'About | Starter React' }],
  }),
  validateSearch: (search) => aboutSearchSchema.parse(search),
})

function AboutPage() {
  const [isExpanded, toggleExpanded] = useToggle(false)
  const search = Route.useSearch()
  const routeSnapshot = useRouterState({
    select: (state) => ({
      matches: state.matches.map((match) => match.routeId),
      pathname: state.location.pathname,
      search: state.location.search,
    }),
  })

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">
          This route uses TanStack Router search validation instead of a custom
          route meta layer.
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">
          About This Migration
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="border-border/70 bg-background/80 rounded-3xl border p-5">
          <div className="space-y-3">
            <div className="text-sm font-medium">Current router snapshot</div>
            <pre className="bg-muted/70 overflow-auto rounded-2xl p-4 text-xs">
              {JSON.stringify(routeSnapshot, null, 2)}
            </pre>
          </div>
        </div>

        <div className="border-border/70 bg-background/80 rounded-3xl border p-5">
          <div className="space-y-4">
            <div className="text-sm font-medium">Current conventions</div>
            <p className="text-muted-foreground text-sm leading-6">
              `src/pages` now owns the route tree. Page-local children stay in
              colocated `-components` folders. Request and query infrastructure
              lives under `src/services`.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => toggleExpanded()}>
                <span className="i-solar-alt-arrow-down-outline inline-block size-4" />
                {isExpanded ? 'Hide notes' : 'Show notes'}
              </Button>
              <Button asChild variant="outline">
                <Link
                  search={{
                    view: search.view === 'summary' ? 'notes' : 'summary',
                  }}
                  to="/about"
                >
                  Switch search view
                </Link>
              </Button>
            </div>
            {isExpanded && (
              <p className="text-muted-foreground text-sm leading-6">
                The current `view` search param is <code>{search.view}</code>.
                This is validated by TanStack Router before the page renders.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
