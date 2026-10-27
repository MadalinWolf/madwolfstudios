import { PageHeader } from '../components/SectionHeader'
import { LINKS } from '../data/links'
import { SITE } from '../data/site'

/*
 * Privacy — plain-language privacy policy for madwolfstudios.com itself and
 * pointers to the per-product policies. Every statement here matches what the
 * code does: the site is static, self-hosted and ships no analytics, cookies
 * or third-party scripts (see also the CSP emitted by scripts/serve-dist.mjs
 * and the production host headers).
 */

function Block({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={id} className="border-t border-line pt-8">
      <h2
        id={id}
        className="mb-4 text-xl font-extrabold uppercase tracking-wide text-neon-lemon sm:text-2xl"
      >
        {title}
      </h2>
      <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-text-secondary">
        {children}
      </div>
    </section>
  )
}

export function Privacy() {
  return (
    <>
      <PageHeader
        eyebrow="// PRIVACY"
        title="PRIVACY"
        description="How madwolfstudios.com and Madwolf Studios products handle your data — short version: we collect nothing."
      />

      <div className="mx-auto max-w-site space-y-10 px-5 py-14 sm:py-20">
        <Block id="summary" title="The short version">
          <p>
            This website sets <strong className="text-text-primary">no cookies</strong>, runs{' '}
            <strong className="text-text-primary">no analytics</strong>, no ads and no tracking
            scripts — from us or anyone else. There are no accounts and no forms that store your
            data. What you do on this site stays between you and your browser.
          </p>
        </Block>

        <Block id="website" title="This website">
          <p>
            {SITE.namePlain} is a statically generated site: pages are built as plain files and
            served by your hosting provider. It contains no third-party JavaScript, no
            embeds that track you, and the typeface is served from this domain instead of a
            font CDN.
          </p>
          <p>
            Like almost any web server, the host may keep standard technical logs for security
            and reliability — typically your IP address, the time of the request, the page
            requested and your browser&apos;s user agent. Those logs belong to the hosting
            provider, not to a tracking system, and are not used to build profiles.
          </p>
          <p>
            Clicking an external link (GitHub, sponsor pages, stores) leaves this site, and
            those services apply their own privacy policies.
          </p>
        </Block>

        <Block id="contact" title="Contacting the studio">
          <p>
            If you email the studio, your message — and the address you send from — is handled
            by your email provider and ours. The content is read only to answer you; it is not
            added to any list, and there is no newsletter to unsubscribe from.
          </p>
        </Block>

        <Block id="products" title="Products & their own policies">
          <p>
            <strong className="text-text-primary">CofreTabs</strong> — the browser extension —
            is local-first by design: saved tabs, folders and notes live in IndexedDB inside
            your browser profile, with no backend, no account and no analytics. Its only
            network request is an optional update check against the public GitHub releases feed
            (at most once every 12 hours) that contains no vault data. The full policy ships
            with the extension and lives in the repository:{' '}
            <a
              href="https://github.com/MadalinWolf/CofreTabs/blob/main/docs/PRIVACY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="link font-bold"
            >
              docs/PRIVACY.md ↗
            </a>
          </p>
          <p>
            <strong className="text-text-primary">MadScope</strong> runs entirely on your
            machine: the render server binds to 127.0.0.1, screenshots are written to a local
            directory, and the codebase contains no telemetry, accounts or upload code.
          </p>
          <p>
            Game projects in development have no live services connected to this site; any
            future change to data handling will be documented here first.
          </p>
        </Block>

        <Block id="changes" title="Changes & contact">
          <p>
            This page was last updated on 27 October 2026. If the way this site handles data
            ever changes, this page will be updated alongside the change — no silent policy
            shifts.
          </p>
          <p>
            Questions about privacy?{' '}
            <a href={LINKS.email.url!} className="link font-bold">
              Email the studio
            </a>{' '}
            or open an issue on{' '}
            <a
              href={LINKS.github.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="link font-bold"
            >
              GitHub ↗
            </a>
            .
          </p>
        </Block>
      </div>
    </>
  )
}
