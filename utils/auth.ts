import { currentUser } from '@clerk/nextjs/server'
import { prisma } from './db'

export const createUser = async (callbackFn: () => void) => {
  const user = await currentUser()

  // Check if user already exists
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id,
    },
  })

  if (!match) {
    // Create user
    await prisma.user.create({
      data: {
        clerkId: user?.id || '',
        email: user?.emailAddresses[0].emailAddress ?? '',
      },
    })
  }

  callbackFn()
}

export const getUser = async () => {
  const user = await currentUser()
  const match = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: user?.id,
    },
  })

  return match
}

export const getJournalEntries = async () => {
  try {
    const user = await getUser()
    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { createdAt: 'desc' },
    })
    return entries
  } catch (error) {
    console.error(error)
  }
}

export const getJournalEntry = async (journalId: string) => {
  try {
    const user = await getUser()
    const entries = await prisma.journalEntry.findUnique({
      where: {
        userId: user.id,
        id: journalId,
      },
      include: {
        Analysis: true,
      },
    })
    return entries
  } catch (error) {
    console.error(error)
  }
}
