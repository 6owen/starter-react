import { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'

import { DefaultLayout } from '@/layouts/default'
import { FullscreenLayout } from '@/layouts/fullscreen'

import { pageRoutes } from './page-routes'
import { customRoutes } from './routes'
import { RouterGuard } from './guard'
import type { AppRouteObject } from './types'

const layoutMap = {
  default: DefaultLayout,
  fullscreen: FullscreenLayout,
}

function applyLayouts(routes: AppRouteObject[]): AppRouteObject[] {
  return routes.map((route) => {
    const meta = route.handle ?? {}
    const layoutKey = meta.layout === 'fullscreen' ? 'fullscreen' : 'default'
    const Layout = layoutMap[layoutKey]

    return {
      ...route,
      children: route.children ? applyLayouts(route.children) : undefined,
      element: route.element ? (
        <Layout meta={meta}>
          <RouterGuard meta={meta}>{route.element}</RouterGuard>
        </Layout>
      ) : undefined,
    }
  })
}

const appRoutes = applyLayouts([...pageRoutes, ...customRoutes])

function RoutePending() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="text-muted-foreground flex items-center gap-3 text-sm">
        <span className="i-solar-refresh-outline inline-block size-5 animate-spin" />
        Loading route...
      </div>
    </div>
  )
}

export function AppRouter() {
  return (
    <Suspense fallback={<RoutePending />}>
      {useRoutes(appRoutes as RouteObject[])}
    </Suspense>
  )
}
