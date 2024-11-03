'use server'

import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { db } from '../..'
import { folders, workspaces } from '../../schema'
import { CreateFolderInput } from '../files'
export async function createFolderInDb(folder: CreateFolderInput) {
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
