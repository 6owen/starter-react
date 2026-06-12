import { createFileRoute } from '@tanstack/react-router'
import { StudioToolLanding } from './-components/studio-tool-landing'

export const Route = createFileRoute('/_app/home/')({
  component: HomePage,
  head: () => ({
    meta: [{ title: 'Home | Starter React' }],
  }),
})

function HomePage() {
  return <StudioToolLanding />
}
