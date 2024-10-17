'use server'

import { getUserAuth } from '@/core/server/auth/utils'

import { activityLogs, db } from 'db'
import { desc, eq } from 'drizzle-orm'

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
