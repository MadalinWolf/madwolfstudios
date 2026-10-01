import { useEffect, type ReactElement } from 'react'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { getGame } from './data/games'
import { getProject } from './data/projects'
import { SITE } from './data/site'
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

interface ResolvedRoute {
  element: ReactElement
  title: string
}

/* Route table — add a page by adding a branch here + a nav item in data/site.ts. */
function resolve(path: string): ResolvedRoute {
  const titled = (title: string, element: ReactElement): ResolvedRoute => ({
    element,
    title: `${title} — ${SITE.name}`,
  })

  switch (true) {
    case path === '/':
      return {
        element: <Home />,
        title: `${SITE.name} — Independent Software & Game Studio`,
      }
    case path === '/projects':
      return titled('Projects', <Projects />)
    case path.startsWith('/projects/'): {
      const project = getProject(path.slice('/projects/'.length))
      return project
        ? titled(project.name, <ProjectDetail project={project} />)
        : titled('404 Page Not Found', <NotFound />)
    }
    case path === '/games':
      return titled('Games', <Games />)
    case path.startsWith('/games/'): {
      const game = getGame(path.slice('/games/'.length))
      return game
        ? titled(game.name, <GameDetail game={game} />)
        : titled('404 Page Not Found', <NotFound />)
    }
    case path === '/about':
      return titled('About', <About />)
    case path === '/dev-log':
      return titled('Dev Log', <DevLog />)
    case path === '/contact':
      return titled('Contact', <Contact />)
    default:
      return titled('404 Page Not Found', <NotFound />)
  }
}

function Layout() {
  const { path } = useRoute()
  const { element, title } = resolve(path)

  useEffect(() => {
    document.title = title
  }, [title])

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

export default function App() {
  return (
    <RouterProvider>
      <Layout />
    </RouterProvider>
  )
}
