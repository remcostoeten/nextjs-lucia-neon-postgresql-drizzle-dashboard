'use server'

import { getUserAuth } from '@/lib/auth/utils'
import { db } from '@/lib/db/index'
import { activityLogs, activityLogSchema } from '@/lib/db/schema/activity'
import { generateId } from 'lucia'
export async function logActivity(
	action: string,
	details?: string,
	userId?: string
) {
	const { session } = await getUserAuth()
	if (!session) throw new Error('Unauthorized')

	const result = activityLogSchema.safeParse({ action, details })
	if (!result.success) {
		throw new Error('Invalid activity log data')
	}

	await db.insert(activityLogs).values({
		id: generateId(15),
		userId: userId ?? session.user.id,
		action: result.data.action,
		details: result.data.details
	})
}

export async function getActivityLogs() {
	const { session } = await getUserAuth()
	if (!session) throw new Error('Unauthorized')

	const logs = await db
		.select()
		.from(activityLogs)
		.where(eq(activityLogs.userId, session.user.id))
		.orderBy(desc(activityLogs.timestamp))
		.limit(50)

	return logs
}
1
