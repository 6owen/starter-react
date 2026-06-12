import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { appPrimaryNavigation } from '../-navigation'

export function AppHeader() {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const loginRedirect = pathname === '/login' ? '/home' : pathname

  useEffect(() => {
    let lastScrollTop = 0

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (isMobileNavOpen) {
        setIsHeaderHidden(false)
        return
      }

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        setIsHeaderHidden(true)
      } else {
        setIsHeaderHidden(false)
      }

      lastScrollTop = scrollTop
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobileNavOpen])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 z-50 flex h-[83px] w-full items-center justify-between border-b border-[rgba(26,26,26,0.12)] bg-white px-4 transition-transform duration-300 ease-in-out',
          isHeaderHidden && '-translate-y-full',
        )}
        id="top-nav"
      >
        <Link className="flex items-center" to="/home">
          <span className="text-[32px] leading-[32px] font-light tracking-tighter text-[#1A1A1A]">
            StudioTool
          </span>
        </Link>

        <div className="hidden items-center gap-12 md:flex">
          {appPrimaryNavigation.map((item) => (
            <Link
              key={item.to}
              activeOptions={{ exact: true }}
              activeProps={{
                className: 'text-[#1A1A1A]',
              }}
              className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] transition-colors hover:text-[#1A1A1A]"
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden h-10 rounded-lg border-[rgba(26,26,26,0.12)] bg-white px-5 text-[14px] font-normal text-[#1A1A1A] shadow-none hover:bg-[#F6F6F6] sm:inline-flex"
            variant="outline"
          >
            <Link search={{ redirect: loginRedirect }} to="/login">
              Login
            </Link>
          </Button>
          <Button
            asChild
            className="h-10 rounded-lg bg-[#F6F6F6] px-5 text-[14px] font-normal text-[#1A1A1A] shadow-none hover:bg-[#ECECEC]"
          >
            <Link to="/contact">Get Started</Link>
          </Button>
          <button
            aria-expanded={isMobileNavOpen}
            className="flex items-center p-2 md:hidden"
            onClick={() => setIsMobileNavOpen((current) => !current)}
            type="button"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      {isMobileNavOpen && (
        <div className="fixed inset-x-0 top-[83px] z-40 border-b border-[rgba(26,26,26,0.12)] bg-white px-4 py-6 md:hidden">
          <div className="flex flex-col gap-3">
            {appPrimaryNavigation.map((item) => (
              <Link
                key={item.to}
                activeOptions={{ exact: true }}
                activeProps={{
                  className: 'text-[#1A1A1A]',
                }}
                className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] transition-colors hover:text-[#1A1A1A]"
                onClick={() => setIsMobileNavOpen(false)}
                to={item.to}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <Button
              asChild
              className="h-10 rounded-lg border-[rgba(26,26,26,0.12)] bg-white px-5 text-[14px] font-normal text-[#1A1A1A] shadow-none hover:bg-[#F6F6F6]"
              variant="outline"
            >
              <Link
                onClick={() => setIsMobileNavOpen(false)}
                search={{ redirect: loginRedirect }}
                to="/login"
              >
                Login
              </Link>
            </Button>
            <Button
              asChild
              className="h-10 rounded-lg bg-[#F6F6F6] px-5 text-[14px] font-normal text-[#1A1A1A] shadow-none hover:bg-[#ECECEC]"
            >
              <Link onClick={() => setIsMobileNavOpen(false)} to="/contact">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
