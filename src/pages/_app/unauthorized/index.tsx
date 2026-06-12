import { Link, createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_app/unauthorized/')({
  component: UnauthorizedPage,
  head: () => ({
    meta: [{ title: 'Unauthorized | Starter React' }],
  }),
  validateSearch: (search) => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : '/home',
  }),
})

function UnauthorizedPage() {
  const search = Route.useSearch()

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">
          The current auth snapshot does not satisfy this route's role guard.
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">Unauthorized</h2>
      </div>

      <div className="border-border/70 bg-background/80 max-w-2xl space-y-4 rounded-3xl border p-5">
        <p className="text-muted-foreground text-sm leading-6">
          This page is the fallback target for role-based redirects thrown by
          <code>src/routers/guards.ts</code>.
        </p>
        <p className="text-muted-foreground text-sm leading-6">
          Requested target: <code>{search.redirect}</code>
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link to="/home">Return Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/about">Read About the guard setup</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
