'use server'

import { db } from '@/lib/db'
import { locations, savedLocations } from '@/lib/db/schema'

export async function saveLocation(
	userId: string,
	title: string,
	latitude: number,
	longitude: number
) {
	const [location] = await db
		.insert(locations)
		.values({
			name: title,
			address: '', // You might want to fetch the address using a geocoding service
			latitude,
			longitude
		})
		.returning()

	const [savedLocation] = await db
		.insert(savedLocations)
		.values({
			userId,
			locationId: location.id,
			title
		})
		.returning()

	return savedLocation
}
