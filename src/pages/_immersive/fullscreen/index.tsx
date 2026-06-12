import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_immersive/fullscreen/')({
  component: FullscreenPage,
  head: () => ({
    meta: [{ title: 'Fullscreen | Starter React' }],
  }),
})

function FullscreenPage() {
  const navigate = useNavigate()

  return (
    <section className="flex min-h-svh items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl space-y-6 rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-xl">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.3em] text-white/70 uppercase">
            Fullscreen layout
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-balance">
            This route uses a TanStack pathless layout instead of a custom
            layout map.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-white/70">
            The URL stays `/fullscreen`, but the route lives under
            `src/pages/_immersive/fullscreen/index.tsx`, so the shell and page
            files stay in one module directory.
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => navigate({ to: '/home' })} variant="secondary">
            <span className="i-solar-arrow-left-outline inline-block size-4" />
            Back Home
          </Button>
          <Button asChild variant="outline">
            <Link to="/about">Open About</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
