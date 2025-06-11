'use client'

import { useState } from 'react'
// import { useAutosave } from 'react-autosave'
import { updateJournalEntry } from '@/utils/api'

const Editor = ({ entry }) => {
  const [content, setContent] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)

  console.log('entry', entry)

  // useAutosave({
  //   data: content,
  //   onSave: async (_content) => {
  //     setIsLoading(true)
  //     console.log('_content', content)
  //     await updateJournalEntry(entry.id, _content)
  //     setIsLoading(false)
  //   },
  // })
  return (
    <div className="w-full h-full">
      {isLoading && <div>Loading ...</div>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-full p-8 texl-xl outline-none shadow"
      />
      <button
        onClick={async () => {
          setIsLoading(true)
          await updateJournalEntry(entry.id, content)
          setIsLoading(false)
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  )
}

export default Editor
