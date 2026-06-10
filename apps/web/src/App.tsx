import { Button } from '@workspace/ui/components/button'
import { cn } from '@workspace/ui/lib/utils'

import { useTheme } from '@/components/theme-provider.tsx'
import { type StackKey, useStarterStore } from '@/stores/starter-store.ts'

const stackCards: Array<{
  description: string
  icon: string
  id: StackKey
  label: string
  tone: string
}> = [
  {
    id: 'react',
    label: 'React 19 + Vite 8',
    description:
      'Fast local dev with a small surface area and zero framework lock-in.',
    icon: 'i-carbon-logo-react',
    tone: 'from-sky-500/18 via-sky-500/8 to-transparent',
  },
  {
    id: 'zustand',
    label: 'Zustand store',
    description:
      'A single-file store keeps starter state obvious and easy to replace.',
    icon: 'i-solar-layers-outline',
    tone: 'from-emerald-500/18 via-emerald-500/8 to-transparent',
  },
  {
    id: 'shadcn',
    label: 'shadcn/ui',
    description:
      'Shared components live in packages/ui and are consumed from apps/web.',
    icon: 'i-solar-widget-4-outline',
    tone: 'from-amber-500/18 via-amber-500/8 to-transparent',
  },
  {
    id: 'iconify',
    label: 'Iconify classes',
    description:
      'Carbon and Solar icons are now available as Tailwind utility classes.',
    icon: 'i-solar-gallery-add-outline',
    tone: 'from-fuchsia-500/18 via-fuchsia-500/8 to-transparent',
  },
]

const themeOptions = [
  { icon: 'i-solar-sun-2-outline', label: 'Light', value: 'light' },
  { icon: 'i-solar-moon-outline', label: 'Dark', value: 'dark' },
  { icon: 'i-solar-laptop-2-outline', label: 'System', value: 'system' },
] as const

export function App() {
  const count = useStarterStore((state) => state.count)
  const decrement = useStarterStore((state) => state.decrement)
  const increment = useStarterStore((state) => state.increment)
  const reset = useStarterStore((state) => state.reset)
  const setSpotlight = useStarterStore((state) => state.setSpotlight)
  const spotlight = useStarterStore((state) => state.spotlight)
  const { setTheme, theme } = useTheme()

  const activeCard =
    stackCards.find((card) => card.id === spotlight) ?? stackCards[0]

  return (
    <main className="min-h-svh bg-[radial-gradient(circle_at_top_left,oklch(0.96_0.02_220),transparent_28%),radial-gradient(circle_at_top_right,oklch(0.94_0.03_80),transparent_24%),linear-gradient(180deg,transparent,oklch(0.98_0_0))]">
      <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-6 p-6 sm:p-10">
        <section className="border-border/60 bg-background/90 overflow-hidden rounded-[2rem] border shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="flex flex-col gap-5">
              <div className="border-border/70 bg-muted/50 text-muted-foreground inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
                <span className="i-solar-code-square-outline inline-block size-4" />
                Starter workspace
              </div>

              <div className="max-w-3xl space-y-3">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  React, Vite, Zustand, shadcn, Tailwind v4, and Iconify wired
                  into one starter.
                </h1>
                <p className="text-muted-foreground max-w-2xl text-sm leading-6 sm:text-base">
                  The workspace stays small on purpose: shared UI in{' '}
                  <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                    packages/ui
                  </code>
                  , the app in{' '}
                  <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                    apps/web
                  </code>
                  , and one Zustand store to prove the path is already working.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button onClick={increment}>
                  <span className="i-solar-bolt-outline inline-block size-4" />
                  Increment store
                </Button>
                <Button onClick={reset} variant="outline">
                  <span className="i-solar-refresh-outline inline-block size-4" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="border-border/70 bg-muted/35 rounded-[1.5rem] border p-4 sm:p-5">
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs font-medium tracking-[0.22em] uppercase">
                    Theme
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {themeOptions.map((option) => (
                      <Button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        size="sm"
                        variant={theme === option.value ? 'default' : 'outline'}
                      >
                        <span
                          className={cn('inline-block size-4', option.icon)}
                        />
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="border-border/70 bg-background/85 space-y-3 rounded-[1.25rem] border p-4">
                  <p className="text-muted-foreground text-xs font-medium tracking-[0.22em] uppercase">
                    Zustand counter
                  </p>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-5xl font-semibold tracking-tight">
                        {count}
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm">
                        Source of truth lives in{' '}
                        <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
                          apps/web/src/stores
                        </code>
                        .
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={decrement}
                        size="icon-sm"
                        variant="outline"
                      >
                        <span className="i-solar-minus-circle-outline inline-block size-4" />
                      </Button>
                      <Button onClick={increment} size="icon-sm">
                        <span className="i-solar-add-circle-outline inline-block size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {stackCards.map((card) => {
              const isActive = card.id === spotlight

              return (
                <button
                  key={card.id}
                  className={cn(
                    'group relative overflow-hidden rounded-[1.75rem] border p-5 text-left transition-transform duration-200',
                    'bg-background/88 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.45)]',
                    'hover:border-foreground/20 hover:-translate-y-0.5',
                    isActive
                      ? 'border-foreground/20 ring-foreground/10 ring-2'
                      : 'border-border/70',
                  )}
                  onClick={() => setSpotlight(card.id)}
                  type="button"
                >
                  <div
                    className={cn(
                      'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-100 transition-opacity',
                      card.tone,
                    )}
                  />
                  <div className="relative flex h-full flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={cn(
                          'text-foreground inline-block size-7 rounded-full',
                          card.icon,
                        )}
                      />
                      <span className="border-border/70 bg-background/80 text-muted-foreground rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase">
                        {card.id}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold">{card.label}</h2>
                      <p className="text-muted-foreground text-sm leading-6">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="border-border/70 bg-background/88 rounded-[1.75rem] border p-6 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.45)]">
            <div className="flex h-full flex-col gap-6">
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-[0.22em] uppercase">
                  Active slice
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className={cn('inline-block size-8', activeCard.icon)}
                  />
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {activeCard.label}
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-xl text-sm leading-6">
                  {activeCard.description}
                </p>
              </div>

              <div className="text-muted-foreground grid gap-3 text-sm">
                <div className="border-border/70 bg-muted/35 rounded-2xl border p-4">
                  <div className="text-foreground font-medium">
                    Monorepo shape
                  </div>
                  <div className="mt-1 leading-6">
                    Root scripts orchestrate the workspace, while `apps/web`
                    stays focused on the Vite app.
                  </div>
                </div>
                <div className="border-border/70 bg-muted/35 rounded-2xl border p-4">
                  <div className="text-foreground font-medium">
                    Tailwind + Iconify
                  </div>
                  <div className="mt-1 leading-6">
                    Icon classes like{' '}
                    <code className="bg-background rounded px-1.5 py-0.5 text-xs">
                      i-solar-gallery-add-outline
                    </code>{' '}
                    are available immediately from the shared UI package.
                  </div>
                </div>
                <div className="border-border/70 bg-muted/35 rounded-2xl border p-4">
                  <div className="text-foreground font-medium">
                    Press{' '}
                    <kbd className="bg-background rounded px-1.5 py-0.5 text-xs">
                      d
                    </kbd>{' '}
                    for dark mode
                  </div>
                  <div className="mt-1 leading-6">
                    The existing theme provider still works, and the buttons
                    above let you pin light, dark, or system mode.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
