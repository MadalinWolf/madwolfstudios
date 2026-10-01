import { useEffect, useState } from 'react'

export type Theme = 'night' | 'light'

const THEME_KEY = 'madwolf-theme'

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'night' || stored === 'light') return stored
  } catch {
    // localStorage unavailable — fall back to night mode
  }
  return 'night'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // ignore storage errors (private browsing etc.)
    }
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'night' ? 'light' : 'night'))

  return { theme, toggleTheme }
}
