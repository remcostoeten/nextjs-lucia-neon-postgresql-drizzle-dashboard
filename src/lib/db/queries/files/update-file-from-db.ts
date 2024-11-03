'use server'

import type { File } from '@/core/types/db'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { db } from '../..'
import { files, workspaces } from '../../schema'

/**
 * Update a file
 * @param file - File object
 * @returns Updated file
 */
export async function updateFileInDb(file: Partial<File> & { id: string }) {
	try {
		const [updatedFile] = await db
			.update(files)
			.set(file)
			.where(eq(files.id, file.id))
			.returning()

		return updatedFile
	} catch (e) {
		console.error((e as Error).message)
		throw new Error('Failed to update file')
	} finally {
		revalidateTag('get_files')
	}
}
