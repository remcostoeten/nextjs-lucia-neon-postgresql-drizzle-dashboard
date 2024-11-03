'use server'
import { Folder } from '@/core/types/db'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { db } from '../..'
import { folders } from '../../schema'

/**
 * Update folder
 * @param folder Folder
 * @returns Updated folder
 */
export async function updateFolderInDb(
	folder: Partial<Folder> & { id: string }
) {
	try {
		const [updatedFolder] = await db
			.update(folders)
			.set(folder)
			.where(eq(folders.id, folder.id))
			.returning()

		return updatedFolder
	} catch (e) {
		console.error((e as Error).message)
		throw new Error('Failed to update folder')
	} finally {
		revalidateTag('get_folders')
	}
}
