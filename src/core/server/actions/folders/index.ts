'use server'

import { validateRequest } from '@/lib/auth/lucia'
import { db } from '@/lib/db'
import { folders } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function getFolders() {
	const cookieStore = cookies()
	const { user } = await validateRequest(cookieStore)
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
	const cookieStore = cookies()
	const { user } = await validateRequest(cookieStore)
	if (!user) {
		throw new Error('Not authenticated')
	}

	await db.insert(folders).values({
		name,
		description,
		userId: user.id,
		color: '#000000', // Default color, adjust as needed
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
	const cookieStore = cookies()
	const { user } = await validateRequest(cookieStore)
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
	const cookieStore = cookies()
	const { user } = await validateRequest(cookieStore)
	if (!user) {
		throw new Error('Not authenticated')
	}

	await db.delete(folders).where(eq(folders.id, id))

	revalidatePath('/dashboard/folders')
}

export async function moveFolder(id: string, newPosition: number) {
	const cookieStore = cookies()
	const { user } = await validateRequest(cookieStore)
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
	const cookieStore = cookies()
	const { user } = await validateRequest(cookieStore)
	if (!user) {
		throw new Error('Not authenticated')
	}

	await db
		.update(folders)
		.set({ color, updatedAt: new Date() })
		.where(eq(folders.id, id))

	revalidatePath('/dashboard/folders')
}
