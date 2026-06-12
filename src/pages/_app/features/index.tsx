import { Link, createFileRoute } from '@tanstack/react-router'

const featureCards = [
  {
    body: 'Markup every pixel with context-aware comments that sync directly to your design software in real-time.',
    label: 'PRECISION',
    title: 'Unified Annotations',
  },
  {
    body: 'Let AI organize incoming feedback by priority, type, and designer, reducing management overhead by 40%.',
    label: 'EFFICIENCY',
    title: 'Automated Triage',
  },
  {
    body: "A clean, non-destructive history of every decision made, ensuring you never lose the 'why' behind the 'what'.",
    label: 'CLARITY',
    title: 'Version Lineage',
  },
] as const

const capabilityCards = [
  {
    description:
      'Collect contextual notes from design, product, and client stakeholders in one review stream.',
    title: 'Review',
  },
  {
    description:
      'Assign, discuss, and resolve issues without leaving the same workflow surface.',
    title: 'Collaborate',
  },
  {
    description:
      'Gate approvals with explicit checkpoints so releases stop depending on scattered chat threads.',
    title: 'Approve',
  },
  {
    description:
      'Trigger follow-up tasks, summaries, and notifications as soon as feedback reaches the right state.',
    title: 'Automate',
  },
] as const

export const Route = createFileRoute('/_app/features/')({
  component: FeaturesPage,
  head: () => ({
    meta: [{ title: 'Features | StudioTool' }],
  }),
})

function FeaturesPage() {
  return (
    <section className="px-4 py-[112px] md:py-[144px]">
      <div className="mx-auto max-w-6xl space-y-16">
        <div className="max-w-3xl space-y-4">
          <p className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
            FEATURES
          </p>
          <h1 className="text-[28px] leading-[32px] font-light text-[#1A1A1A] md:text-[40px] md:leading-[44px]">
            Built to make feedback precise, traceable, and actually actionable.
          </h1>
          <p className="max-w-2xl text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
            StudioTool keeps the visual quality of a design review while giving
            operations, project management, and approvals a much cleaner system
            to work inside.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {featureCards.map((card) => (
            <article key={card.title} className="flex flex-col gap-3">
              <span className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
                {card.label}
              </span>
              <h2 className="text-[18px] leading-[24px] font-semibold text-[#1A1A1A]">
                {card.title}
              </h2>
              <p className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {capabilityCards.map((card) => (
            <article
              key={card.title}
              className="rounded-lg border border-[rgba(26,26,26,0.12)] bg-[#F6F6F6] p-6"
            >
              <div className="space-y-3">
                <h3 className="text-[16px] leading-[22px] font-semibold text-[#1A1A1A]">
                  {card.title}
                </h3>
                <p className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-lg bg-[#1A1A1A] px-8 py-3 text-[14px] leading-[21px] font-normal text-white transition-opacity hover:opacity-90"
            to="/process"
          >
            See the workflow
          </Link>
          <Link
            className="rounded-lg border border-[rgba(26,26,26,0.12)] px-8 py-3 text-[14px] leading-[21px] font-normal text-[#1A1A1A] transition-colors hover:bg-[#F6F6F6]"
            to="/contact"
          >
            Book a walkthrough
          </Link>
        </div>
      </div>
    </section>
  )
}
