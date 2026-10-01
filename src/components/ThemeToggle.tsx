import { useTheme } from '../hooks/useTheme'

/** Night / light mode switch. */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'night' ? 'light' : 'night'
  const visible = theme === 'night' ? '[ LIGHT ]' : '[ NIGHT ]'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`${visible} — switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={`btn btn-ghost ${compact ? 'px-2.5 py-1.5 text-[10px]' : 'px-3 py-1.5 text-[10px]'}`}
      /* The label depends on the saved theme, which the server can't know. */
      suppressHydrationWarning
    >
      {visible}
    </button>
  )
}
