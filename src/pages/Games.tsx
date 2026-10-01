import { ButtonLink } from '../components/Button'
import { GameCard } from '../components/GameCard'
import { MediaSlotFrame, PlaceholderBox } from '../components/Placeholder'
import { PageHeader } from '../components/SectionHeader'
import { StatusBadge } from '../components/StatusBadge'
import { GAMES, getFeaturedGames } from '../data/games'

export function Games() {
  const featured = getFeaturedGames()
  const rest = GAMES.filter((g) => !g.featured)
  const [first] = featured

  return (
    <>
      <PageHeader
        eyebrow="// GAMES"
        title="GAMES"
        description="Games in development at Madwolf Studios."
      />

      <div className="mx-auto max-w-site px-5 py-14 sm:py-20">
        {/* Featured game — the first entry of the GAMES array */}
        {first && (
          <article className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="border border-line px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                  FEATURED · GAME
                </span>
                <StatusBadge status={first.status} />
              </div>

              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-neon-lemon sm:text-4xl">
                {first.name}
              </h2>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
                {first.tagline}
              </p>

              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {first.info.map((row) => (
                  <div key={row.label} className="border border-line p-3">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                      {row.value ?? <span className="text-text-faint">[ TO BE PROVIDED ]</span>}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink to={`/games/${first.slug}`}>VIEW GAME</ButtonLink>
              </div>
            </div>

            <div className="space-y-6">
              {first.screenshots[0] && <MediaSlotFrame slot={first.screenshots[0]} />}
              {!first.screenshots[0] && (
                <PlaceholderBox label="SCREENSHOTS — TO BE PROVIDED" />
              )}
            </div>
          </article>
        )}

        {/* Remaining games (hidden until more are added to the data file) */}
        {rest.length > 0 && (
          <section className="mt-14" aria-label="More games">
            <h2 className="mb-6 border-b border-line pb-3 text-xl font-extrabold uppercase tracking-wide text-neon-lemon">
              More Games
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((game) => (
                <GameCard key={game.slug} game={game} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
