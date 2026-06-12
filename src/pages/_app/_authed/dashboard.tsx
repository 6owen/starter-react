import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_authed/dashboard')({
  component: DashboardPage,
  head: () => ({
    meta: [{ title: 'Dashboard | Starter React' }],
  }),
})

function DashboardPage() {
  const { auth } = Route.useRouteContext()

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">
          This route is protected by the <code>_authed</code> pathless layout
          guard.
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
      </div>

      <div className="border-border/70 bg-background/80 max-w-3xl rounded-3xl border p-5">
        <div className="space-y-3">
          <div className="text-sm font-medium">Resolved auth context</div>
          <pre className="bg-muted/70 overflow-auto rounded-2xl p-4 text-xs">
            {JSON.stringify(auth, null, 2)}
          </pre>
        </div>
      </div>
    </section>
  )
}
