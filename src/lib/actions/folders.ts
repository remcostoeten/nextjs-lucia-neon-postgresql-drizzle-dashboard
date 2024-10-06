'use server'

import { generateUUID } from '@/core/helpers/generate-uuid'
import { logActivity } from '@/core/server/actions/users/log-activity'
import { validateRequest } from '@/lib/auth/lucia'
import { db } from '@/lib/db'
import { folders } from '@/lib/db/schema'
import { FolderType } from '@/types/types.folder'
import { and, eq, like, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
export async function createFolder(
	name: string,
	description: string | null = null,
	parentId: string | null = null,
	color: string = '#000000'
): Promise<{ success: boolean, folder: any }> {
	const { user } = await validateRequest()
	if (!user) {
		throw new Error('Not authenticated')
	}

	const newFolderId = generateUUID()

	let path = `/${name}`
	if (parentId) {
		const parentFolder = await db.query.folders.findFirst({
			where: eq(folders.id, parentId)
		})
		if (parentFolder) {
			path = `${parentFolder.path}/${name}`
		}
	}

	const newFolder = {
		id: newFolderId,
		name,
		description,
		userId: user.id,
		parentId,
		color,
		path,
		createdAt: new Date(),
		updatedAt: new Date()
	}

	await db.insert(folders).values(newFolder)

	try {
		await logActivity(user.id, 'CREATE_FOLDER', `Created folder: ${name}`, {
			folderId: newFolderId,
			folderName: name
		})
	} catch (error) {
		console.error('Failed to log folder creation activity:', error)
	}

	revalidatePath('/dashboard/folders')
	return { success: true, folder: newFolder }
}

export async function updateFolder(
	id: string,
	updates: {
		name?: string
		description?: string | null
		color?: string
	}
): Promise<void> {
	const { user } = await validateRequest()
	if (!user) {
		throw new Error('Not authenticated')
	}

	const currentFolder = await db.query.folders.findFirst({
		where: and(eq(folders.id, id), eq(folders.userId, user.id))
	})

	if (!currentFolder) {
		throw new Error('Folder not found')
	}

	const newPath = updates.name
		? currentFolder.path.replace(
			new RegExp(`${currentFolder.name}$`),
			updates.name
		)
		: currentFolder.path

	await db
		.update(folders)
		.set({
			...updates,
			path: newPath,
			updatedAt: new Date()
		})
		.where(and(eq(folders.id, id), eq(folders.userId, user.id)))

	// Update paths of all descendant folders
	if (updates.name) {
		const descendantFolders = await db.query.folders.findMany({
			where: like(folders.path, `${currentFolder.path}/%`)
		})

		for (const descendant of descendantFolders) {
			const newDescendantPath = descendant.path.replace(
				currentFolder.path,
				newPath
			)
			await db
				.update(folders)
				.set({ path: newDescendantPath })
				.where(eq(folders.id, descendant.id))
		}
	}

	try {
		await logActivity(
			user.id,
			'UPDATE_FOLDER',
			`Updated folder: ${updates.name || id}`,
			{ folderId: id, updates }
		)
	} catch (error) {
		console.error('Failed to log folder update activity:', error)
	}

	revalidatePath('/dashboard/folders')
}

export async function deleteFolder(id: string): Promise<void> {
	const { user } = await validateRequest()
	if (!user) {
		throw new Error('Not authenticated')
	}

	const folderToDelete = await db.query.folders.findFirst({
		where: and(eq(folders.id, id), eq(folders.userId, user.id))
	})

	if (folderToDelete) {
		// Delete all descendant folders
		await db
			.delete(folders)
			.where(like(folders.path, `${folderToDelete.path}/%`))

		// Delete the folder itself
		await db
			.delete(folders)
			.where(and(eq(folders.id, id), eq(folders.userId, user.id)))

		try {
			await logActivity(
				user.id,
				'DELETE_FOLDER',
				`Deleted folder: ${folderToDelete.name}`,
				{ folderId: id, folderName: folderToDelete.name }
			)
		} catch (error) {
			console.error('Failed to log folder deletion activity:', error)
		}
	}

	revalidatePath('/dashboard/folders')
}

export async function getFolders(): Promise<{ folders: FolderType[] }> {
	const { user } = await validateRequest()
	if (!user) {
		throw new Error('Not authenticated')
	}

	const userFolders = await db
		.select()
		.from(folders)
		.where(eq(folders.userId, user.id))
		.orderBy(folders.path)

	return { folders: userFolders }
}

export async function moveFolder(id: string, newParentId: string | null): Promise<void> {
	const { user } = await validateRequest()
	if (!user) {
		throw new Error('Not authenticated')
	}

	const folderToMove = await db.query.folders.findFirst({
		where: and(eq(folders.id, id), eq(folders.userId, user.id))
	})

	if (!folderToMove) {
		throw new Error('Folder not found')
	}

	let newPath: string
	if (newParentId) {
		const newParentFolder = await db.query.folders.findFirst({
			where: and(eq(folders.id, newParentId), eq(folders.userId, user.id))
		})
		if (!newParentFolder) {
			throw new Error('New parent folder not found')
		}
		newPath = `${newParentFolder.path}/${folderToMove.name}`
	} else {
		newPath = `/${folderToMove.name}`
	}

	// Update the moved folder
	await db
		.update(folders)
		.set({ parentId: newParentId, path: newPath, updatedAt: new Date() })
		.where(and(eq(folders.id, id), eq(folders.userId, user.id)))

	// Update paths of all descendant folders
	const descendantFolders = await db.query.folders.findMany({
		where: like(folders.path, `${folderToMove.path}/%`)
	})

	for (const descendant of descendantFolders) {
		const newDescendantPath = descendant.path.replace(
			folderToMove.path,
			newPath
		)
		await db
			.update(folders)
			.set({ path: newDescendantPath })
			.where(eq(folders.id, descendant.id))
	}

	try {
		await logActivity(
			user.id,
			'MOVE_FOLDER',
			`Moved folder: ${folderToMove.name}`,
			{ folderId: id, newParentId }
		)
	} catch (error) {
		console.error('Failed to log folder move activity:', error)
	}

	revalidatePath('/dashboard/folders')
}

export async function getFolderCount(): Promise<number> {
	const { user } = await validateRequest()
	if (!user) {
		throw new Error('Not authenticated')
	}

	const result = await db
		.select({ count: sql<number>`count(*)` })
		.from(folders)
		.where(eq(folders.userId, user.id))

	return result[0].count
}
