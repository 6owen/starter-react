import { useEffect, useState } from 'react'

import { useTheme } from '@/components/theme-provider'

function getResolvedDocumentTheme() {
  if (typeof document === 'undefined') {
    return 'light' as const
  }

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useAppTheme() {
  const { setTheme, theme } = useTheme()
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    getResolvedDocumentTheme(),
  )

  useEffect(() => {
    const root = document.documentElement
    const syncTheme = () => {
      setResolvedTheme(getResolvedDocumentTheme())
    }

    syncTheme()

    const observer = new MutationObserver(syncTheme)
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      observer.disconnect()
    }
  }, [theme])

  return {
    isDark: resolvedTheme === 'dark',
    resolvedTheme,
    setTheme,
    theme,
    toggleTheme: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
  }
}
