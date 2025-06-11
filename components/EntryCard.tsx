export type EntryCardProps = {
  id: string
  createdAt: Date
  updatedAt: Date
  content: string
}

const EntryCard = ({ entry }: { entry: EntryCardProps }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5">{entry.content}</div>
      <div className="px-4 py-5">mood</div>
    </div>
  )
}

export default EntryCard
