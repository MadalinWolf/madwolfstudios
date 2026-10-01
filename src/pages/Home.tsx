import { ButtonLink } from '../components/Button'
import { DevLogEntryCard } from '../components/DevLogEntry'
import { GameCard } from '../components/GameCard'
import { PlaceholderBox } from '../components/Placeholder'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeader } from '../components/SectionHeader'
import { StatusBadge } from '../components/StatusBadge'
import { getLatestEntries } from '../data/devLog'
import { getFeaturedGames } from '../data/games'
import { getFeaturedProjects } from '../data/projects'
import { SITE } from '../data/site'
import { Link } from '../router'

export function Home() {
  const projects = getFeaturedProjects()
  const games = getFeaturedGames()
  const latestEntries = getLatestEntries(3)

  const consoleRows = [
    ...projects.map((p) => ({ name: p.name, path: `/projects/${p.slug}`, status: p.status })),
    ...games.map((g) => ({ name: g.name, path: `/games/${g.slug}`, status: g.status })),
  ]

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-line grid-bg" aria-labelledby="hero-title">
        <div className="mx-auto grid max-w-site gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="rise-in">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-neon-lemon">
              [ INDEPENDENT SOFTWARE &amp; GAME STUDIO ]
            </span>

            <h1
              id="hero-title"
              className="mt-5 text-4xl font-extrabold uppercase leading-none tracking-tight text-neon-lemon text-glow-lemon sm:text-6xl lg:text-7xl"
            >
              MADWOLF
              <br />
              STUDIOS
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
              {SITE.tagline}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink to="/projects">EXPLORE PROJECTS</ButtonLink>
              <ButtonLink to="/games" variant="ghost">
                VIEW GAMES
              </ButtonLink>
            </div>
          </div>

          {/* Studio status console */}
          <div className="card p-6 rise-in" style={{ animationDelay: '0.1s' }}>
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-neon-lemon">
                STUDIO STATUS
              </span>
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 bg-neon-green" />
                <span className="h-2 w-2 bg-neon-lemon" />
                <span className="h-2 w-2 bg-neon-red" />
              </span>
            </div>

            <ul className="space-y-3">
              {consoleRows.map((item) => (
                <li key={item.path} className="flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to={item.path}
                    className="text-xs font-bold uppercase tracking-[0.14em] text-text-primary hover:text-neon-green"
                  >
                    &gt; {item.name}
                  </Link>
                  <StatusBadge status={item.status} />
                </li>
              ))}
            </ul>

            <p className="mt-5 border-t border-line pt-4 text-[11px] text-text-muted">
              <span className="text-neon-green">$</span> next build in progress
              <span className="cursor-blink ml-1" />
            </p>
          </div>
        </div>
      </section>

      {/* ============ SELECTED PROJECTS ============ */}
      <section className="mx-auto max-w-site px-5 py-16 sm:py-20" aria-labelledby="selected-projects">
        <SectionHeader
          eyebrow="// SELECTED WORK"
          title="SELECTED PROJECTS"
          id="selected-projects"
          action={
            <Link
              to="/projects"
              className="text-xs font-bold uppercase tracking-[0.18em] text-neon-green hover:text-neon-lemon"
            >
              ALL PROJECTS →
            </Link>
          }
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      {/* ============ ABOUT THE STUDIO ============ */}
      <section
        className="border-y border-line bg-surface"
        aria-labelledby="about-studio"
      >
        <div className="mx-auto grid max-w-site gap-10 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader eyebrow="// THE STUDIO" title="ABOUT THE STUDIO" id="about-studio" />
            <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
              <p>
                Madwolf Studios is an independent studio run by{' '}
                <span className="text-neon-lemon">{SITE.founder.name}</span> — one developer
                building apps, games and software from idea to reality.
              </p>
              <p>
                The studio is currently focused on <strong className="text-text-primary">Stusys</strong>,
                a student productivity / Student OS application, and{' '}
                <strong className="text-text-primary">No Respawn in War</strong>, a game in early
                development.
              </p>
              <p>
                Development progress is documented in the dev log — what changed, what was learned,
                and what&apos;s next.
              </p>
            </div>
            <div className="mt-8">
              <ButtonLink to="/about" variant="ghost">
                MORE ABOUT THE STUDIO
              </ButtonLink>
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-neon-lemon">
              FOUNDER
            </span>
            <p className="mt-4 text-2xl font-extrabold uppercase tracking-wide text-text-primary">
              {SITE.founder.name}
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-neon-green">
              {SITE.founder.role} → {SITE.name}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              The person behind Madwolf Studios.
            </p>
            <a
              href="https://github.com/MadalinWolf"
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-5 inline-block text-[11px] font-bold uppercase tracking-[0.16em]"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ============ LATEST DEV LOG ============ */}
      <section className="mx-auto max-w-site px-5 py-16 sm:py-20" aria-labelledby="latest-dev-log">
        <SectionHeader
          eyebrow="// DEVELOPMENT JOURNAL"
          title="LATEST DEV LOG"
          id="latest-dev-log"
          action={
            <Link
              to="/dev-log"
              className="text-xs font-bold uppercase tracking-[0.18em] text-neon-green hover:text-neon-lemon"
            >
              ALL ENTRIES →
            </Link>
          }
        />

        {latestEntries.length > 0 ? (
          <div className="space-y-6">
            {latestEntries.map((entry) => (
              <DevLogEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <PlaceholderBox label="DEV LOG — NO ENTRIES YET">
            No development updates published yet. The first entry will appear here.
          </PlaceholderBox>
        )}
      </section>

      {/* ============ CONTACT ============ */}
      <section className="border-t border-line bg-surface" aria-labelledby="home-contact">
        <div className="mx-auto max-w-site px-5 py-16 text-center sm:py-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-neon-lemon">
            [ GET IN TOUCH ]
          </span>
          <h2
            id="home-contact"
            className="mt-4 text-2xl font-extrabold uppercase tracking-wide text-neon-lemon sm:text-4xl"
          >
            CONTACT
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
            Questions, feedback or ideas — the studio is open to hearing from you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink to="/contact">GET IN TOUCH</ButtonLink>
            <ButtonLink
              to="https://github.com/MadalinWolf"
              variant="ghost"
              external
            >
              GITHUB ↗
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
