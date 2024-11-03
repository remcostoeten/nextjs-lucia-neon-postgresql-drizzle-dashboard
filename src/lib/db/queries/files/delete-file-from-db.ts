'use server'
import { eq } from 'drizzle-orm'
import { db } from '../..'
import { files } from '../../schema'

/**
 * Delete file by ID
 * @param fileId File ID
 * @returns Deleted file
 */
export async function deleteFileFromDb(fileId: string) {
	try {
		const [deletedFile] = await db
			.delete(files)
			.where(eq(files.id, fileId))
			.returning()

		return deletedFile
	} catch (e) {
		console.error((e as Error).message)
		throw new Error('Failed to delete file')
	}
}
