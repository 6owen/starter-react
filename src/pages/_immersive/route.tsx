import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_immersive')({
  component: FullscreenLayoutRoute,
})

function FullscreenLayoutRoute() {
  return (
    <div className="min-h-svh bg-[linear-gradient(145deg,oklch(0.22_0.04_260),oklch(0.13_0.02_250)_45%,oklch(0.1_0.02_250))] text-white">
      <Outlet />
    </div>
  )
}
