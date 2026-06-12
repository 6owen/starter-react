import { Outlet, createFileRoute } from '@tanstack/react-router'

import { requireRole } from '@/routers/guards'

export const Route = createFileRoute('/_app/_authed/_admin')({
  beforeLoad: ({ context, location }) => {
    requireRole(['admin'], {
      auth: context.auth,
      locationHref: location.href,
    })
  },
  component: AdminGuardRoute,
})

function AdminGuardRoute() {
  return <Outlet />
}
