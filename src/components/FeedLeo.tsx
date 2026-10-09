import { assetUrl } from '../asset'
import { LINKS } from '../data/links'
import { ButtonLink } from './Button'

/**
 * "Feed My Cat" — a short, funny introduction to Leo, shown once at the
 * very bottom of the homepage, immediately before the footer.
 *
 * Three layers (all styling in index.css, .feed-leo-*):
 *   1. .feed-leo-bg  — decorative: the SAME photo, enlarged and strongly blurred
 *   2. ::before      — dark scrim + subtle edge vignette for text readability
 *   3. content       — sharp foreground photo, exact copy, Sponsors button
 * Nothing in layer 3 is ever blurred or filtered.
 *
 * Destination is the studio's real GitHub Sponsors profile (LINKS.sponsors);
 * the external link opens in a new tab safely.
 */
export function FeedLeo() {
  const sponsorUrl = LINKS.sponsors.url
  const leoPhoto = assetUrl('/images/feedmycat.jpg')

  return (
    <section aria-labelledby="feed-leo-title" className="feed-leo-section">
      {/* Layer 1 — decorative background: enlarged + strongly blurred */}
      <img
        src={leoPhoto}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="feed-leo-bg"
      />

      {/* Layer 3 — content (sits above the scrim) */}
      <div className="feed-leo-content mx-auto max-w-site px-5 py-16 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Foreground photo of Leo — always sharp */}
          <img
            src={leoPhoto}
            alt="Ginger tabby cat with green eyes sitting on a cat tree, staring at the camera"
            width={640}
            height={1047}
            loading="lazy"
            decoding="async"
            className="feed-leo-photo"
          />

          <div className="min-w-0 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-neon-lemon">
              [ A WORD FROM MANAGEMENT ]
            </span>

            <h2
              id="feed-leo-title"
              className="mt-3 text-3xl font-extrabold uppercase tracking-wide text-neon-lemon sm:text-4xl lg:text-5xl"
            >
              THIS IS LEO. 🐈
            </h2>

            {/* The joke reads as a little poem — one line per block */}
            <div className="mt-6 text-sm leading-relaxed text-text-primary sm:text-base">
              <p className="space-y-2">
                <span className="block">Fed? Yes.</span>
                <span className="block">Healthy? Absolutely.</span>
                <span className="block">Hungry? According to him, always.</span>
              </p>
              <p className="mt-5 space-y-2">
                <span className="block">His bowl is full. His belly is full.</span>
                <span className="block">His appetite knows no laws.</span>
              </p>
            </div>

            <p className="feed-leo-ask mt-6">
              Help me keep this furry eating machine happy before he leaves me
              surviving on cat food too.
            </p>

            {sponsorUrl && (
              <div className="mt-7">
                <ButtonLink to={sponsorUrl} external>
                  FEED LEO 🐾
                </ButtonLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
