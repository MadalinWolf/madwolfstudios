import type { Game } from '../data/games'
import { StatusBadge } from './StatusBadge'
import { Link } from '../router'

/* Card used on the home page and the /games index. */
export function GameCard({ game }: { game: Game }) {
  return (
    <article className="card group flex flex-col p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="border border-line px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
          GAME
        </span>
        <StatusBadge status={game.status} />
      </div>

      <h3 className="text-xl font-extrabold uppercase tracking-wide text-neon-lemon">
        {game.name}
      </h3>

      <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-text-muted">
        {game.tagline}
      </p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
        {game.info
          .map((row) => row.label)
          .join(' · ')}
        <span className="mt-2 block text-xs text-text-muted">[ DETAILS TO BE PROVIDED ]</span>
      </p>

      <Link
        to={`/games/${game.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-neon-green group-hover:text-neon-lemon"
        aria-label={`${game.name} — VIEW GAME →`}
      >
        VIEW GAME <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
