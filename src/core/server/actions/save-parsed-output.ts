'use server'

import { getUserAuth } from '@/core/server/auth/utils'
import { processedTexts } from '@/core/server/db/schema'

import { db } from 'db'
import { eq } from 'drizzle-orm'

export async function saveProcessedText(
	name: string,
	content: string,
	processorType: string
) {
	try {
		await db.insert(processedTexts).values({
			name,
			content,
			processorType
			// No need to specify createdAt as it has a default value
		})

		return { success: true, error: '' }
	} catch (e) {
		console.error('Failed to save processed text:', e)
		return { error: 'Failed to save processed text', success: false }
	}
}

export async function fetchProcessedTexts() {
	try {
		const texts = await db.select().from(processedTexts)
		return { success: true, error: '', data: texts }
	} catch (e) {
		console.error('Failed to fetch processed texts:', e)
		return {
			error: 'Failed to fetch processed texts',
			success: false,
			data: null
		}
	}
}

export async function fetchProcessedTextById(id: string) {
	const { session } = await getUserAuth()
	if (!session) {
		return { error: 'Unauthorized', success: false, data: null }
	}

	try {
		const text = await db
			.select()
			.from(processedTexts)
			.where(eq(processedTexts.id, id))
			.limit(1)

		if (text.length === 0) {
			return {
				error: 'Processed text not found',
				success: false,
				data: null
			}
		}

		return { success: true, error: '', data: text[0] }
	} catch (e) {
		console.error('Failed to fetch processed text by id:', e)
		return {
			error: 'Failed to fetch processed text',
			success: false,
			data: null
		}
	}
}
