import generatedRoutes from '~react-pages'

import type { AppRouteObject } from './types'

const pageRouteMetaMap: Record<string, AppRouteMeta> = {
  '/': {
    layout: 'default',
    title: 'Home',
  },
  '/home': {
    layout: 'default',
    title: 'Home',
  },
  '/about': {
    layout: 'default',
    title: 'About',
  },
  '/fullscreen': {
    layout: 'fullscreen',
    title: 'Fullscreen',
  },
}

function toTitle(pathname: string) {
  if (pathname === '/') {
    return 'Home'
  }

  return pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' / ')
}

function resolveRouteMeta(pathname: string) {
  let normalizedPath = pathname || '/'

  if (normalizedPath !== '/' && !normalizedPath.startsWith('/')) {
    normalizedPath = `/${normalizedPath}`
  }

  return {
    layout: normalizedPath.startsWith('/fullscreen') ? 'fullscreen' : 'default',
    title: toTitle(normalizedPath),
    ...pageRouteMetaMap[normalizedPath],
  } satisfies AppRouteMeta
}

function normalizePageFileRoutes(routes: AppRouteObject[]): AppRouteObject[] {
  return routes.map(normalizePageFileRoute)
}

function normalizePageFileRoute(route: AppRouteObject): AppRouteObject {
  const normalizedChildren = route.children?.map(normalizePageFileRoute)

  if (route.path === 'page' && route.element) {
    return {
      ...route,
      path: '/',
      children: normalizedChildren,
    }
  }

  const pageChild = normalizedChildren?.find((child) => child.path === '/')

  if (!route.element && pageChild?.element) {
    const remainingChildren = normalizedChildren?.filter(
      (child) => child !== pageChild,
    )
    const mergedChildren = [
      ...(pageChild.children ?? []),
      ...(remainingChildren ?? []),
    ]

    return {
      ...route,
      element: pageChild.element,
      children: mergedChildren.length ? mergedChildren : undefined,
    }
  }

  return {
    ...route,
    children: normalizedChildren,
  }
}

function attachRouteMeta(routes: AppRouteObject[]): AppRouteObject[] {
  return routes.map((route) => {
    const pathname = route.path ?? '/'

    return {
      ...route,
      children: route.children ? attachRouteMeta(route.children) : undefined,
      handle: {
        ...resolveRouteMeta(pathname),
        ...route.handle,
      },
    }
  })
}

export const pageRoutes = attachRouteMeta(
  normalizePageFileRoutes(generatedRoutes as AppRouteObject[]),
)
