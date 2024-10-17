import { processedTexts } from '@/core/server/db/schema'
import { db } from 'db'

export async function saveProcessedText(
	name: string,
	content: string,
	processorType: string
) {
	try {
		const result = await db
			.insert(processedTexts)
			.values({
				name,
				content,
				processorType,
				createdAt: new Date()
			})
			.returning()

		return { success: true, data: result[0] }
	} catch (error) {
		console.error('Error saving processed text:', error)
		return {
			success: false,
			error: 'Failed to save processed text',
			details: error instanceof Error ? error.message : String(error)
		}
	}
}
