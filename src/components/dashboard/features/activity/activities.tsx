'use client'

import { useState } from 'react'
import { Button, ScrollArea } from 'ui'
import type { Activity } from './activities.d'
import { ActivityCard } from './activity-card'
import { AnimateHeight } from './animate-height'
import { CreateActivityPopover } from './create-activity-popover'
import { useActivities } from './use-activities'

type ActivitiesProps = {
	initialActivities?: Activity[]
}

export default function Activities({
	initialActivities = []
}: ActivitiesProps) {
	const [isExpanded, setIsExpanded] = useState(true)
	const { activities, isLoading, error } = useActivities(initialActivities)

	if (error) {
		return <div className="text-red-500">Error: {error}</div>
	}

	return (
		<div className="-z-10 mt-6 overflow-hidden rounded-xl border px-4 py-3">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">Activities</h2>
				<div className="flex items-center gap-2">
					<CreateActivityPopover />
					<Button
						variant="outline"
						size="sm"
						className="text-xs"
						aria-expanded={isExpanded}
						aria-controls="activities-list"
						onClick={() => setIsExpanded(prev => !prev)}
					>
						{isExpanded ? 'Hide' : 'Show'}
					</Button>
				</div>
			</div>
			<AnimateHeight height={isExpanded ? 'auto' : 0}>
				<ScrollArea className="mt-4">
					{isLoading ? (
						<div className="text-center text-gray-500">
							Loading activities...
						</div>
					) : activities.length === 0 ? (
						<div className="text-center text-gray-500">
							No activities yet. Create one to get started!
						</div>
					) : (
						<ul id="activities-list" className="flex gap-4">
							{activities.map(activity => (
								<ActivityCard key={activity.id} {...activity} />
							))}
						</ul>
					)}
				</ScrollArea>
			</AnimateHeight>
		</div>
	)
}
