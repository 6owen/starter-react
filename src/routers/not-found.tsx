import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="space-y-4 text-center">
      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase">
        404
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground mx-auto max-w-lg text-sm leading-6">
        The route exists in the router layer, but nothing matched this path.
      </p>
      <div className="flex justify-center">
        <Button asChild>
          <NavLink to="/">Go Home</NavLink>
        </Button>
      </div>
    </section>
  )
}
