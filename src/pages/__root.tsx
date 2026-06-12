/// <reference types="vite/client" />
import type { QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { ThemeProvider } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { type AuthSnapshot, getCurrentAuthSnapshot } from '@/routers/auth'
import { THEME_STORAGE_KEY, getThemeInlineScript } from '@/setups/theme'
import appCss from '@/styles/global.css?url'

type RouterContext = {
  auth: AuthSnapshot
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => ({
    auth: await getCurrentAuthSnapshot(),
  }),
  component: RootComponent,
  errorComponent: ({ error }) => (
    <RootDocument>
      <section className="mx-auto flex min-h-svh w-full max-w-4xl items-center justify-center px-6 py-16">
        <div className="border-border/70 bg-background/90 w-full max-w-2xl space-y-4 rounded-[2rem] border p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)]">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.26em] uppercase">
            Application Error
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Something broke while rendering this route.
          </h1>
          <p className="text-muted-foreground text-sm leading-6">
            {error.message}
          </p>
          <Button asChild>
            <Link to="/home">Return Home</Link>
          </Button>
        </div>
      </section>
    </RootDocument>
  ),
  head: () => ({
    links: [{ href: appCss, rel: 'stylesheet' }],
    meta: [
      { charSet: 'utf-8' },
      {
        content: 'width=device-width, initial-scale=1',
        name: 'viewport',
      },
      {
        title:
          import.meta.env.VITE_APP_TITLE ?? 'Starter React | TanStack Start',
      },
    ],
  }),
  notFoundComponent: () => (
    <RootDocument>
      <section className="mx-auto flex min-h-svh w-full max-w-4xl items-center justify-center px-6 py-16">
        <div className="border-border/70 bg-background/90 w-full max-w-2xl space-y-4 rounded-[2rem] border p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)]">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.26em] uppercase">
            404
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            This route does not exist.
          </h1>
          <p className="text-muted-foreground text-sm leading-6">
            The TanStack route tree could not match the current URL.
          </p>
          <Button asChild>
            <Link to="/home">Return Home</Link>
          </Button>
        </div>
      </section>
    </RootDocument>
  ),
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: getThemeInlineScript(THEME_STORAGE_KEY),
          }}
        />
      </head>
      <body>
        <ThemeProvider storageKey={THEME_STORAGE_KEY}>
          {children}
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
