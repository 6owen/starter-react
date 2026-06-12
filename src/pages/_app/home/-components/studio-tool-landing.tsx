import { Link } from '@tanstack/react-router'

const interfacePreviewSrc = `${import.meta.env.BASE_URL}stitch/studiotool-interface.png`

export function StudioToolLanding() {
  return (
    <>
      <section className="flex w-full flex-col items-center justify-center px-4 pt-[112px] pb-12 text-center md:pt-[144px]">
        <h1 className="mb-6 max-w-2xl text-[24px] leading-[24px] font-light text-[#1A1A1A] md:text-[32px] md:leading-[32px]">
          Simplify your creative feedback loop.
        </h1>
        <p className="mb-12 max-w-md text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
          StudioTool automates the mundane, allowing your team to focus on what
          matters: the craft of design.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            className="rounded-lg border border-[rgba(26,26,26,0.12)] bg-[#F6F6F6] px-8 py-3 text-[14px] leading-[21px] font-normal text-[#1A1A1A] transition-colors hover:bg-[#ECECEC]"
            to="/contact"
          >
            Start for free
          </Link>
          <Link
            className="rounded-lg border border-[rgba(26,26,26,0.12)] px-8 py-3 text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] transition-colors hover:border-[rgba(26,26,26,0.24)] hover:text-[#1A1A1A]"
            to="/features"
          >
            Explore features
          </Link>
        </div>
      </section>

      <section className="w-full px-4 md:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex [scrollbar-width:none] gap-12 overflow-x-auto border-b border-[rgba(26,26,26,0.12)] [&::-webkit-scrollbar]:hidden">
            <Link
              className="relative py-3 text-[14px] leading-[21px] font-normal whitespace-nowrap text-[#1A1A1A] after:absolute after:bottom-[-1px] after:left-0 after:h-px after:w-full after:bg-[#1A1A1A] after:content-['']"
              to="/home"
            >
              Overview
            </Link>
            <Link
              className="py-3 text-[14px] leading-[21px] font-normal whitespace-nowrap text-[rgba(26,26,26,0.65)] transition-colors hover:text-[#1A1A1A]"
              to="/features"
            >
              Features
            </Link>
            <Link
              className="py-3 text-[14px] leading-[21px] font-normal whitespace-nowrap text-[rgba(26,26,26,0.65)] transition-colors hover:text-[#1A1A1A]"
              to="/process"
            >
              Process
            </Link>
            <Link
              className="py-3 text-[14px] leading-[21px] font-normal whitespace-nowrap text-[rgba(26,26,26,0.65)] transition-colors hover:text-[#1A1A1A]"
              to="/work"
            >
              Work
            </Link>
          </div>

          <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-[#F6F6F6] p-6 md:p-12">
            <img
              alt="StudioTool Interface"
              className="h-full w-full rounded-lg object-cover"
              src={interfacePreviewSrc}
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-[112px] text-center md:py-[144px]">
        <div className="mx-auto max-w-2xl">
          <blockquote
            className="mb-6 text-[24px] leading-[32px] font-normal text-[#1A1A1A] italic"
            style={{ fontFamily: '"Crimson Pro", serif' }}
          >
            "StudioTool changed how we handle revisions. It brought a level of
            precision to our messy feedback cycles that we didn't know was
            possible."
          </blockquote>
          <cite className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] not-italic">
            — Sarah Jenkins, Creative Director at Forma
          </cite>
        </div>
      </section>

      <section className="w-full px-4 py-[112px] md:py-[144px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-lg bg-[#ECECEC] p-12 text-center">
          <h2 className="text-[24px] leading-[24px] font-light text-[#1A1A1A] md:text-[32px] md:leading-[32px]">
            Ready to refine your process?
          </h2>
          <p className="max-w-xl text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
            Review the workflow, inspect the feature set, then book a guided
            walkthrough for your studio.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              className="rounded-lg bg-[#1A1A1A] px-8 py-3 text-[14px] leading-[21px] font-normal text-white transition-opacity hover:opacity-90"
              to="/contact"
            >
              Join the Waitlist
            </Link>
            <Link
              className="rounded-lg border border-[rgba(26,26,26,0.12)] px-8 py-3 text-[14px] leading-[21px] font-normal text-[#1A1A1A] transition-colors hover:bg-[#F6F6F6]"
              to="/process"
            >
              See the process
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
