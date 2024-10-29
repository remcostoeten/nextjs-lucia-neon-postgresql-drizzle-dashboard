'use server'

import { db, entries } from 'db'

interface CreateEntryInput {
  title: string
  description?: string
  category?: string
  style?: string[]
  url: string
  type: 'animation' | 'design_dribbble' | 'design_live_code' | 'code_snippet' | 'miscellaneous'
  boardId: string
}

export async function createEntry(input: CreateEntryInput) {
  await db.insert(entries).values(input)
}

export async function getEntriesByBoard(boardId: string) {
  return db.select().from(entries).where(eq(entries.boardId, boardId))
}
