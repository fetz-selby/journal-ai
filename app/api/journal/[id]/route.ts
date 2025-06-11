import { analyze } from '@/utils/ai'
import { getUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const PATCH = async (req: Request, { params }) => {
  const { id: paramId } = await params
  const { content } = await req.json()

  const user = await getUser()
  const journalEntry = await prisma.journalEntry.update({
    where: {
      id: paramId,
      userId: user.id,
    },
    data: {
      content,
    },
  })

  const analysed = await analyze(journalEntry.content)

  await prisma.analysis.upsert({
    where: {
      journalEntryId: journalEntry.id,
    },
    create: {
      journalEntryId: journalEntry.id,
      ...analysed,
    },
    update: analysed,
  })

  revalidatePath(`/journal/${journalEntry.id}`)

  //   res.status(201).json(journalEntry)
  return NextResponse.json({ data: journalEntry })
}
