import { type ReactNode } from 'react'
import { ButtonLink } from '../components/Button'
import { DevLogEntryCard } from '../components/DevLogEntry'
import { MediaSlotFrame, PlaceholderBox } from '../components/Placeholder'
import { PlatformLinks } from '../components/PlatformLinks'
import { Eyebrow } from '../components/SectionHeader'
import { StatusBadge } from '../components/StatusBadge'
import { getEntriesForProject } from '../data/devLog'
import type { Game } from '../data/games'
import { Link } from '../router'

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="border-t border-line pt-10" aria-labelledby={id}>
      <div className="mb-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          id={id}
          className="mt-2 text-xl font-extrabold uppercase tracking-wide text-neon-lemon sm:text-2xl"
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

export function GameDetail({ game }: { game: Game }) {
  const entries = getEntriesForProject(game.slug)

  return (
    <div className="mx-auto max-w-site px-5 py-12 sm:py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          to="/games"
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted hover:text-neon-green"
        >
          ← GAMES
        </Link>
      </nav>

      {/* Header */}
      <header>
        <div className="flex flex-wrap items-center gap-3">
          <span className="border border-line px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
            GAME
          </span>
          <StatusBadge status={game.status} />
        </div>

        <h1 className="mt-4 text-4xl font-extrabold uppercase tracking-tight text-neon-lemon text-glow-lemon sm:text-6xl">
          {game.name}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
          {game.tagline}
        </p>

        <div className="mt-7">
          <PlatformLinks ids={game.links} />
        </div>
      </header>

      {/* Info table */}
      <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {game.info.map((row) => (
          <div key={row.label} className="card p-4">
            <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              {row.label}
            </dt>
            <dd className="mt-1.5 text-xs font-bold uppercase tracking-[0.1em] text-text-primary">
              {row.value ?? <span className="text-text-faint">[ TO BE PROVIDED ]</span>}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 space-y-12">
        {/* CONCEPT */}
        <Section id="concept" eyebrow="// 01" title="Game Concept">
          {game.concept ? (
            <p className="max-w-3xl text-sm leading-relaxed text-text-secondary sm:text-base">
              {game.concept}
            </p>
          ) : (
            <PlaceholderBox label="GAME CONCEPT — TO BE PROVIDED">
              The concept and premise of {game.name} will be described here.
            </PlaceholderBox>
          )}
        </Section>

        {/* GAMEPLAY */}
        <Section id="gameplay" eyebrow="// 02" title="Gameplay">
          {game.gameplay ? (
            <p className="max-w-3xl text-sm leading-relaxed text-text-secondary sm:text-base">
              {game.gameplay}
            </p>
          ) : (
            <PlaceholderBox label="GAMEPLAY — TO BE PROVIDED">
              Details about how the game plays will be published here.
            </PlaceholderBox>
          )}
        </Section>

        {/* SCREENSHOTS */}
        <Section id="screenshots" eyebrow="// 03" title="Screenshots">
          {game.screenshots.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {game.screenshots.map((slot, i) => (
                <MediaSlotFrame key={i} slot={slot} />
              ))}
            </div>
          ) : (
            <PlaceholderBox label="SCREENSHOTS — TO BE PROVIDED">
              Screenshots will be published here.
            </PlaceholderBox>
          )}
        </Section>

        {/* ARTWORK */}
        <Section id="artwork" eyebrow="// 04" title="Artwork">
          {game.artwork ? (
            <div className="max-w-md">
              <MediaSlotFrame slot={game.artwork} aspect="aspect-square" />
            </div>
          ) : (
            <PlaceholderBox label="ARTWORK — TO BE PROVIDED">
              Key artwork will be published here.
            </PlaceholderBox>
          )}
        </Section>

        {/* TRAILER */}
        <Section id="trailer" eyebrow="// 05" title="Trailer">
          {game.trailer?.url ? (
            <div className="card p-3">
              <iframe
                src={game.trailer.url}
                title={`${game.name} trailer`}
                className="aspect-video w-full border border-line"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <PlaceholderBox label="TRAILER — SOON">
              The trailer for {game.name} will be embedded here.
            </PlaceholderBox>
          )}
        </Section>

        {/* DEVELOPMENT STAGE / UPDATES */}
        <Section id="updates" eyebrow="// 06" title="Development Updates">
          {entries.length > 0 ? (
            <div className="space-y-6">
              {entries.map((entry) => (
                <DevLogEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              <PlaceholderBox label="NO UPDATES PUBLISHED YET">
                Development updates for {game.name} will appear here once published on the dev log.
              </PlaceholderBox>
              <ButtonLink to="/dev-log" variant="ghost">
                OPEN DEV LOG
              </ButtonLink>
            </div>
          )}
        </Section>
      </div>
    </div>
  )
}
