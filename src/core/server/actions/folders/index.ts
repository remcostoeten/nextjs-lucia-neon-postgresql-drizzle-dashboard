'use server'

import { validateRequest } from '@/core/server/auth/lucia'
import { folders } from '@/core/server/db/schema'
import { db } from 'db'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getFolders() {
	const { user } = await validateRequest()
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
	description: string | null = null
) {
	const { user } = await validateRequest()
	if (!user) {
		throw new Error('Not authenticated')
	}

	await db.insert(folders).values({
		name,
		description,
		userId: user.id,
		color: '#FFF',
		createdAt: new Date(),
		updatedAt: new Date()
	})

	revalidatePath('/dashboard/folders')
}

export async function updateFolder(
	id: string,
	name: string,
	description: string | null = null
) {
	const { user } = await validateRequest()
	if (!user) {
		throw new Error('Not authenticated')
	}

	await db
		.update(folders)
		.set({ name, description, updatedAt: new Date() })
		.where(eq(folders.id, id))

	revalidatePath('/dashboard/folders')
}

export async function deleteFolder(id: string) {
	const { user } = await validateRequest()
	if (!user) {
		throw new Error('Not authenticated')
	}

	await db.delete(folders).where(eq(folders.id, id))

	revalidatePath('/dashboard/folders')
}

export async function moveFolder(id: string, newPosition: number) {
	const { user } = await validateRequest()
	if (!user) {
		throw new Error('Not authenticated')
	}

	// Fetch all folders for the user
	const userFolders = await db.query.folders.findMany({
		where: eq(folders.userId, user.id),
		orderBy: folders.createdAt
	})

	// Find the folder to move
	const folderToMove = userFolders.find(folder => folder.id === id)
	if (!folderToMove) {
		throw new Error('Folder not found')
	}

	// Remove the folder from its current position
	const updatedFolders = userFolders.filter(folder => folder.id !== id)

	// Insert the folder at the new position
	updatedFolders.splice(newPosition, 0, folderToMove)

	// Update the order of all folders
	for (let i = 0; i < updatedFolders.length; i++) {
		await db
			.update(folders)
			.set({ updatedAt: new Date() })
			.where(eq(folders.id, updatedFolders[i].id))
	}

	revalidatePath('/dashboard/folders')
}

export async function changeFolderColor(id: string, color: string) {
	const { user } = await validateRequest()
	if (!user) {
		throw new Error('Not authenticated')
	}

	await db
		.update(folders)
		.set({ color, updatedAt: new Date() })
		.where(eq(folders.id, id))

	revalidatePath('/dashboard/folders')
}
