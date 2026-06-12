import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type StudioLoginFormProps = {
  redirect: string
}

export function StudioLoginForm({ redirect }: Readonly<StudioLoginFormProps>) {
  return (
    <div className="rounded-lg border border-[rgba(26,26,26,0.12)] bg-[#F6F6F6] p-8 sm:p-10">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
            LOGIN
          </p>
          <h2 className="text-[28px] leading-[32px] font-light text-[#1A1A1A]">
            Sign in to continue the review.
          </h2>
          <p className="max-w-md text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
            This is a static preview of the login experience. It keeps the same
            quiet visual language without inheriting the marketing header and
            footer.
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              autoComplete="email"
              id="login-email"
              placeholder="name@studio.com"
              type="email"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="login-password">Password</Label>
              <Link
                className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] transition-colors hover:text-[#1A1A1A]"
                to="/contact"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              autoComplete="current-password"
              id="login-password"
              placeholder="Enter your password"
              type="password"
            />
          </div>

          <div className="rounded-lg border border-[rgba(26,26,26,0.12)] bg-white px-4 py-3">
            <p className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
              REDIRECT
            </p>
            <p className="mt-2 text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
              After a real sign-in succeeds, the app should send the user back
              to <code className="font-medium text-[#1A1A1A]">{redirect}</code>.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="h-10 flex-1 rounded-lg bg-[#1A1A1A] px-5 text-[14px] font-normal text-white hover:bg-[#1A1A1A]/92"
              type="submit"
            >
              Sign in
            </Button>
            <Button
              asChild
              className="h-10 flex-1 rounded-lg border-[rgba(26,26,26,0.12)] bg-white px-5 text-[14px] font-normal text-[#1A1A1A] shadow-none hover:bg-[#ECECEC]"
              variant="outline"
            >
              <Link to="/home">Back Home</Link>
            </Button>
          </div>
        </form>

        <p className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
          Need access for your team?{' '}
          <Link
            className="text-[#1A1A1A] underline-offset-4 transition-opacity hover:underline hover:opacity-75"
            to="/contact"
          >
            Talk to StudioTool
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
