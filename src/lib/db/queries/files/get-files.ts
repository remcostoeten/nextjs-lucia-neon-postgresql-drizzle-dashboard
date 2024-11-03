'use server'

import { eq } from 'drizzle-orm'
import { db } from '../..'
import { workspaces, files } from '../../schema'

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
