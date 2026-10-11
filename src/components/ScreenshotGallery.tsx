import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Zoomable } from './Lightbox'
import { assetUrl } from '../asset'
import type { GalleryGroup } from '../data/projects'

/*
 * Screenshot gallery — one horizontal carousel per build/version group.
 *
 * Design notes:
 * - Native horizontal scrolling with scroll-snap instead of a scripted
 *   slider: touch/trackpad swipe works for free, the browser scrollbar
 *   stays reachable, and nothing can trap the visitor (no autoplay, no
 *   focus trap, every slide is regular page content).
 * - Prev/Next are regular buttons (existing .btn styles) plus ← → and
 *   Home/End keys when the track has focus; a polite live region announces
 *   "n / total". Disabled at the ends so position is always predictable.
 * - Motion: scrolling is smooth only when the visitor allows it —
 *   prefers-reduced-motion switches to instant scrolling (also covered
 *   globally in index.css).
 * - Strict CSP compliance: no inline styles, no inline scripts; the
 *   lightbox (Zoomable) handles click-to-enlarge with in-gallery navigation.
 * - Loading: explicit width/height (stable dimensions, no layout shift) and
 *   lazy decoding/loading beyond the first two slides.
 * - Prerender-safe: no window/document access during render; only inside
 *   effects and event handlers.
 */
export function ScreenshotGallery({ group }: { group: GalleryGroup }) {
  const trackRef = useRef<HTMLUListElement | null>(null)
  const trackId = useId()
  const [index, setIndex] = useState(0)
  const total = group.slides.length

  // Keep the counter in sync with whatever the visitor scrolled to
  // (touch swipe, trackpad, scrollbar drag, keyboard on the track).
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const trackLeft = track.getBoundingClientRect().left
        let best = 0
        let bestDist = Number.POSITIVE_INFINITY
        track.childNodes.forEach((child, i) => {
          const el = child as HTMLElement
          const dist = Math.abs(el.getBoundingClientRect().left - trackLeft)
          if (dist < bestDist) {
            bestDist = dist
            best = i
          }
        })
        setIndex(best)
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [total])

  const goTo = (next: number) => {
    const track = trackRef.current
    const target = Math.max(0, Math.min(total - 1, next))
    if (!track) return
    const child = track.childNodes[target] as HTMLElement | undefined
    if (!child) return
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const left =
      track.scrollLeft +
      child.getBoundingClientRect().left -
      track.getBoundingClientRect().left
    track.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' })
    setIndex(target)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(index - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      goTo(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      goTo(total - 1)
    }
  }

  const lightboxGallery = group.slides.map((slide) => ({
    src: slide.src,
    alt: slide.alt,
    caption: `${slide.title} — ${group.versionLabel}`,
  }))

  return (
    <div
      className="card p-4 sm:p-6"
      role="region"
      aria-roledescription="carousel"
      aria-label={`Screenshot gallery — ${group.versionLabel}`}
    >
      {/* Group heading + controls */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="min-w-0">
          <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-neon-lemon">
            {group.versionLabel}
          </h3>
          {group.note && (
            <p className="mt-1 max-w-3xl text-xs leading-relaxed text-text-muted">
              {group.note}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:flex-nowrap">
          <button
            type="button"
            className="btn btn-ghost disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous screenshot"
            aria-controls={trackId}
          >
            [ ← PREV ]
          </button>
          <span
            aria-live="polite"
            aria-atomic="true"
            className="min-w-[4.5rem] text-center text-[10px] font-bold tracking-[0.2em] text-text-muted"
          >
            <span className="sr-only">
              Screenshot {index + 1} of {total}, {group.versionLabel}
            </span>
            <span aria-hidden="true">
              {index + 1} / {total}
            </span>
          </span>
          <button
            type="button"
            className="btn btn-ghost disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => goTo(index + 1)}
            disabled={index === total - 1}
            aria-label="Next screenshot"
            aria-controls={trackId}
          >
            [ NEXT → ]
          </button>
        </div>
      </div>

      {/* Slides — native scroll region, focusable for arrow-key browsing */}
      <ul
        id={trackId}
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={`${group.versionLabel} screenshots — use the left and right arrow keys to browse`}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {group.slides.map((slide, i) => (
          <li
            key={slide.src}
            className="w-[86%] shrink-0 snap-start sm:w-[62%] lg:w-[47%]"
          >
            <figure className="flex h-full flex-col">
              <Zoomable
                src={slide.src}
                alt={slide.alt}
                gallery={lightboxGallery}
              >
                <img
                  src={assetUrl(slide.src)}
                  alt={slide.alt}
                  width={1440}
                  height={900}
                  loading={i <= 1 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-auto w-full border border-line"
                />
              </Zoomable>
              <figcaption className="mt-3 flex flex-1 flex-col gap-1.5">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <span className="text-sm font-bold text-text-primary">
                    {slide.title}
                  </span>
                  <span className="border border-neon-lemon/50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-neon-lemon">
                    {group.versionLabel}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-text-muted">
                  {slide.text}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-text-faint">
        Scroll, swipe or use ← → keys · click any screenshot to enlarge
      </p>
    </div>
  )
}
