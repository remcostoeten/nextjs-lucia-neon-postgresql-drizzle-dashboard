'use server'

import { getUserAuth } from '@/lib/auth/utils'
import { db } from '@/lib/db/index'
import { parsedOutputs } from '@/lib/db/schema/parsed-ig'
import { eq } from 'drizzle-orm'

export async function saveParsedOutput(content: string, title: string) {
	const { session } = await getUserAuth()
	if (!session) {
		return { error: 'Unauthorized', success: false }
	}

	try {
		await db.insert(parsedOutputs).values({
			title,
			content,
			userId: session.user.id
		})

		return { success: true, error: '' }
	} catch (e) {
		console.error('Failed to save parsed output:', e)
		return { error: 'Failed to save parsed output', success: false }
	}
}

