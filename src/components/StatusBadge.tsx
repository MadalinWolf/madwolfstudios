import {
  FEATURE_STATE_META,
  STATUS_META,
  type BadgeTone,
  type DevelopmentStatus,
  type FeatureState,
} from '../data/status'

export function ToneBadge({ tone, children }: { tone: BadgeTone; children: string }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

/** Status badge for projects & games (IN DEVELOPMENT, PLANNED, ...). */
export function StatusBadge({ status }: { status: DevelopmentStatus }) {
  const meta = STATUS_META[status]
  return <ToneBadge tone={meta.tone}>{meta.label}</ToneBadge>
}

/** Feature state badge (IMPLEMENTED / IN PROGRESS / PLANNED). */
export function FeatureStateBadge({ state }: { state: FeatureState }) {
  const meta = FEATURE_STATE_META[state]
  return <ToneBadge tone={meta.tone}>{meta.label}</ToneBadge>
}
