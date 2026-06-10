import { createRequest } from './request'

export const request = createRequest({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15_000,
})

export * from './request'
