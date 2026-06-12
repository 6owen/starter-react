import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { anonymousAuthSnapshot } from '@/routers/auth'
import { makeQueryClient } from '@/services/query-client'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const queryClient = makeQueryClient()

  const router = createRouter({
    context: {
      auth: anonymousAuthSnapshot,
      queryClient,
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    routeTree,
    scrollRestoration: true,
  })

  setupRouterSsrQueryIntegration({
    queryClient,
    router,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
