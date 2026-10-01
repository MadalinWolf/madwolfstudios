import type { ReactNode } from 'react'
import type { MediaSlot } from '../data/projects'

/* Clearly marked placeholder panel for missing content. */
export function PlaceholderBox({
  label,
  children,
}: {
  label: string
  children?: ReactNode
}) {
  return (
    <div className="placeholder-box flex min-h-32 flex-col items-center justify-center gap-2 px-6 py-10 text-center">
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neon-lemon">
        [ {label} ]
      </span>
      {children && <span className="max-w-md text-xs leading-relaxed text-text-muted">{children}</span>}
    </div>
  )
}

/*
 * Screenshot / artwork frame.
 * - No `src`  → dashed placeholder frame (no fake images, ever).
 * - Has `src` → renders the real image once you drop a file in /public.
 */
export function MediaSlotFrame({ slot, aspect = 'aspect-video' }: { slot: MediaSlot; aspect?: string }) {
  return (
    <figure className="card p-3">
      {slot.src ? (
        <img
          src={slot.src}
          alt={slot.alt}
          loading="lazy"
          className={`w-full ${aspect} object-cover border border-line`}
        />
      ) : (
        <div
          className={`placeholder-box flex w-full ${aspect} flex-col items-center justify-center gap-2 p-6 text-center`}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neon-lemon">
            [ AWAITING SCREENSHOT ]
          </span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
            No image provided yet
          </span>
        </div>
      )}
      {slot.caption && (
        <figcaption className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
          <span className="inline-block h-1.5 w-1.5 bg-neon-lemon" aria-hidden="true" />
          {slot.caption}
        </figcaption>
      )}
    </figure>
  )
}
