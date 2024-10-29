import React from 'react'

type Activity = {
	id: string
	type: string
	description: string
	createdAt: string
}

interface ActivityListProps {
	activities: Activity[]
	onDelete: (id: string) => void
}

export const ActivityList: React.FC<ActivityListProps> = ({
	activities,
	onDelete
}) => {
	return (
		<ul className="space-y-4">
			{activities.map(activity => (
				<li key={activity.id} className="bg-section p-4 rounded-lg">
					<div className="flex justify-between items-center">
						<div>
							<h3 className="font-bold">{activity.type}</h3>
							<p>{activity.description}</p>
							<span className="text-sm text-gray-500">
								{new Date(activity.createdAt).toLocaleString()}
							</span>
						</div>
						<button
							onClick={() => onDelete(activity.id)}
							className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
						>
							Delete
						</button>
					</div>
				</li>
			))}
		</ul>
	)
}
