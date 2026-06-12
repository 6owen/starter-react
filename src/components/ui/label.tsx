import * as React from 'react'

import { cn } from '@/lib/utils'

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      className={cn(
        'text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)] uppercase',
        className,
      )}
      data-slot="label"
      {...props}
    />
  )
}

export { Label }
