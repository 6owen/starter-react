import { Link, createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_app/login')({
  component: LoginPage,
  head: () => ({
    meta: [{ title: 'Login | Starter React' }],
  }),
  validateSearch: (search) => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : '/',
  }),
})

function LoginPage() {
  const search = Route.useSearch()

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">
          This is a placeholder login route for the TanStack auth guard flow.
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">Login</h2>
      </div>

      <div className="border-border/70 bg-background/80 max-w-2xl space-y-4 rounded-3xl border p-5">
        <p className="text-muted-foreground text-sm leading-6">
          Real authentication has not been wired yet. The current auth snapshot
          is mocked in <code>src/routers/auth.ts</code>. Replace that file with
          your real session resolver later.
        </p>
        <p className="text-muted-foreground text-sm leading-6">
          After a real login succeeds, you would normally redirect back to{' '}
          <code>{search.redirect}</code>.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={search.redirect}>Go to requested page</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
