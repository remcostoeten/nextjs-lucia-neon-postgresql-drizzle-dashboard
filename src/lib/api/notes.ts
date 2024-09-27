'use server'

import { getUserAuth } from '@/lib/auth/utils'
import { db } from '@/lib/db'
import { notes } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getNotes() {
	const { session } = await getUserAuth()
	if (!session) throw new Error('Not authenticated')

	const userNotes = await db
		.select()
		.from(notes)
		.where(eq(notes.userId, session.user.id))
	return userNotes
}

export async function deleteNote(formData: FormData) {
	const { session } = await getUserAuth()
	if (!session) throw new Error('Not authenticated')

	const noteId = formData.get('id') as string

	await db.delete(notes).where(eq(notes.id, noteId))

	revalidatePath('/dashboard/notes')
}

export async function updateNote(formData: FormData) {
	const { session } = await getUserAuth()
	if (!session) throw new Error('Not authenticated')

	const noteId = formData.get('id') as string
	const title = formData.get('title') as string
	const content = formData.get('content') as string
	const folderId = formData.get('folderId') as string | null

	await db
		.update(notes)
		.set({ title, content, folderId: folderId || null })
		.where(eq(notes.id, noteId))

	revalidatePath('/dashboard/notes')
}

export async function createNote(formData: FormData) {
	const { session } = await getUserAuth()
	if (!session) throw new Error('Not authenticated')

	const title = formData.get('title') as string
	const content = formData.get('content') as string
	const folderId = formData.get('folderId') as string | null

	await db.insert(notes).values({
		title,
		content,
		userId: session.user.id,
		folderId: folderId || null
	})

	revalidatePath('/dashboard/notes')
}
