'use server'

import type { Folder } from '@/core/types/db'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { db } from '..'
import { folders, workspaces } from '../schema'

type CreateFolderInput = {
	title: string
	iconId: string
	workspaceId: string
	data?: string | null
	bannerUrl?: string | null
}

/**
 * Create a new folder
 * @param folder Folder data
 * @returns Created folder
 */
export async function createFolder(folder: CreateFolderInput) {
	try {
		const workspace = await db.query.workspaces.findFirst({
			where: eq(workspaces.id, folder.workspaceId)
		})

		if (!workspace) {
			throw new Error('Workspace not found')
		}

		const [data] = await db
			.insert(folders)
			.values({
				title: folder.title,
				iconId: folder.iconId,
				workspaceId: folder.workspaceId,
				data: folder.data ?? null,
				bannerUrl: folder.bannerUrl ?? null,
				inTrash: false
			})
			.returning()

		return data
	} catch (e) {
		console.error((e as Error).message)
		throw new Error('Failed to create folder')
	} finally {
		revalidateTag('get_folders')
	}
}

export const createFolderInDb = createFolder

/**
 * Get workspace folders
 * @param workspaceSlug Workspace slug
 * @returns Workspace folders
 */
export async function getFolders(workspaceSlug: string) {
	try {
		const workspace = await db.query.workspaces.findFirst({
			where: eq(workspaces.slug, workspaceSlug)
		})

		if (!workspace) {
			throw new Error('Workspace not found')
		}

		const data = await db
			.select()
			.from(folders)
			.where(eq(folders.workspaceId, workspace.id))
			.orderBy(folders.createdAt)

		return data
	} catch (e) {
		console.error((e as Error).message)
		throw new Error('Failed to fetch folders')
	}
}

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
