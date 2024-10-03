'use server'

import { cache } from 'react'

const API_KEY = process.env.OPENROUTE_SERVICE_API_KEY

if (!API_KEY) {
	throw new Error(
		'OPENROUTE_SERVICE_API_KEY is not set in environment variables'
	)
}

type Location = {
	id: string
	name: string
	address: string
	coordinates: [number, number]
}

export const searchLocations = cache(
	async (query: string): Promise<Location[]> => {
		try {
			const response = await fetch(
				`https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${encodeURIComponent(query)}&size=5`
			)

			if (!response.ok) {
				throw new Error('Failed to fetch location suggestions')
			}

			const data = await response.json()

			return data.features
				.map((feature: any) => ({
					id: feature.properties.id || '',
					name: feature.properties.name || 'Unknown',
					address: feature.properties.label || 'Unknown',
					coordinates: [
						feature.geometry.coordinates[1],
						feature.geometry.coordinates[0]
					] // Swap lat and lon
				}))
				.filter(
					(location: Location) =>
						location.coordinates[0] !== 0 &&
						location.coordinates[1] !== 0
				)
		} catch (error) {
			console.error('Error searching locations:', error)
			return []
		}
	}
)
