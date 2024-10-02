'use server'

import { cache } from 'react'

const API_KEY = process.env.OPENROUTE_SERVICE_API_KEY

if (!API_KEY) {
	throw new Error('OPENROUTE_SERVICE_API_KEY is not set in environment variables')
}

type Location = {
	id: string
	name: string
	address: string
}

export const searchLocations = cache(async (query: string): Promise<Location[]> => {
	try {
		const response = await fetch(
			`https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${encodeURIComponent(query)}&size=5`
		)

		if (!response.ok) {
			throw new Error('Failed to fetch location suggestions')
		}

		const data = await response.json()

		return data.features.map((feature: any) => ({
			id: feature.properties.id,
			name: feature.properties.name,
			address: feature.properties.label,
		}))
	} catch (error) {
		console.error('Error searching locations:', error)
		throw new Error('Failed to search locations')
	}
})
