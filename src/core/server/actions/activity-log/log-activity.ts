'use server'

import { getUserAuth } from '@/lib/auth/utils'
import { db } from '@/lib/db/index'
import { activityLogs } from '@/lib/db/schema/activity'
import { generateId } from 'lucia'

export async function logActivity(
	action: string,
	details?: string,
	userId?: string,
	metadata?: Record<string, any>
) {
	try {
		const { session } = await getUserAuth()
		if (!session) {
			throw new Error('User not authenticated')
		}

		const userId = session.user.id

		const [newLog] = await db
			.insert(activityLogs)
			.values({
				id: generateId(15),
				userId,
				action,
				details: details || '',
				metadata: metadata ? JSON.stringify(metadata) : null,
				timestamp: new Date()
			})
			.returning()

		return { success: true, log: newLog }
	} catch (error) {
		const errorLog = {
			timestamp: new Date().toISOString(),
			errorMessage: (error as Error).message,
			errorStack: (error as Error).stack,
			action,
			userId,
			details,
			metadata
		}
		console.warn(
			'Failed to log activity:',
			JSON.stringify(errorLog, null, 2)
		)
		return {
			success: false,
			error: 'Failed to log activity',
			errorDetails: errorLog
		}
	}
}
