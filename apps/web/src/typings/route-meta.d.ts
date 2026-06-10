declare global {
  interface AppRouteMeta {
    layout?: 'default' | 'fullscreen'
    requiresAuth?: boolean
    title?: string
  }
}

export {}
