import { DevLogEntryCard } from '../components/DevLogEntry'
import { PlaceholderBox } from '../components/Placeholder'
import { PageHeader } from '../components/SectionHeader'
import { getLatestEntries } from '../data/devLog'

export function DevLog() {
  const entries = getLatestEntries()

  return (
    <>
      <PageHeader
        eyebrow="// DEVELOPMENT JOURNAL"
        title="DEV LOG"
        description="Here's what I'm building, what changed, what I learned and what's next — meaningful development updates, not a daily diary."
      />

      <div className="mx-auto max-w-site px-5 py-14 sm:py-20">
        {entries.length > 0 ? (
          <div className="space-y-8">
            {entries.map((entry) => (
              <DevLogEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <PlaceholderBox label="DEV LOG — NO ENTRIES YET">
            No development updates published yet. The first entry — real progress on WOLFCANI or No
            Respawn in War — will appear here.
          </PlaceholderBox>
        )}
      </div>
    </>
  )
}
