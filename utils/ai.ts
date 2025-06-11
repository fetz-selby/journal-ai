import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'

const getZodParser = () => {
  const journal = z.object({
    mood: z.string().describe('The mood for the journal.'),
    subject: z.string().describe('The subject of the journal entry.'),
    summary: z.string().describe('The summary of the journal entry.'),
    color: z.string().describe('Hex color for representation.'),
    negative: z.boolean().describe('how positive was the journal.'),
  })
  return journal
}

export const analyze = async (prompt: string) => {
  const model = new ChatOpenAI({
    temperature: 0,
    model: 'gpt-3.5-turbo',
    // apiKey: process.env.OPENAI_API_KEY,
  })

  const structuredLlms = model.withStructuredOutput(getZodParser())
  const result = await structuredLlms.invoke(prompt)
  return result
}
