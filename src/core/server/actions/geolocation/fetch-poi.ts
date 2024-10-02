'use server'

import { cache } from 'react'

export type PointOfInterest = {
	id: string
	name: string
	type: string
	latitude: number
	longitude: number
	distance: number
}

export const fetchPointsOfInterest = cache(async (latitude: number, longitude: number): Promise<PointOfInterest[]> => {
	try {
		const radius = 1500 // 1.5km radius
		const query = `
      [out:json];
      (
        node["amenity"](around:${radius},${latitude},${longitude});
        way["amenity"](around:${radius},${latitude},${longitude});
        relation["amenity"](around:${radius},${latitude},${longitude});
      );
      out center;
    `

		const response = await fetch('https://overpass-api.de/api/interpreter', {
			method: 'POST',
			body: query,
		})

		if (!response.ok) {
			throw new Error('Failed to fetch points of interest')
		}

		const data = await response.json()

		return data.elements.map((element: any) => ({
			id: element.id.toString(),
			name: element.tags.name || 'Unnamed',
			type: element.tags.amenity,
			latitude: element.lat || element.center.lat,
			longitude: element.lon || element.center.lon,
			distance: calculateDistance(latitude, longitude, element.lat || element.center.lat, element.lon || element.center.lon),
		}))
	} catch (error) {
		console.error('Error fetching points of interest:', error)
		throw error
	}
})

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const R = 6371 // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1)
	const dLon = deg2rad(lon2 - lon1)
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const d = R * c // Distance in km
	return parseFloat(d.toFixed(2))
}

function deg2rad(deg: number): number {
	return deg * (Math.PI / 180)
}
