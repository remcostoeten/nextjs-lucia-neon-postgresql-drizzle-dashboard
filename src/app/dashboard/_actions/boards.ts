'use server'

import { boards, db } from 'db'

interface CreateBoardInput {
  title: string
  description?: string
  categoryId: string
}

export async function createBoard({ title, description, categoryId }: CreateBoardInput) {
  await db.insert(boards).values({ title, description, categoryId })
}

export async function getBoards() {
  return db.select().from(boards)
}
