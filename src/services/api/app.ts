import { createServerFn } from '@tanstack/react-start'

export type AppSummary = {
  name: string
  stack: string[]
  version: string
}

export const getAppSummary = createServerFn({ method: 'GET' }).handler(() => {
  return {
    name: 'Starter React',
    stack: ['TanStack Start', 'TanStack Router', 'TanStack Query', 'Zustand'],
    version: '0.0.1',
  } satisfies AppSummary
})
