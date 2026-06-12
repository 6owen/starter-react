import { Outlet, createFileRoute } from '@tanstack/react-router'
import { AppFooter } from './-components/app-footer'
import { AppHeader } from './-components/app-header'

export const Route = createFileRoute('/_app')({
  component: AppLayoutRoute,
})

function AppLayoutRoute() {
  return (
    <div className="bg-white text-[#1A1A1A]">
      <AppHeader />
      <main className="pt-[83px]">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  )
}
