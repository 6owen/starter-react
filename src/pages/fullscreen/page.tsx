import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router-dom'

export default function FullscreenPage() {
  const navigate = useNavigate()

  return (
    <section className="flex min-h-svh items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl space-y-6 rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-xl">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.3em] text-white/70 uppercase">
            Fullscreen layout
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance">
            This page bypasses the default shell and uses
            `layouts/fullscreen.tsx`.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-white/70">
            In this structure, the route entry still lives in
            <code className="bg-white/10 text-white">pages/**/page.tsx</code>,
            while layout choice is still resolved in the router layer.
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => navigate(-1)} variant="secondary">
            <span className="i-solar-arrow-left-outline inline-block size-4" />
            Back
          </Button>
          <Button asChild variant="outline">
            <NavLink to="/">Return Home</NavLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
