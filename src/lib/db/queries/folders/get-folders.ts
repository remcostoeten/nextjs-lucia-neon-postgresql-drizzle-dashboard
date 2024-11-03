'use server'

import { eq } from 'drizzle-orm'
import { db } from '../..'
import { folders, workspaces } from '../../schema'

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
