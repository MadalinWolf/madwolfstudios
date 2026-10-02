import { type ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/** Minimal image shape shared by the lightbox and its galleries. */
export interface GalleryImage {
  src?: string
  alt: string
  caption?: string
}

/** PREV/NEXT navigation state — provided by Zoomable when a gallery is set. */
interface LightboxNav {
  /** Zero-based index of the image currently shown. */
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
}

/*
 * Screenshot lightbox — click-to-enlarge overlay.
 *
 * Design notes:
 * - Uses only existing design tokens (.card / .btn / neon-lemon / dark greys),
 *   so it follows the site identity in both night and light themes.
 * - Rendered through a portal only after a click, so prerendered HTML is
 *   unchanged (no hydration mismatch) and the strict CSP stays happy:
 *   no inline styles, no inline scripts.
 * - When opened from a gallery (2+ images), a PREV/NEXT control pair and an
 *   index counter appear in the header: you move between screenshots without
 *   leaving the lightbox, wrapping around at both ends. Left/Right arrow keys
 *   do the same on desktop; the controls are regular buttons, so they stay
 *   usable on touch.
 * - Accessibility: role="dialog" + aria-modal, focus moves into the dialog,
 *   focus is trapped while open, Escape and the close button both work, and
 *   focus returns to the trigger when the lightbox closes.
 */
export function Lightbox({
  src,
  alt,
  caption,
  nav,
  onClose,
}: {
  src: string
  alt: string
  caption?: string
  /** Gallery navigation — omit for a single image (no PREV/NEXT shown). */
  nav?: LightboxNav
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)
  const navRef = useRef(nav)

  useEffect(() => {
    onCloseRef.current = onClose
    navRef.current = nav
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

      // Gallery navigation with Left/Right arrow keys (wraps around).
      const currentNav = navRef.current
      if (currentNav && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault()
        if (event.key === 'ArrowLeft') currentNav.onPrev()
        else currentNav.onNext()
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
          <div className="flex flex-wrap items-center gap-2">
            {nav && (
              <>
                <button
                  type="button"
                  onClick={nav.onPrev}
                  className="btn btn-ghost"
                  aria-label="Previous screenshot"
                >
                  [ ← PREV ]
                </button>
                <span
                  aria-hidden="true"
                  className="min-w-[3.25rem] text-center text-[10px] font-bold tracking-[0.2em] text-text-muted"
                >
                  {nav.index + 1} / {nav.total}
                </span>
                <button
                  type="button"
                  onClick={nav.onNext}
                  className="btn btn-ghost"
                  aria-label="Next screenshot"
                >
                  [ NEXT → ]
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              aria-label="Close enlarged screenshot"
            >
              [ CLOSE ]
            </button>
          </div>
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
 * Click-to-enlarge wrapper for a single image — or for one image of a gallery.
 * Renders the given children (the <img>) inside a keyboard-accessible button
 * and opens the Lightbox on click/Enter/Space.
 * Pass `gallery` (the full list of sibling screenshots) to get PREV/NEXT
 * navigation inside the lightbox; the wrapper starts on its own image.
 */
export function Zoomable({
  src,
  alt,
  caption,
  gallery,
  children,
}: {
  src: string
  alt: string
  caption?: string
  /** Full set of sibling screenshots — enables in-lightbox gallery navigation. */
  gallery?: GalleryImage[]
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const items = (gallery ?? []).filter((item) => item.src)
  const [index, setIndex] = useState(0)

  // Always open on this thumbnail's own image, even after a previous
  // in-lightbox navigation left the index somewhere else in the gallery.
  const openAtOwnImage = () => {
    const found = items.findIndex((item) => item.src === src)
    setIndex(found >= 0 ? found : 0)
    setOpen(true)
  }

  const safeIndex = index < items.length ? index : 0
  const current = items[safeIndex]
  const nav: LightboxNav | undefined =
    items.length > 1
      ? {
          index: safeIndex,
          total: items.length,
          onPrev: () => setIndex((i) => (i - 1 + items.length) % items.length),
          onNext: () => setIndex((i) => (i + 1) % items.length),
        }
      : undefined

  return (
    <>
      <button
        type="button"
        onClick={openAtOwnImage}
        aria-label={`View larger: ${alt}`}
        className="block w-full cursor-zoom-in text-left"
      >
        {children}
      </button>
      {open && (
        <Lightbox
          src={current?.src ?? src}
          alt={current?.alt ?? alt}
          caption={current?.caption ?? caption}
          nav={nav}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
