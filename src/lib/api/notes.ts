'use server'

import { getUserAuth } from '@/lib/auth/utils'
import { db } from '@/lib/db'
import { notes } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getNotes(currentPage: number) {
	const { session } = await getUserAuth()
	if (!session) throw new Error('Not authenticated')

	try {
		const userNotes = await db
			.select()
			.from(notes)
			.where(eq(notes.userId, session.user.id))
		return userNotes
	} catch (error) {
		console.error('Failed to fetch notes:', error)
		return []
	}
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

	try {
		const [newNote] = await db
			.insert(notes)
			.values({
				title,
				content,
				userId: session.user.id,
				folderId: folderId ? folderId : null
			})
			.returning()

		revalidatePath('/dashboard/notes')
		return newNote
	} catch (error: any) {
		console.error('Failed to create note:', error)
		if (error.code === '22P02') {
			throw new Error('Invalid folder ID')
		}
		throw new Error('Failed to create note')
	}
}
