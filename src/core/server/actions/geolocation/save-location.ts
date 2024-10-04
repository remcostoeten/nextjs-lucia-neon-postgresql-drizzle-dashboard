'use server'

import { db } from '@/lib/db'
import { savedLocations } from '@/lib/db/schema'

export async function saveLocation(
	title: string,
	latitude: number,
	longitude: number
) {
	try {
		const [savedLocation] = await db
			.insert(savedLocations)
			.values({
				title,
				latitude,
				longitude
			})
			.returning()

		return savedLocation
	} catch (error) {
		console.error('Error saving location:', error)
		throw new Error('Failed to save location')
	}
}
