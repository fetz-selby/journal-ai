import { analyze } from '@/utils/ai'
import { getUser } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUser()
  const journalEntry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      // content: req.body.content,
      content: 'Hello, world!',
    },
  })

  const analysed = await analyze(journalEntry.content)
  try {
    await prisma.analysis.create({
      data: {
        journalEntryId: journalEntry.id,
        mood: analysed.mood,
        subject: analysed.subject,
        summary: analysed.summary,
        color: analysed.color,
        negative: analysed.negative,
      },
    })
  } catch (error) {
    console.error('error', error)
  }
  revalidatePath(`/journal/${journalEntry.id}`)

  //   res.status(201).json(journalEntry)
  return NextResponse.json({ data: journalEntry })
}
