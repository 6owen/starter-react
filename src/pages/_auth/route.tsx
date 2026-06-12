import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthRouteGroup,
})

function AuthRouteGroup() {
  return <Outlet />
}
