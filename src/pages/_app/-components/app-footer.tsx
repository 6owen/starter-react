import { Link } from '@tanstack/react-router'

export function AppFooter() {
  return (
    <footer className="w-full border-t border-[rgba(26,26,26,0.12)] bg-white px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-12 md:flex-row md:justify-between md:gap-0">
        <div className="flex flex-col gap-2">
          <Link to="/home">
            <span className="text-[32px] leading-[32px] tracking-tighter text-[#1A1A1A]">
              StudioTool
            </span>
          </Link>
          <p className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
            © 2026 StudioTool. All rights reserved.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] leading-[12px] font-bold text-[#1A1A1A]">
              Product
            </span>
            <Link
              className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] hover:text-[#1A1A1A]"
              to="/features"
            >
              Features
            </Link>
            <Link
              className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] hover:text-[#1A1A1A]"
              to="/process"
            >
              Process
            </Link>
            <Link
              className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] hover:text-[#1A1A1A]"
              to="/work"
            >
              Work
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[12px] leading-[12px] font-bold text-[#1A1A1A]">
              Company
            </span>
            <Link
              className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] hover:text-[#1A1A1A]"
              to="/contact"
            >
              Contact
            </Link>
            <a
              className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] hover:text-[#1A1A1A]"
              href="mailto:hello@studiotool.app"
            >
              hello@studiotool.app
            </a>
            <a
              className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] hover:text-[#1A1A1A]"
              href="tel:+1-415-555-0148"
            >
              +1 (415) 555-0148
            </a>
          </div>

          <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
            <span className="text-[12px] leading-[12px] font-bold text-[#1A1A1A]">
              Social
            </span>
            <a
              className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] hover:text-[#1A1A1A]"
              href="https://x.com"
              rel="noreferrer"
              target="_blank"
            >
              Twitter
            </a>
            <a
              className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] hover:text-[#1A1A1A]"
              href="https://read.cv"
              rel="noreferrer"
              target="_blank"
            >
              Read.cv
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
