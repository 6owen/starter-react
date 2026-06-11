import { Button } from '@/components/ui/button'

import { useAppStore } from '@/stores'
import { FeatureCard } from './components/feature-card'
import { StoreMetricCard } from './components/store-metric-card'

const featureCards = [
  {
    description:
      'Top-level files in src/pages/*.tsx are pages, and nested route folders use page.tsx as the entry file.',
    icon: 'i-solar-widget-4-outline',
    title: 'Conventional pages',
  },
  {
    description:
      'Page-private children stay beside the page under src/pages/**/components instead of being promoted too early.',
    icon: 'i-solar-folder-with-files-outline',
    title: 'Local page components',
  },
  {
    description:
      'Custom route registration and guard logic live under src/routers for anything not covered by the filesystem.',
    icon: 'i-solar-route-outline',
    title: 'Custom routers',
  },
  {
    description:
      'UI components and helper methods now live directly inside src/components, src/libs, and src/styles.',
    icon: 'i-solar-layers-outline',
    title: 'Local app structure',
  },
  {
    description:
      'Auto imports cover React hooks, react-router-dom, react-use, and your own composables via src/typings/auto-imports.d.ts.',
    icon: 'i-solar-code-outline',
    title: 'Generated typings',
  },
]

export default function HomePage() {
  const appName = useAppStore((state) => state.appName)
  const demoCount = useAppStore((state) => state.demoCount)
  const incrementDemoCount = useAppStore((state) => state.incrementDemoCount)
  const resetDemoCount = useAppStore((state) => state.resetDemoCount)

  return (
    <section className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div className="border-border/70 bg-muted/40 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
            <span className="i-carbon-logo-react inline-block size-4" />
            {appName}
          </div>
          <div className="max-w-3xl space-y-3">
            <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Your React starter now follows your preferred single-app directory
              habits.
            </h2>
            <p className="text-muted-foreground max-w-2xl text-sm leading-7 sm:text-base">
              `typings`, `styles`, `stores`, `setups`, `services`, `routers`,
              `libs`, `layouts`, `pages`, `composables`, and `components` still
              exist, but pages now prefer route folders and page-local children
              over broad reuse by default.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={incrementDemoCount}>
              <span className="i-solar-add-circle-outline inline-block size-4" />
              Increase counter
            </Button>
            <Button onClick={resetDemoCount} variant="outline">
              <span className="i-solar-refresh-outline inline-block size-4" />
              Reset
            </Button>
          </div>
        </div>

        <StoreMetricCard demoCount={demoCount} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featureCards.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  )
}
