import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAppStore, useRouteStore } from '@/stores'

type RouterGuardProps = {
  children: ReactNode
  meta?: AppRouteMeta
}

export function RouterGuard({ children, meta }: RouterGuardProps) {
  const appName = useAppStore((state) => state.appName)
  const location = useLocation()
  const setCurrentRoute = useRouteStore((state) => state.setCurrentRoute)

  useEffect(() => {
    setCurrentRoute({
      layout: meta?.layout ?? 'default',
      pathname: location.pathname,
      title: meta?.title,
    })

    document.title = meta?.title ? `${meta.title} | ${appName}` : appName
  }, [appName, location.pathname, meta?.layout, meta?.title, setCurrentRoute])

  if (meta?.requiresAuth && !window.sessionStorage.getItem('token')) {
    return <Navigate replace state={{ from: location }} to="/" />
  }

  return <>{children}</>
}
