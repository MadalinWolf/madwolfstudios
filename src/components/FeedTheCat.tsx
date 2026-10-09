import { assetUrl } from '../asset'
import { LINKS } from '../data/links'
import { ButtonLink } from './Button'

/**
 * Compact donation section ("Feed the Cat") shown once, at the very bottom
 * of the homepage, right above the footer.
 *
 * - Frosted-glass look: the backdrop blur applies to the section's
 *   background layer ONLY (.feed-cat-panel in index.css) — the photo, copy
 *   and button are children of the panel and stay perfectly sharp.
 * - Donation destination is the studio's real GitHub Sponsors profile
 *   (LINKS.sponsors). External link opens in a new tab safely.
 */
export function FeedTheCat() {
  const sponsorUrl = LINKS.sponsors.url

  return (
    <section aria-labelledby="feed-the-cat-title" className="feed-cat-section grid-bg">
      <div className="mx-auto max-w-site px-5 py-14 sm:py-16">
        <div className="feed-cat-panel flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-7 sm:p-7">
          <img
            src={assetUrl('/images/feedmycat.jpg')}
            alt="Ginger tabby cat with green eyes sitting on a cat tree, staring at the camera"
            width={640}
            height={1047}
            loading="lazy"
            decoding="async"
            className="feed-cat-photo"
          />

          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-neon-lemon">
              [ SUPPORT THE STUDIO ]
            </span>

            <h2
              id="feed-the-cat-title"
              className="mt-3 text-2xl font-extrabold uppercase tracking-wide text-neon-lemon sm:text-3xl"
            >
              FEED THE CAT 🐈
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
              Enjoy my projects? Help keep the cat happy — every little contribution
              helps me keep building cool things.
            </p>

            {sponsorUrl && (
              <div className="mt-5">
                <ButtonLink to={sponsorUrl} external>
                  FEED THE CAT 🐾
                </ButtonLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
