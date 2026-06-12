import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_authed/_admin/admin')({
  component: AdminSectionRoute,
})

function AdminSectionRoute() {
  return <Outlet />
}
