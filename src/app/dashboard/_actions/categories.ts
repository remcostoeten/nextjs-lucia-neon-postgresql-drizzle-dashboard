'use server'

import { db } from 'db'

export async function createCategory(name: string) {
  await db.insert(categories).values({ name })
}

export async function getCategories() {
  return db.select().from(categories)
}
