import Editor from '@/components/Editor'
import { getJournalEntry } from '@/utils/auth'

const JournalIdPage = async ({ params }) => {
  const { id: paramId } = await params
  const entry = await getJournalEntry(paramId)
  const analysisData = [
    { name: 'Summary', value: entry?.Analysis?.summary },
    { name: 'Subject', value: entry?.Analysis?.subject },
    { name: 'Mood', value: entry?.Analysis?.mood },
    { name: 'Negative', value: entry?.Analysis?.negative },
  ]

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="cols-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((data) => (
              <li
                className="px-2 py-4 flex item-center justify-between border-t border-b border-black/10"
                key={data.name}
              >
                <span className="text-lg font-semibold">{data.name}</span>
                <span>{data.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default JournalIdPage
