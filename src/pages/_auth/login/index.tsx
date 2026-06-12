import { Link, createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { StudioLoginForm } from './-components/studio-login-form'

export const Route = createFileRoute('/_auth/login/')({
  component: LoginPage,
  head: () => ({
    meta: [{ title: 'Login | StudioTool' }],
  }),
  validateSearch: (search): { redirect?: string } =>
    typeof search.redirect === 'string' ? { redirect: search.redirect } : {},
})

function LoginPage() {
  const search = Route.useSearch()
  const redirect = search.redirect ?? '/home'

  return (
    <main className="min-h-svh bg-white text-[#1A1A1A]">
      <div className="grid min-h-svh lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
        <section className="flex flex-col border-b border-[rgba(26,26,26,0.12)] bg-[#F9F9F9] px-4 py-6 sm:px-6 lg:border-r lg:border-b-0 lg:px-8 lg:py-8">
          <div className="flex items-center justify-between gap-4">
            <Link className="flex items-center" to="/home">
              <span className="text-[32px] leading-[32px] font-light tracking-tighter text-[#1A1A1A]">
                StudioTool
              </span>
            </Link>

            <Button
              asChild
              className="h-10 rounded-lg border-[rgba(26,26,26,0.12)] bg-white px-5 text-[14px] font-normal text-[#1A1A1A] shadow-none hover:bg-[#F6F6F6]"
              variant="outline"
            >
              <Link to="/home">Back Home</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-1 flex-col justify-between gap-10 lg:mt-16">
            <div className="space-y-8">
              <div className="max-w-xl space-y-4">
                <p className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
                  ACCESS
                </p>
                <h1 className="text-[28px] leading-[32px] font-light text-[#1A1A1A] md:text-[40px] md:leading-[44px]">
                  A fullscreen sign-in surface that stands on its own.
                </h1>
                <p className="max-w-xl text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
                  Login should not inherit the marketing shell. It gets its own
                  full-height page, the same quiet palette, and just enough
                  structure to keep the flow clean.
                </p>
              </div>

              <div className="rounded-lg bg-[#ECECEC] p-8">
                <blockquote
                  className="mb-4 text-[24px] leading-[32px] font-normal text-[#1A1A1A] italic"
                  style={{ fontFamily: '"Crimson Pro", serif' }}
                >
                  "The fastest way to trust a workflow is to make every step
                  feel obvious."
                </blockquote>
                <p className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
                  The page is separate from the site navigation, but it still
                  belongs to the same product language.
                </p>
              </div>
            </div>

            <div className="grid gap-4 xl:max-w-2xl xl:grid-cols-2">
              <div className="rounded-lg border border-[rgba(26,26,26,0.12)] bg-white p-5">
                <p className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
                  REDIRECT
                </p>
                <p className="mt-3 text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
                  Current return path:
                  <span className="ml-1 font-medium text-[#1A1A1A]">
                    {redirect}
                  </span>
                </p>
              </div>

              <div className="rounded-lg border border-[rgba(26,26,26,0.12)] bg-white p-5">
                <p className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
                  STATUS
                </p>
                <p className="mt-3 text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
                  Static UI preview only. Real auth logic can be added later
                  without changing this route boundary.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[480px]">
            <StudioLoginForm redirect={redirect} />
          </div>
        </section>
      </div>
    </main>
  )
}
