import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { useAppStore } from '@/stores'
import { FeatureCard } from './-components/feature-card'
import { StoreMetricCard } from './-components/store-metric-card'
import { appSummaryQueryOptions } from './-queries'

const featureCards = [
  {
    description:
      'The app shell now comes from pathless layout routes under src/pages instead of react-router-dom wrappers.',
    icon: 'i-solar-widget-4-outline',
    title: 'TanStack route tree',
  },
  {
    description:
      'Page-private pieces stay beside their route under the same directory, using -components and sibling files for local logic.',
    icon: 'i-solar-folder-with-files-outline',
    title: 'Colocated pages',
  },
  {
    description:
      'QueryClient lives in services, route loaders prefetch with ensureQueryData, and components consume the same query options.',
    icon: 'i-solar-route-outline',
    title: 'Router + Query',
  },
  {
    description:
      'Request infrastructure keeps living in services, ready for REST, tRPC, or any future remote client you wire in.',
    icon: 'i-solar-layers-outline',
    title: 'Services stays central',
  },
]

export const Route = createFileRoute('/_app/')({
  component: HomePage,
  head: () => ({
    meta: [{ title: 'Home | Starter React' }],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(appSummaryQueryOptions),
})

function HomePage() {
  const { data: summary } = useSuspenseQuery(appSummaryQueryOptions)
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
              This starter now runs on TanStack Start with pages, services, and
              route-local components kept together.
            </h2>
            <p className="text-muted-foreground max-w-2xl text-sm leading-7 sm:text-base">
              `pages` owns the route tree. `services` owns request and query
              infrastructure. `stores` stays focused on local UI state instead
              of remote data.
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

        <StoreMetricCard demoCount={demoCount} summary={summary} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featureCards.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  )
}
