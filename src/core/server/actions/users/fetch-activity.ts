'use server'

import { validateRequest } from '@/lib/auth/lucia'
import { db, activityLogs } from '@/lib/db'
import { eq, desc } from 'drizzle-orm'

export async function getActivityLogs() {
	const { user } = await validateRequest()
	if (!user) {
		throw new Error('Unauthorized')
	}

	const logs = await db
		.select()
		.from(activityLogs)
		.where(eq(activityLogs.userId, user.id))
		.orderBy(desc(activityLogs.timestamp))

	return logs
}
