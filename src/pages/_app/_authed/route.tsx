import { Outlet, createFileRoute } from '@tanstack/react-router'

import { requireAuth } from '@/routers/guards'

export const Route = createFileRoute('/_app/_authed')({
  beforeLoad: ({ context, location }) => {
    requireAuth({
      auth: context.auth,
      locationHref: location.href,
    })
  },
  component: AuthedLayoutRoute,
})

function AuthedLayoutRoute() {
  return <Outlet />
}
