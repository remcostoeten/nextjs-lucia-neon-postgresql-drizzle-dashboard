'use client'

import { getActivityLogs } from '@/core/server/actions/users/fetch-activity'
import { ActivityLog } from '@/lib/db/schema/activity'
import { useEffect, useState } from 'react'

export default function ActivityFeed() {
	const [activities, setActivities] = useState<ActivityLog[]>([])

	useEffect(() => {
		async function fetchActivities() {
			try {
				const logs = await getActivityLogs()
				setActivities(logs)
			} catch (error) {
				console.error('Failed to fetch activity logs:', error)
			}
		}

		fetchActivities()
	}, [])

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Activity Feed</h2>
			{activities.map(activity => (
				<div key={activity.id} className="border p-4 rounded-md">
					<p className="font-semibold">{activity.action}</p>
					<p className="text-sm text-gray-500">{activity.details}</p>
					<p className="text-xs text-gray-400">
						{new Date(activity.timestamp).toLocaleString()}
					</p>
					{activity.metadata && (
						<div className="mt-2 text-xs text-gray-500">
							<p>Additional Info:</p>
							<pre className="whitespace-pre-wrap">
								{JSON.stringify(
									JSON.parse(activity.metadata),
									null,
									2
								)}
							</pre>
						</div>
					)}
				</div>
			))}
		</div>
	)
}
