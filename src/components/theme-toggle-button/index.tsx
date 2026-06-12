import { useEffect, useState } from 'react'
import { AnimatedThemeToggler } from './animated-theme-toggler'

import { useAppTheme } from '@/composables/use-app-theme'
import { cn } from '@/lib/utils'

export function ThemeToggleButton({ className }: { className?: string }) {
  const { isDark, toggleTheme } = useAppTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <button
        aria-label="theme-toggle-button"
        className={cn(
          'grid place-items-center rounded-lg transition-colors',
          '[&_svg]:h-4.5 [&_svg]:w-4.5',
          className,
        )}
        disabled
        title="theme-toggle-button"
        type="button"
      >
        <span aria-hidden className="size-4" />
        <span className="sr-only">theme-toggle-button</span>
      </button>
    )
  }

  return (
    <AnimatedThemeToggler
      aria-label="theme-toggle-button"
      className={cn(
        'grid place-items-center rounded-lg transition-colors',
        '[&_svg]:h-4.5 [&_svg]:w-4.5',
        className,
      )}
      duration={420}
      isDark={isDark}
      onToggle={toggleTheme}
      srLabel="theme-toggle-button"
      title="theme-toggle-button"
    />
  )
}
