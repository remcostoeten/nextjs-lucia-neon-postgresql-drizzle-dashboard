'use server'

import type { File } from '@/core/types/db'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { db } from '..'
import { files, workspaces } from '../schema'

/**
 * Create a new file
 * @param file - File object
 * @returns Created file
 */
export async function createFile(file: Omit<File, 'id' | 'createdAt'>) {
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

/**
 * Get all files in a workspace
 * @param workspaceSlug - Slug of the workspace
 * @returns List of files in the workspace
 */
export async function getFiles(workspaceSlug: string) {
	try {
		// First get the workspace by slug
		const workspace = await db.query.workspaces.findFirst({
			where: eq(workspaces.slug, workspaceSlug)
		})

		if (!workspace) {
			throw new Error('Workspace not found')
		}

		// Then get files using the workspace ID
		const data = await db
			.select()
			.from(files)
			.where(eq(files.workspaceId, workspace.id))
			.orderBy(files.createdAt)

		return data
	} catch (e) {
		console.error((e as Error).message)
		throw new Error('Failed to fetch files.')
	}
}

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
