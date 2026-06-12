import { redirect } from '@tanstack/react-router'

import { hasAnyRole, type AppRole, type AuthSnapshot } from './auth'

type GuardInput = {
  auth: AuthSnapshot
  locationHref: string
}

export function requireAuth({ auth, locationHref }: GuardInput) {
  if (!auth.isAuthenticated) {
    throw redirect({
      search: {
        redirect: locationHref,
      },
      to: '/login',
    })
  }
}

export function requireRole(
  roles: AppRole[],
  { auth, locationHref }: GuardInput,
) {
  requireAuth({ auth, locationHref })

  if (!hasAnyRole(auth, roles)) {
    throw redirect({
      search: {
        redirect: locationHref,
      },
      to: '/unauthorized',
    })
  }
}
