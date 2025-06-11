'use client'

import { createJournalEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

const NewEntryCard = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const newJournalEntry = await createJournalEntry('')
    router.push(`/journal/${newJournalEntry.id}`)
  }

  return (
    <div
      onClick={handleOnClick}
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
    >
      <div className="px-4 py-5 sm:p6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  )
}

export default NewEntryCard
