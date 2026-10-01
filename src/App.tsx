import { useEffect, type ReactElement } from 'react'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { getGame } from './data/games'
import { getProject } from './data/projects'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { DevLog } from './pages/DevLog'
import { GameDetail } from './pages/GameDetail'
import { Games } from './pages/Games'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProjectDetail } from './pages/ProjectDetail'
import { Projects } from './pages/Projects'
import { RouterProvider, useRoute } from './router'
import { applyDocumentMeta, getRouteMeta } from './seo'

/* Route table — add a page by adding a branch here + a nav item in data/site.ts.
   Titles/descriptions/canonical/OG tags come from src/seo.ts (single source). */
function resolve(path: string): ReactElement {
  switch (true) {
    case path === '/':
      return <Home />
    case path === '/projects':
      return <Projects />
    case path.startsWith('/projects/'): {
      const project = getProject(path.slice('/projects/'.length))
      return project ? <ProjectDetail project={project} /> : <NotFound />
    }
    case path === '/games':
      return <Games />
    case path.startsWith('/games/'): {
      const game = getGame(path.slice('/games/'.length))
      return game ? <GameDetail game={game} /> : <NotFound />
    }
    case path === '/about':
      return <About />
    case path === '/dev-log':
      return <DevLog />
    case path === '/contact':
      return <Contact />
    default:
      return <NotFound />
  }
}

function Layout() {
  const { path } = useRoute()
  const element = resolve(path)
  const meta = getRouteMeta(path)

  // Keep title/description/canonical/OG tags in sync after client-side
  // navigation. Crawlers read the static prerendered tags from seo.ts.
  useEffect(() => {
    applyDocumentMeta(meta)
  }, [meta])

  return (
    <div className="flex min-h-screen flex-col bg-app">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        {element}
      </main>
      <Footer />
    </div>
  )
}

export default function App({ initialPath }: { initialPath?: string } = {}) {
  return (
    <RouterProvider initialPath={initialPath}>
      <Layout />
    </RouterProvider>
  )
}
