import type { AppRouteObject } from './types'

import { CustomRoutePage } from './custom-route'
import { NotFoundPage } from './not-found'

export const customRoutes: AppRouteObject[] = [
  {
    element: <CustomRoutePage />,
    handle: {
      layout: 'default',
      title: 'Custom Route',
    },
    path: '/custom-route',
  },
  {
    element: <NotFoundPage />,
    handle: {
      layout: 'default',
      title: 'Not Found',
    },
    path: '*',
  },
]
