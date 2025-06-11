import EntryCard, { EntryCardProps } from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { getJournalEntries } from '@/utils/auth'
import Link from 'next/link'

const JournalPage = async () => {
  const journalEntries = await getJournalEntries()
  console.log('journals => ', journalEntries)

  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {(journalEntries ?? []).map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard
              key={entry.id}
              entry={entry as unknown as EntryCardProps}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
