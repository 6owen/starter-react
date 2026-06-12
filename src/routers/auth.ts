import { createServerFn } from '@tanstack/react-start'

export type AppRole = 'admin' | 'member'

export type AuthSnapshot = {
  isAuthenticated: boolean
  roles: AppRole[]
  user: null | {
    id: string
    name: string
  }
}

type DemoAuthMode = 'admin' | 'guest' | 'member'

// Replace this with real session resolution when actual auth lands.
const DEMO_AUTH_MODE: DemoAuthMode = 'admin'

export const anonymousAuthSnapshot: AuthSnapshot = {
  isAuthenticated: false,
  roles: [],
  user: null,
}

function resolveDemoAuthSnapshot(mode: DemoAuthMode): AuthSnapshot {
  switch (mode) {
    case 'guest':
      return anonymousAuthSnapshot
    case 'member':
      return {
        isAuthenticated: true,
        roles: ['member'],
        user: {
          id: 'demo-member',
          name: 'Demo Member',
        },
      }
    case 'admin':
    default:
      return {
        isAuthenticated: true,
        roles: ['admin', 'member'],
        user: {
          id: 'demo-admin',
          name: 'Demo Admin',
        },
      }
  }
}

export const getCurrentAuthSnapshot = createServerFn({ method: 'GET' }).handler(
  () => resolveDemoAuthSnapshot(DEMO_AUTH_MODE),
)

export function hasRole(auth: AuthSnapshot, role: AppRole) {
  return auth.roles.includes(role)
}

export function hasAnyRole(auth: AuthSnapshot, roles: AppRole[]) {
  return roles.some((role) => hasRole(auth, role))
}
