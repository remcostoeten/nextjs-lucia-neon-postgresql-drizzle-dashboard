'use server'

import type { Workspace } from '@/core/types/db'
import { db } from '@/lib/db'
import { workspaces } from '@/lib/db/schema'
import { slugify } from '@/core/utilities/slugify'
import { eq } from 'drizzle-orm'
import { unstable_cache as cache } from 'next/cache'

export async function createWorkspace(workspace: Workspace) {
	try {
		let slug = slugify(workspace.title)
		let counter = 0
		let finalSlug = slug

		while (true) {
			const existing = await db.query.workspaces.findFirst({
				where: eq(workspaces.slug, finalSlug)
			})

			if (!existing) break

			counter++
			finalSlug = `${slug}-${counter}`
		}

		const [data] = await db
			.insert(workspaces)
			.values({
				title: workspace.title,
				slug: finalSlug,
				iconId: workspace.iconId,
				workspaceOwnerId: workspace.workspaceOwnerId
			})
			.returning()

		return data
	} catch (e) {
		console.error((e as Error).message)
		throw new Error('Failed to create Workspace.')
	}
}

export const getWorkspaces = cache(
	async (userId: string) => {
		try {
			const results = await db.query.workspaces.findMany({
				where: eq(workspaces.workspaceOwnerId, userId)
			})

			return results.map((workspace) => ({
				id: workspace.id,
				title: workspace.title,
				slug: workspace.slug,
				iconId: workspace.iconId,
				workspaceOwnerId: workspace.workspaceOwnerId,
				createdAt: workspace.createdAt?.toString(),
				updatedAt: workspace.updatedAt?.toString()
			}))
		} catch (error) {
			console.error('Error fetching workspaces:', error)
			return []
		}
	},
	['workspaces'],
	{ tags: ['workspaces'] }
)

export async function getWorkspaceBySlug(slug: string) {
	try {
		const workspace = await db.query.workspaces.findFirst({
			where: eq(workspaces.slug, slug)
		})
		return workspace || null
	} catch (e) {
		console.error((e as Error).message)
		throw new Error('Failed to fetch workspace!')
	}
}
