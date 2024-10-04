// File: lib/actions/activity.ts

'use server'

import { db } from '@/lib/db/index'
import { activityLogs } from '@/lib/db/schema/activity'
import { generateId } from 'lucia'

export async function logActivity(
	userId: string,
	action: string,
	details: string,
	metadata?: Record<string, any>
) {
	await db.insert(activityLogs).values({
		id: generateId(15),
		userId,
		action,
		details,
		metadata: metadata ? JSON.stringify(metadata) : null,
		timestamp: new Date()
	})
}
