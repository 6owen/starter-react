import { z } from 'zod'

export const aboutSearchSchema = z.object({
  view: z.enum(['notes', 'summary']).catch('summary').optional(),
})
