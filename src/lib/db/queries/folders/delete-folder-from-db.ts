'use server'

import { eq } from 'drizzle-orm'
import { db } from '../..'
import { folders } from '../../schema'
/**
 * Delete folder by ID
 * @param folderId Folder ID
 * @returns Deleted folder
 */
export async function deleteFolderFromDb(folderId: string) {
	try {
		const [deletedFolder] = await db
			.delete(folders)
			.where(eq(folders.id, folderId))
			.returning()

		return deletedFolder
	} catch (error) {
		console.error((error as Error).message)
		throw new Error('Failed to delete folder.')
	}
}
