'use server'

import { generateUUID } from '@/core/helpers/generate-uuid'
import { validateRequest } from '@/lib/auth/lucia'
import { db } from '@/lib/db'
import { folders } from '@/lib/db/schema'
import { and, eq, isNull, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export type Folder = typeof folders.$inferSelect
export type NewFolder = typeof folders.$inferInsert

export async function getFolders() {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	const userFolders = await db.query.folders.findMany({
		where: eq(folders.userId, user.id)
	})

	return userFolders
}
export async function createFolder(
	name: string,
	description: string | null = null,
	parentId: string | null = null,
	color: string = '#000000',
	icon: string = 'folder'
) {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	const newFolderId = generateUUID()

	await db.insert(folders).values({
		id: newFolderId,
		name,
		description,
		userId: user.id,
		parentId,
		color,
		icon,
		createdAt: new Date(),
		updatedAt: new Date(),
		lastAccessedAt: new Date()
	})

	revalidatePath('/dashboard/folders')
	return newFolderId
}

export async function updateFolder(
	id: string,
	updates: {
		name?: string
		description?: string | null
		color?: string
		icon?: string
		isFavorite?: boolean
		isLocked?: boolean
		passcode?: string
		sortOrder?: number
		tags?: string[]
		metadata?: Record<string, unknown>
	}
) {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	await db
		.update(folders)
		.set({
			...updates,
			updatedAt: new Date()
		})
		.where(and(eq(folders.id, id), eq(folders.userId, user.id)))

	revalidatePath('/dashboard/folders')
}

export async function deleteFolder(id: string) {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	// First, recursively delete all subfolders
	await deleteSubfolders(id, user.id)

	// Then delete the folder itself
	await db
		.delete(folders)
		.where(and(eq(folders.id, id), eq(folders.userId, user.id)))

	revalidatePath('/dashboard/folders')
}

async function deleteSubfolders(parentId: string, userId: string) {
	const subfolders = await db.query.folders.findMany({
		where: and(eq(folders.parentId, parentId), eq(folders.userId, userId))
	})

	for (const subfolder of subfolders) {
		await deleteSubfolders(subfolder.id, userId)
		await db
			.delete(folders)
			.where(
				and(eq(folders.id, subfolder.id), eq(folders.userId, userId))
			)
	}
}

export async function moveFolder(folderId: string, newParentId: string | null) {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	await db
		.update(folders)
		.set({
			parentId: newParentId,
			updatedAt: new Date()
		})
		.where(and(eq(folders.id, folderId), eq(folders.userId, user.id)))

	revalidatePath('/dashboard/folders')
}

export async function getFolderContents(folderId: string | null) {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	const folderContents = await db.query.folders.findMany({
		where: and(
			eq(folders.userId, user.id),
			folderId ? eq(folders.parentId, folderId) : isNull(folders.parentId)
		),
		orderBy: [folders.sortOrder, folders.name]
	})

	return folderContents
}

export async function searchFolders(query: string) {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	const searchResults = await db.query.folders.findMany({
		where: and(
			eq(folders.userId, user.id),
			sql`${folders.name} ILIKE ${`%${query}%`}`
		),
		orderBy: [folders.name]
	})

	return searchResults
}

export async function getFavorites() {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	const favorites = await db.query.folders.findMany({
		where: and(eq(folders.userId, user.id), eq(folders.isFavorite, true)),
		orderBy: [folders.name]
	})

	return favorites
}

export async function toggleFavorite(folderId: string) {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	const folder = await db.query.folders.findFirst({
		where: and(eq(folders.id, folderId), eq(folders.userId, user.id))
	})

	if (!folder) {
		throw new Error('Folder not found')
	}

	await db
		.update(folders)
		.set({
			isFavorite: !folder.isFavorite,
			updatedAt: new Date()
		})
		.where(eq(folders.id, folderId))

	revalidatePath('/dashboard/folders')
}

export async function setFolderLock(
	folderId: string,
	isLocked: boolean,
	passcode?: string
) {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	await db
		.update(folders)
		.set({
			isLocked,
			passcode: isLocked ? passcode : null,
			updatedAt: new Date()
		})
		.where(and(eq(folders.id, folderId), eq(folders.userId, user.id)))

	revalidatePath('/dashboard/folders')
}

export async function updateLastAccessed(folderId: string) {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	await db
		.update(folders)
		.set({
			lastAccessedAt: new Date()
		})
		.where(and(eq(folders.id, folderId), eq(folders.userId, user.id)))
}

export async function updateFolderTags(folderId: string, tags: string[]) {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	await db
		.update(folders)
		.set({
			tags,
			updatedAt: new Date()
		})
		.where(and(eq(folders.id, folderId), eq(folders.userId, user.id)))

	revalidatePath('/dashboard/folders')
}

export async function updateFolderMetadata(
	folderId: string,
	metadata: Record<string, unknown>
) {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	await db
		.update(folders)
		.set({
			updatedAt: new Date()
		})
		.where(and(eq(folders.id, folderId), eq(folders.userId, user.id)))

	revalidatePath('/dashboard/folders')
}

export async function duplicateFolder(folderId: string) {
	const { user } = await validateRequest(cookies)
	if (!user) {
		throw new Error('Not authenticated')
	}

	const sourceFolder = await db.query.folders.findFirst({
		where: and(eq(folders.id, folderId), eq(folders.userId, user.id))
	})

	if (!sourceFolder) {
		throw new Error('Folder not found')
	}

	const newFolderId = generateUUID()
	await db.insert(folders).values({
		...sourceFolder,
		id: newFolderId,
		name: `${sourceFolder.name} (Copy)`,
		createdAt: new Date(),
		updatedAt: new Date(),
		lastAccessedAt: new Date()
	})

	// Recursively duplicate subfolders
	await duplicateSubfolders(folderId, newFolderId, user.id)

	revalidatePath('/dashboard/folders')
	return newFolderId
}

async function duplicateSubfolders(
	sourceFolderId: string,
	newParentId: string,
	userId: string
) {
	const subfolders = await db.query.folders.findMany({
		where: and(
			eq(folders.parentId, sourceFolderId),
			eq(folders.userId, userId)
		)
	})

	for (const subfolder of subfolders) {
		const newSubfolderId = generateUUID()
		await db.insert(folders).values({
			...subfolder,
			id: newSubfolderId,
			parentId: newParentId,
			createdAt: new Date(),
			updatedAt: new Date(),
			lastAccessedAt: new Date()
		})

		await duplicateSubfolders(subfolder.id, newSubfolderId, userId)
	}
}
