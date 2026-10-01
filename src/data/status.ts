/* =========================================================
   STATUS VOCABULARY
   Shared by projects, games, features and badges.
   LEMON = information · GREEN = active/positive · RED = warning
   ========================================================= */

export type DevelopmentStatus = 'in-development' | 'planned' | 'released' | 'on-hold'
export type FeatureState = 'implemented' | 'in-progress' | 'planned'
export type BadgeTone = 'green' | 'lemon' | 'red' | 'neutral'

export const STATUS_META: Record<DevelopmentStatus, { label: string; tone: BadgeTone }> = {
  'in-development': { label: 'IN DEVELOPMENT', tone: 'green' },
  planned: { label: 'PLANNED', tone: 'lemon' },
  released: { label: 'RELEASED', tone: 'green' },
  'on-hold': { label: 'ON HOLD', tone: 'red' },
}

export const FEATURE_STATE_META: Record<FeatureState, { label: string; tone: BadgeTone }> = {
  implemented: { label: 'IMPLEMENTED', tone: 'green' },
  'in-progress': { label: 'IN PROGRESS', tone: 'lemon' },
  planned: { label: 'PLANNED', tone: 'neutral' },
}
