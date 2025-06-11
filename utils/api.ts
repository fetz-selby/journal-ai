export const createURL = (path: string) => {
  return `${window.location.origin}${path}`
}

export const updateJournalEntry = async (id: string, content: string) => {
  const response = await fetch(new Request(createURL(`/api/journal/${id}`)), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    throw new Error('Failed to update journal entry')
  }

  const { data } = await response.json()
  return data
}

export const createJournalEntry = async (content: string) => {
  const response = await fetch(new Request(createURL('/api/journal')), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    throw new Error('Failed to create journal entry')
  }

  const { data } = await response.json()
  return data
}
