import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_authed/_admin/admin/users')({
  component: AdminUsersPage,
  head: () => ({
    meta: [{ title: 'Admin Users | Starter React' }],
  }),
})

function AdminUsersPage() {
  const { auth } = Route.useRouteContext()

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">
          This page is behind both <code>_authed</code> and <code>_admin</code>{' '}
          guards.
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">Admin Users</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="border-border/70 bg-background/80 rounded-3xl border p-5">
          <div className="space-y-3">
            <div className="text-sm font-medium">Guard chain</div>
            <ul className="text-muted-foreground space-y-2 text-sm leading-6">
              <li>1. `__root.beforeLoad` resolves `auth` context.</li>
              <li>2. `_authed.beforeLoad` requires authentication.</li>
              <li>3. `_admin.beforeLoad` requires the `admin` role.</li>
            </ul>
          </div>
        </div>

        <div className="border-border/70 bg-background/80 rounded-3xl border p-5">
          <div className="space-y-3">
            <div className="text-sm font-medium">Current auth snapshot</div>
            <pre className="bg-muted/70 overflow-auto rounded-2xl p-4 text-xs">
              {JSON.stringify(auth, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
