'use server'

import { db, insertFolderSchema } from '@/lib/db'
import { folders } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getFolders() {
	try {
		const result = await db.select().from(folders)
		return { folders: result }
	} catch (error) {
		console.error('Failed to fetch folders:', error)
		return { error: 'Failed to fetch folders' }
	}
}

export async function createFolder(data: FormData) {
	const result = insertFolderSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		return { error: 'Invalid folder data' }
	}

	try {
		const [newFolder] = await db
			.insert(folders)
			.values(result.data)
			.returning()
		revalidatePath('/folders')
		return { success: true, folder: newFolder }
	} catch (error) {
		console.error('Failed to create folder:', error)
		return { error: 'Failed to create folder' }
	}
}

export async function deleteFolder(id: string) {
	try {
		await db.delete(folders).where(eq(folders.id, id))
		revalidatePath('/folders')
		return { success: true }
	} catch (error) {
		console.error('Failed to delete folder:', error)
		return { error: 'Failed to delete folder' }
	}
}

export async function updateFolder(data: FormData) {
	const result = updateFolderSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		return { error: 'Invalid folder data' }
	}

	try {
		const [updatedFolder] = await db
			.update(folders)
			.set({ name: result.data.name, color: result.data.color })
			.where(eq(folders.id, result.data.id))
			.returning()

		revalidatePath('/folders')
		return { success: true, folder: updatedFolder }
	} catch (error) {
		console.error('Failed to update folder:', error)
		return { error: 'Failed to update folder' }
	}
}
