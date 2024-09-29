'use server'

import { cache } from 'react'

export type PointOfInterest = {
	id: string
	name: string
	type: string
	address: string
	latitude: number
	longitude: number
	distance: number
}

const API_KEY = process.env.GOOGLE_PLACES_API_KEY

export const fetchPointsOfInterest = cache(
	async (latitude: number, longitude: number): Promise<PointOfInterest[]> => {
		if (!API_KEY) {
			throw new Error('Google Places API key is not set')
		}

		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&key=${API_KEY}`
			)

			if (!response.ok) {
				throw new Error('Failed to fetch points of interest')
			}

			const data = await response.json()

			return data.results.map((place: any) => ({
				id: place.place_id,
				name: place.name,
				type: place.types[0],
				address: place.vicinity,
				latitude: place.geometry.location.lat,
				longitude: place.geometry.location.lng,
				distance: calculateDistance(
					latitude,
					longitude,
					place.geometry.location.lat,
					place.geometry.location.lng
				)
			}))
		} catch (error) {
			console.error('Error fetching points of interest:', error)
			throw error
		}
	}
)

function calculateDistance(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
): number {
	const R = 6371 // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1)
	const dLon = deg2rad(lon2 - lon1)
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const d = R * c // Distance in km
	return parseFloat(d.toFixed(2))
}

function deg2rad(deg: number): number {
	return deg * (Math.PI / 180)
}
