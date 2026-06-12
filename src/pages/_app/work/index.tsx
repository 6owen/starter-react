import { Link, createFileRoute } from '@tanstack/react-router'

const workSamples = [
  {
    category: 'BRAND SYSTEMS',
    description:
      'Design teams managing identity revisions across multiple stakeholders without letting rationale disappear.',
    metric: '3.2x faster feedback closure',
    title: 'Campaign review operations',
  },
  {
    category: 'PRODUCT DESIGN',
    description:
      'Product orgs consolidating design critique, QA comments, and launch approvals into one visible queue.',
    metric: '42% less coordination overhead',
    title: 'Interface release management',
  },
  {
    category: 'CREATIVE OPS',
    description:
      'Studios building a repeatable review rhythm so every project inherits cleaner process by default.',
    metric: '1 shared source of truth',
    title: 'Studio-wide review standard',
  },
] as const

export const Route = createFileRoute('/_app/work/')({
  component: WorkPage,
  head: () => ({
    meta: [{ title: 'Work | StudioTool' }],
  }),
})

function WorkPage() {
  return (
    <section className="px-4 py-[112px] md:py-[144px]">
      <div className="mx-auto max-w-6xl space-y-16">
        <div className="max-w-3xl space-y-4">
          <p className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
            WORK
          </p>
          <h1 className="text-[28px] leading-[32px] font-light text-[#1A1A1A] md:text-[40px] md:leading-[44px]">
            Built for teams that care about craft and still need operational
            clarity.
          </h1>
          <p className="max-w-2xl text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
            StudioTool is most valuable where design quality matters, but
            project velocity and accountability still need to hold up.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {workSamples.map((sample) => (
            <article
              key={sample.title}
              className="rounded-lg border border-[rgba(26,26,26,0.12)] bg-[#F6F6F6] p-6"
            >
              <div className="space-y-4">
                <span className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
                  {sample.category}
                </span>
                <h2 className="text-[18px] leading-[24px] font-semibold text-[#1A1A1A]">
                  {sample.title}
                </h2>
                <p className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
                  {sample.description}
                </p>
                <div className="rounded-lg bg-white px-4 py-3 text-[14px] leading-[21px] font-medium text-[#1A1A1A]">
                  {sample.metric}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="max-w-3xl rounded-lg bg-[#ECECEC] p-8">
          <blockquote
            className="mb-4 text-[24px] leading-[32px] font-normal text-[#1A1A1A] italic"
            style={{ fontFamily: '"Crimson Pro", serif' }}
          >
            "We stopped chasing comments across four tools and started making
            better decisions in one place."
          </blockquote>
          <cite className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)] not-italic">
            — Maya Ortiz, Design Operations Lead
          </cite>
        </div>

        <Link
          className="inline-flex rounded-lg border border-[rgba(26,26,26,0.12)] bg-[#F6F6F6] px-8 py-3 text-[14px] leading-[21px] font-normal text-[#1A1A1A] transition-colors hover:bg-[#ECECEC]"
          to="/contact"
        >
          Request a studio walkthrough
        </Link>
      </div>
    </section>
  )
}
