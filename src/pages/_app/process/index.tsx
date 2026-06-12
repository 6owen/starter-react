import { Link, createFileRoute } from '@tanstack/react-router'

const steps = [
  {
    body: 'Bring frames, prototypes, screenshots, and comments into one shared review surface.',
    number: '01',
    title: 'Capture the context',
  },
  {
    body: 'Let StudioTool group notes by scope, owner, and urgency before the team starts reacting.',
    number: '02',
    title: 'Triage automatically',
  },
  {
    body: 'Resolve feedback in a visible queue so discussions, decisions, and changes stay attached.',
    number: '03',
    title: 'Work through the queue',
  },
  {
    body: 'Lock approval states, preserve lineage, and move forward with a clear release record.',
    number: '04',
    title: 'Ship with confidence',
  },
] as const

export const Route = createFileRoute('/_app/process/')({
  component: ProcessPage,
  head: () => ({
    meta: [{ title: 'Process | StudioTool' }],
  }),
})

function ProcessPage() {
  return (
    <section className="px-4 py-[112px] md:py-[144px]">
      <div className="mx-auto max-w-6xl space-y-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <p className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
              PROCESS
            </p>
            <h1 className="text-[28px] leading-[32px] font-light text-[#1A1A1A] md:text-[40px] md:leading-[44px]">
              A review workflow that stays calm even when the project does not.
            </h1>
            <p className="max-w-xl text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
              The goal is not more comments. The goal is a reliable path from
              input to action to approval, without losing the creative thread.
            </p>
          </div>

          <div className="rounded-lg border border-[rgba(26,26,26,0.12)] bg-[#F6F6F6] p-8">
            <div className="space-y-5">
              <div className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
                STUDIO FLOW
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-white p-5">
                  <div className="text-[14px] leading-[21px] font-semibold text-[#1A1A1A]">
                    Incoming review
                  </div>
                  <p className="mt-2 text-[14px] leading-[21px] text-[rgba(26,26,26,0.65)]">
                    Notes from product, brand, and client all arrive with visual
                    context intact.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-5">
                  <div className="text-[14px] leading-[21px] font-semibold text-[#1A1A1A]">
                    Routed resolution
                  </div>
                  <p className="mt-2 text-[14px] leading-[21px] text-[rgba(26,26,26,0.65)]">
                    Tasks move to the right owner with traceable decisions and
                    status changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-lg border border-[rgba(26,26,26,0.12)] px-6 py-7"
            >
              <div className="space-y-3">
                <span className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
                  {step.number}
                </span>
                <h2 className="text-[20px] leading-[26px] font-semibold text-[#1A1A1A]">
                  {step.title}
                </h2>
                <p className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
                  {step.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <Link
          className="inline-flex rounded-lg bg-[#1A1A1A] px-8 py-3 text-[14px] leading-[21px] font-normal text-white transition-opacity hover:opacity-90"
          to="/contact"
        >
          Talk through your workflow
        </Link>
      </div>
    </section>
  )
}
