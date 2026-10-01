import { type ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/*
 * Screenshot lightbox — click-to-enlarge overlay.
 *
 * Design notes:
 * - Uses only existing design tokens (.card / .btn / neon-lemon / dark greys),
 *   so it follows the site identity in both night and light themes.
 * - Rendered through a portal only after a click, so prerendered HTML is
 *   unchanged (no hydration mismatch) and the strict CSP stays happy:
 *   no inline styles, no inline scripts.
 * - Accessibility: role="dialog" + aria-modal, focus moves into the dialog,
 *   focus is trapped while open, Escape and the close button both work, and
 *   focus returns to the trigger when the lightbox closes.
 */
export function Lightbox({
  src,
  alt,
  caption,
  onClose,
}: {
  src: string
  alt: string
  caption?: string
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement | null
    document.body.classList.add('lightbox-open')
    dialogRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      // Keep Tab inside the dialog while it is open.
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'),
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      if (event.shiftKey && (active === first || active === dialogRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('lightbox-open')
      triggerRef.current?.focus()
    }
  }, [])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-app/90 p-3 backdrop-blur-sm sm:p-6"
      onClick={(event) => {
        // Close when the backdrop — or the empty dialog area — is clicked.
        if (event.target === event.currentTarget || event.target === dialogRef.current) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        tabIndex={-1}
        className="w-full max-w-7xl outline-none"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-lemon">
            [ {caption || alt} ]
          </span>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost"
            aria-label="Close enlarged screenshot"
          >
            [ CLOSE ]
          </button>
        </div>

        <img
          src={src}
          alt={alt}
          className="mx-auto block max-h-[75vh] w-auto max-w-full border border-line sm:max-h-[85vh]"
        />
      </div>
    </div>,
    document.body,
  )
}

/*
 * Click-to-enlarge wrapper for a single image.
 * Renders the given children (the <img>) inside a keyboard-accessible button
 * and opens the Lightbox on click/Enter/Space.
 */
export function Zoomable({
  src,
  alt,
  caption,
  children,
}: {
  src: string
  alt: string
  caption?: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${alt}`}
        className="block w-full cursor-zoom-in text-left"
      >
        {children}
      </button>
      {open && <Lightbox src={src} alt={alt} caption={caption} onClose={() => setOpen(false)} />}
    </>
  )
}
