'use server'

import type { File } from '@/core/types/db'
import { revalidateTag } from 'next/cache'
import { db } from '../..'
import { files } from '../../schema'

/**
 * Create a new file
 * @param file - File object
 * @returns Created file
 */
export async function createFileInDb(file: Omit<File, 'id' | 'createdAt'>) {
	try {
		const [data] = await db.insert(files).values(file).returning()

		return data
	} catch (e) {
		console.error((e as Error).message)
		throw new Error('Failed to create file')
	} finally {
		revalidateTag('get_files')
	}
}
