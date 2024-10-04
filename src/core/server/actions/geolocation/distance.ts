'use server'

import { cache } from 'react'

const API_KEY = process.env.OPENROUTE_SERVICE_API_KEY

if (!API_KEY) {
	throw new Error(
		'OPENROUTE_SERVICE_API_KEY is not set in environment variables'
	)
}

type Coordinates = [number, number]

type RouteInfo = {
	straightLineDistance: number
	roadDistance: number
	estimatedTime: string
}

async function getCoordinates(address: string): Promise<Coordinates> {
	const response = await fetch(
		`https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${encodeURIComponent(address)}`
	)
	if (!response.ok) {
		throw new Error(`Geocoding failed: ${response.statusText}`)
	}
	const data = await response.json()
	if (data.features.length === 0) {
		throw new Error(`No coordinates found for address: ${address}`)
	}
	return data.features[0].geometry.coordinates as Coordinates
}

function calculateStraightLineDistance(
	start: Coordinates,
	end: Coordinates
): number {
	const R = 6371 // Earth's radius in km
	const dLat = ((end[1] - start[1]) * Math.PI) / 180
	const dLon = ((end[0] - start[0]) * Math.PI) / 180
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((start[1] * Math.PI) / 180) *
			Math.cos((end[1] * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	return R * c
}

export const calculateDistance = cache(
	async (origin: string, destination: string): Promise<RouteInfo> => {
		try {
			const [startCoords, endCoords] = await Promise.all([
				getCoordinates(origin),
				getCoordinates(destination)
			])

			const straightLineDistance = calculateStraightLineDistance(
				startCoords,
				endCoords
			)

			const routeResponse = await fetch(
				`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`
			)

			if (!routeResponse.ok) {
				throw new Error(`Routing failed: ${routeResponse.statusText}`)
			}

			const routeData = await routeResponse.json()
			const route = routeData.features[0].properties.segments[0]

			const roadDistance = route.distance / 1000 // Convert to km
			const durationInSeconds = route.duration

			const hours = Math.floor(durationInSeconds / 3600)
			const minutes = Math.floor((durationInSeconds % 3600) / 60)
			const estimatedTime = `${hours} hours ${minutes} minutes`

			return {
				straightLineDistance: parseFloat(
					straightLineDistance.toFixed(2)
				),
				roadDistance: parseFloat(roadDistance.toFixed(2)),
				estimatedTime
			}
		} catch (error) {
			console.error('Error calculating distance:', error)
			throw new Error('Failed to calculate distance. Please try again.')
		}
	}
)
