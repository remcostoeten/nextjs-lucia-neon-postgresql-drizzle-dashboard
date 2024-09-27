'use server'

import { db } from '@/lib/db'
import { folders, insertFolderSchema } from '@/lib/db/schema'
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
		await db.insert(folders).values(result.data)
		revalidatePath('/folders')
		return { success: true }
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

export async function updateFolderColor(id: string, color: string) {
	try {
		await db.update(folders).set({ color }).where(eq(folders.id, id))
		revalidatePath('/folders')
		return { success: true }
	} catch (error) {
		console.error('Failed to update folder color:', error)
		return { error: 'Failed to update folder color' }
	}
}
