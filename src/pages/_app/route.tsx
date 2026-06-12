import {
  Link,
  Outlet,
  createFileRoute,
  useRouterState,
} from '@tanstack/react-router'

import { ThemeToggleButton } from '@/components/theme-toggle-button'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/stores'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Admin Users', to: '/admin/users' },
  { label: 'Fullscreen', to: '/fullscreen' },
  { label: 'Custom Route', to: '/custom-route' },
  { label: 'Login', to: '/login' },
] as const

const routeTitles: Record<string, string> = {
  '/admin/users': 'Admin Users',
  '/': 'Home',
  '/about': 'About',
  '/custom-route': 'Custom Route',
  '/dashboard': 'Dashboard',
  '/login': 'Login',
  '/unauthorized': 'Unauthorized',
}

export const Route = createFileRoute('/_app')({
  component: AppLayoutRoute,
})

function AppLayoutRoute() {
  const appDescription = useAppStore((state) => state.appDescription)
  const appName = useAppStore((state) => state.appName)
  const { auth } = Route.useRouteContext()
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const currentTitle = routeTitles[pathname] ?? appName
  const visibleNavigation = navigation.filter((item) => {
    if (item.to === '/dashboard') {
      return auth.isAuthenticated
    }

    if (item.to === '/admin/users') {
      return auth.roles.includes('admin')
    }

    if (item.to === '/login') {
      return !auth.isAuthenticated
    }

    return true
  })

  return (
    <div className="min-h-svh bg-[radial-gradient(circle_at_top_left,oklch(0.97_0.03_225),transparent_26%),radial-gradient(circle_at_top_right,oklch(0.95_0.03_80),transparent_20%),linear-gradient(180deg,transparent,oklch(0.98_0_0))]">
      <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-6 p-6 sm:p-8">
        <header className="border-border/70 bg-background/82 rounded-[2rem] border px-5 py-4 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="text-muted-foreground text-xs font-medium tracking-[0.22em] uppercase">
                {appName}
              </div>
              <div className="max-w-2xl">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {currentTitle}
                </h1>
                <p className="text-muted-foreground mt-1 text-sm leading-6">
                  {appDescription}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <nav className="flex flex-wrap gap-2">
                {visibleNavigation.map((item) => (
                  <Link
                    key={item.to}
                    activeOptions={
                      item.to === '/' ? { exact: true } : undefined
                    }
                    activeProps={{
                      className:
                        'bg-foreground text-background hover:bg-foreground',
                    }}
                    className={cn(
                      'border-border/70 bg-background/70 hover:bg-muted inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition-colors',
                    )}
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              {auth.user && (
                <div className="border-border/70 bg-background/70 hidden rounded-full border px-3 py-1 text-xs font-medium md:inline-flex">
                  {auth.user.name}
                </div>
              )}
              <ThemeToggleButton className="border-border/70 bg-background/70 hover:bg-muted size-10 rounded-full border" />
            </div>
          </div>
        </header>

        <main className="border-border/70 bg-background/82 flex-1 rounded-[2rem] border p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
