import { request } from '../request'

export type AppSummary = {
  name: string
  version: string
}

export const appApi = {
  getAppSummary() {
    return request.get<AppSummary>('/app/summary')
  },
}
