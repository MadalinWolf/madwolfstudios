import type { ReactNode } from 'react'
import type { MediaSlot } from '../data/projects'
import { assetUrl } from '../asset'
import { Zoomable } from './Lightbox'

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
 * - Pass `gallery` (the full list of sibling slots) so the lightbox gets
 *   PREV/NEXT navigation between the screenshots without closing.
 */
export function MediaSlotFrame({
  slot,
  aspect = 'aspect-video',
  gallery,
}: {
  slot: MediaSlot
  aspect?: string
  gallery?: MediaSlot[]
}) {
  return (
    <figure className="card p-3">
      {slot.src ? (
        <Zoomable src={slot.src} alt={slot.alt} caption={slot.caption} gallery={gallery}>
          <img
            src={assetUrl(slot.src)}
            alt={slot.alt}
            loading="lazy"
            className={`w-full ${aspect} object-contain border border-line`}
          />
        </Zoomable>
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
