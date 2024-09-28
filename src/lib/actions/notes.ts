'use server'

import { db } from '@/lib/db/index'
import { notes } from '@/lib/db/schema/notes'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { getUserAuth } from '../auth/utils'

interface NoteData {
	title: string
	content: string
	folderId: string
	labels: string[]
	isFavorite: boolean
	isPinned: boolean
	pinCode?: string
	isShared: boolean
}

export async function createNote(formData: FormData) {
	const { session } = await getUserAuth()
	if (!session) throw new Error('Not authenticated')

	const title = formData.get('title') as string
	const content = formData.get('content') as string
	const folderId = formData.get('folderId') as string | null

	const [newNote] = await db
		.insert(notes)
		.values({
			title,
			content,
			userId: session.user.id,
			folderId: folderId || null
		})
		.returning()

	revalidatePath('/dashboard/notes')
	return newNote
}

export async function getNotes(folderId: string) {
	const { session } = await getUserAuth()
	if (!session) return { error: 'Unauthorized' }

	try {
		const userNotes = await db
			.select()
			.from(notes)
			.where(
				and(
					eq(notes.userId, session.user.id),
					folderId ? eq(notes.folderId, folderId) : undefined
				)
			)
			.execute()
		console.log('Fetched notes:', userNotes)
		return { notes: userNotes }
	} catch (error) {
		console.error('Failed to fetch notes:', error)
		return { error: 'Failed to fetch notes: ' + (error as Error).message }
	}
}

export async function updateNote(noteId: string, noteData: Partial<NoteData>) {
	const { session } = await getUserAuth()
	if (!session) return { error: 'Unauthorized' }

	try {
		await db
			.update(notes)
			.set(noteData)
			.where(and(eq(notes.id, noteId), eq(notes.userId, session.user.id)))
		revalidatePath('/dashboard/notes')
		return { success: true }
	} catch (error) {
		return { error: 'Failed to update note' }
	}
}

export async function deleteNote(noteId: string) {
	const { session } = await getUserAuth()
	if (!session) return { error: 'Unauthorized' }

	try {
		await db
			.delete(notes)
			.where(and(eq(notes.id, noteId), eq(notes.userId, session.user.id)))
		revalidatePath('/dashboard/notes')
		return { success: true }
	} catch (error) {
		return { error: 'Failed to delete note' }
	}
}
