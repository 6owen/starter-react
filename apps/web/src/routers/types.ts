import type { ReactElement, ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'

export type AppLayoutProps = {
  children: ReactNode
  meta?: AppRouteMeta
}

export type AppRouteObject = Omit<RouteObject, 'children'> & {
  children?: AppRouteObject[]
  element?: ReactElement | null
  handle?: AppRouteMeta
}
