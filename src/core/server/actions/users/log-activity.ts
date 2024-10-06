'use server'

import { getUserAuth } from '@/lib/auth/utils'
import { db } from '@/lib/db/index'
import { activityLogs } from '@/lib/db/schema/activity'
import { generateId } from 'lucia'

export async function logActivity(
	action: string,
	details?: string,
	p0?: string,
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
		console.error('Failed to log activity:', error)
		return { success: false, error: 'Failed to log activity' }
	}
}
