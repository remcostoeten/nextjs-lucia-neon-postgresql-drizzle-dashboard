import { useEffect, useState } from 'react'
import { IconNames } from 'ui'

export interface Activity {
	id: string
	name: string
	duration: number
	icon: IconNames | 'default'
	color: string
}

export function useActivities() {
	const [activities, setActivities] = useState<Activity[]>([])

	useEffect(() => {
		const storedActivities = localStorage.getItem('activities')
		if (storedActivities) {
			setActivities(JSON.parse(storedActivities))
		}
	}, [])

	const createActivity = (activity: Omit<Activity, 'id'>) => {
		const newActivity = { ...activity, id: Date.now().toString() }
		const updatedActivities = [...activities, newActivity]
		localStorage.setItem('activities', JSON.stringify(updatedActivities))
		setActivities(updatedActivities)
	}

	return { activities, createActivity }
}
