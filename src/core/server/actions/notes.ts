'use server'

import { getUserAuth } from '@/core/server/auth/utils'
import { notes } from '@/core/server/db/schema/notes'

import { db } from 'db'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

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

export async function createNote(noteData: NoteData) {
	const { session } = await getUserAuth()
	if (!session) return { error: 'Unauthorized' }

	try {
		await db.insert(notes).values({
			...noteData,
			userId: session.user.id
		})
		revalidatePath('/dashboard/notes')
		return { success: true }
	} catch (error) {
		return { error: 'Failed to create note' }
	}
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
					eq(notes.folderId, folderId)
				)
			)
		return { notes: userNotes }
	} catch (error) {
		return { error: 'Failed to fetch notes' }
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
