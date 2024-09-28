import { z } from 'zod'

export const folderSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	color: z.string().optional(),
	description: z.string().optional(),
	parentId: z.string().nullable().optional()
})

export const updateFolderSchema = z.object({
	id: z.string(),
	name: z.string().min(1).max(255),
	color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color')
})
