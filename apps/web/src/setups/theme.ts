const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

function getSavedTheme(storageKey: string) {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage.getItem(storageKey)
}

function resolveTheme(savedTheme: string | null) {
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  return window.matchMedia(COLOR_SCHEME_QUERY).matches ? 'dark' : 'light'
}

export function setupThemeAppearance(storageKey = 'theme') {
  if (typeof window === 'undefined') {
    return
  }

  const root = document.documentElement
  const theme = resolveTheme(getSavedTheme(storageKey))

  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  root.dataset.theme = theme
  root.style.colorScheme = theme
}
