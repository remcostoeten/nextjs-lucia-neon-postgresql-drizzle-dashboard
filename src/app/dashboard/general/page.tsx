'use client'

import { Card, CardContent, CardHeader, CardTitle } from 'ui'
import { getActivityLogs } from '@/core/server/actions/activity'
import { useEffect, useState } from 'react'
type ActivityLogItem = {
	id: string
	action: string
	timestamp: string
	details: string | null
}

export default function ActivityLog() {
	const [logs, setLogs] = useState<ActivityLogItem[]>([])

	useEffect(() => {
		const fetchLogs = async () => {
			const fetchedLogs = await getActivityLogs()
			setLogs(fetchedLogs as ActivityLogItem[])
		}
		fetchLogs()
	}, [])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Activity Log</CardTitle>
			</CardHeader>
			<CardContent>
				{logs.map((log) => (
					<div key={log.id} className="mb-2">
						<p className="text-sm font-semibold">{log.action}</p>
						<p className="text-xs text-gray-500">
							{new Date(log.timestamp).toLocaleString()}
						</p>
						{log.details && (
							<p className="text-sm">{log.details}</p>
						)}
					</div>
				))}
			</CardContent>
		</Card>
	)
}
