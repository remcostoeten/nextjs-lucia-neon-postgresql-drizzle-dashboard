// mockActivityApi.ts
import { Activity, CreateActivityInput } from './activities.d'

const STORAGE_KEY = 'activities'

export const mockActivityApi = {
	create: async (activity: CreateActivityInput): Promise<Activity> => {
		return new Promise(resolve => {
			setTimeout(() => {
				const activities = JSON.parse(
					localStorage.getItem(STORAGE_KEY) || '[]'
				) as Activity[]
				const newActivity: Activity = {
					...activity,
					id: Math.random().toString(36).substr(2, 9),
					createdAt: new Date().toISOString()
				}
				activities.push(newActivity)
				localStorage.setItem(STORAGE_KEY, JSON.stringify(activities))
				resolve(newActivity)
			}, 500)
		})
	},

	getUserActivities: async (): Promise<Activity[]> => {
		return new Promise(resolve => {
			setTimeout(() => {
				const activities = JSON.parse(
					localStorage.getItem(STORAGE_KEY) || '[]'
				) as Activity[]
				resolve(activities)
			}, 500)
		})
	},

	// Add this method to clear all activities (for testing purposes)
	clearAllActivities: async (): Promise<void> => {
		return new Promise(resolve => {
			setTimeout(() => {
				localStorage.removeItem(STORAGE_KEY)
				resolve()
			}, 500)
		})
	}
}
