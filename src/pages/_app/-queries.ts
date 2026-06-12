import { queryOptions } from '@tanstack/react-query'

import { getAppSummary } from '@/services/api'

export const appSummaryQueryOptions = queryOptions({
  queryFn: () => getAppSummary(),
  queryKey: ['app-summary'],
})
