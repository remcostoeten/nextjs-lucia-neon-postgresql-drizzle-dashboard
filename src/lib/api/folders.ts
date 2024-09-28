'use server'

import { db } from '@/lib/db'
import { folders } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { getUserAuth } from '../auth/utils'

export async function getFolders() {
	const { session } = await getUserAuth()
	if (!session) throw new Error('Not authenticated')

	try {
		const result = await db
			.select()
			.from(folders)
			.where(eq(folders.userId, session.user.id))
		return { folders: result }
	} catch (error) {
		console.error('Failed to fetch folders:', error)
		return { error: 'Failed to fetch folders' }
	}
}

export async function createFolder(data: FormData) {
	const { session } = await getUserAuth()
	if (!session) throw new Error('Not authenticated')

	const name = data.get('name') as string
	const description = data.get('description') as string
	const color = data.get('color') as string

	if (!name) {
		return { error: 'Folder name is required' }
	}

	try {
		const newFolder = await db
			.insert(folders)
			.values({
				name,
				description,
				color,
				userId: session.user.id
			})
			.returning()
		revalidatePath('/folders')
		return { success: true, folder: newFolder[0] }
	} catch (error) {
		console.error('Failed to create folder:', error)
		if (error instanceof Error) {
			return { error: error.message }
		}
		return { error: 'Failed to create folder' }
	}
}

export async function updateFolder(formData: FormData) {
	const { session } = await getUserAuth()
	if (!session) throw new Error('Not authenticated')

	const id = formData.get('id') as string
	const name = formData.get('name') as string
	const color = formData.get('color') as string

	try {
		await db
			.update(folders)
			.set({ name, color })
			.where(eq(folders.id, id))
			.where(eq(folders.userId, session.user.id))
		revalidatePath('/dashboard/notes')
		return { success: true }
	} catch (error) {
		console.error('Failed to update folder:', error)
		return { error: 'Failed to update folder' }
	}
}

export async function deleteFolder(formData: FormData) {
	const { session } = await getUserAuth()
	if (!session) throw new Error('Not authenticated')

	const id = formData.get('id') as string

	try {
		await db
			.delete(folders)
			.where(eq(folders.id, id))
			.where(eq(folders.userId, session.user.id))
		revalidatePath('/dashboard/notes')
		return { success: true }
	} catch (error) {
		console.error('Failed to delete folder:', error)
		return { error: 'Failed to delete folder' }
	}
}
