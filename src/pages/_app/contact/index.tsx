import { Link, createFileRoute } from '@tanstack/react-router'

const contactOptions = [
  {
    body: 'Talk through your current review process and where feedback is getting stuck.',
    label: 'DISCOVERY',
    title: 'Book a walkthrough',
  },
  {
    body: 'Planning a rollout across design, product, and delivery? We can scope a pilot with you.',
    label: 'PILOT',
    title: 'Plan a team trial',
  },
  {
    body: 'Need custom onboarding or integration planning? Start with a direct conversation.',
    label: 'PARTNERSHIP',
    title: 'Discuss implementation',
  },
] as const

export const Route = createFileRoute('/_app/contact/')({
  component: ContactPage,
  head: () => ({
    meta: [{ title: 'Contact | StudioTool' }],
  }),
})

function ContactPage() {
  return (
    <section className="px-4 py-[112px] md:py-[144px]">
      <div className="mx-auto max-w-6xl space-y-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
              CONTACT
            </p>
            <h1 className="text-[28px] leading-[32px] font-light text-[#1A1A1A] md:text-[40px] md:leading-[44px]">
              Ready to refine how your team reviews, resolves, and approves?
            </h1>
            <p className="max-w-xl text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
              Start with a short conversation. We will map the current review
              loop, identify the handoff pain points, and outline a cleaner
              rollout.
            </p>
          </div>

          <div className="rounded-lg bg-[#F6F6F6] p-8">
            <div className="space-y-4">
              <div className="text-[14px] leading-[21px] font-semibold text-[#1A1A1A]">
                Reach the team
              </div>
              <a
                className="block text-[14px] leading-[21px] text-[rgba(26,26,26,0.65)] transition-colors hover:text-[#1A1A1A]"
                href="mailto:hello@studiotool.app"
              >
                hello@studiotool.app
              </a>
              <a
                className="block text-[14px] leading-[21px] text-[rgba(26,26,26,0.65)] transition-colors hover:text-[#1A1A1A]"
                href="tel:+1-415-555-0148"
              >
                +1 (415) 555-0148
              </a>
              <p className="text-[14px] leading-[21px] text-[rgba(26,26,26,0.65)]">
                Response window: Monday to Friday, within one business day.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {contactOptions.map((option) => (
            <article
              key={option.title}
              className="rounded-lg border border-[rgba(26,26,26,0.12)] px-6 py-7"
            >
              <div className="space-y-3">
                <span className="text-[12px] leading-[12px] font-bold tracking-widest text-[rgba(26,26,26,0.65)]">
                  {option.label}
                </span>
                <h2 className="text-[18px] leading-[24px] font-semibold text-[#1A1A1A]">
                  {option.title}
                </h2>
                <p className="text-[14px] leading-[21px] font-normal text-[rgba(26,26,26,0.65)]">
                  {option.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            className="rounded-lg bg-[#1A1A1A] px-8 py-3 text-[14px] leading-[21px] font-normal text-white transition-opacity hover:opacity-90"
            href="mailto:hello@studiotool.app"
          >
            Email StudioTool
          </a>
          <Link
            className="rounded-lg border border-[rgba(26,26,26,0.12)] px-8 py-3 text-[14px] leading-[21px] font-normal text-[#1A1A1A] transition-colors hover:bg-[#F6F6F6]"
            to="/work"
          >
            Review sample work
          </Link>
        </div>
      </div>
    </section>
  )
}
