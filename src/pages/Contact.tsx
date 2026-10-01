import { ButtonLink } from '../components/Button'
import { LinkList } from '../components/LinkList'
import { PlaceholderBox } from '../components/Placeholder'
import { PageHeader } from '../components/SectionHeader'
import { CONTACT_LINK_IDS, LINKS } from '../data/links'

export function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="// GET IN TOUCH"
        title="CONTACT"
        description="Ways to reach Madwolf Studios. More channels open as the studio grows."
      />

      <div className="mx-auto grid max-w-site gap-10 px-5 py-14 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        {/* Link list */}
        <section aria-labelledby="channels">
          <h2
            id="channels"
            className="mb-5 border-b border-line pb-3 text-xl font-extrabold uppercase tracking-wide text-neon-lemon"
          >
            Channels
          </h2>
          <LinkList ids={CONTACT_LINK_IDS} />
        </section>

        {/* Email placeholder + quick actions */}
        <aside className="space-y-6">
          <div>
            <h2 className="mb-5 border-b border-line pb-3 text-xl font-extrabold uppercase tracking-wide text-neon-lemon">
              Direct Contact
            </h2>
            <PlaceholderBox label="EMAIL ADDRESS — TO BE ADDED">
              A direct contact address will be published here as soon as it is set up.
            </PlaceholderBox>
          </div>

          <div className="card p-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-neon-lemon">
              QUICK ACTIONS
            </span>
            <div className="mt-5 flex flex-col gap-3">
              <ButtonLink
                to={LINKS.github.url!}
                external
                variant="ghost"
                className="w-full"
              >
                GITHUB ↗
              </ButtonLink>
              <ButtonLink to="/dev-log" variant="ghost" className="w-full">
                READ THE DEV LOG
              </ButtonLink>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
