/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_APP_TITLE?: string
  readonly VITE_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ViewTransition {
  finished: Promise<void>
  ready: Promise<void>
  updateCallbackDone: Promise<void>
  skipTransition: () => void
}

interface Document {
  startViewTransition?: (
    updateCallback: () => void | Promise<void>,
  ) => ViewTransition
}
