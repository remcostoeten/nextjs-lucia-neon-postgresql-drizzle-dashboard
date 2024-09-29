'use server'

import { db } from '@/lib/db'
import { locations } from '@/lib/db/schema'
import { eq, ilike } from 'drizzle-orm'
import { distance } from 'fastest-levenshtein'
import { fetchWeatherData } from '../weather'
import { fetchPointsOfInterest } from './fetch-poi'

type Location = {
	id: number
	name: string
	address: string
	latitude: number
	longitude: number
}

type WeatherData = Awaited<ReturnType<typeof fetchWeatherData>>
type PointOfInterest = Awaited<ReturnType<typeof fetchPointsOfInterest>>[number]

export async function searchLocation(searchTerm: string) {
	const correctedSearchTerm = correctTypos(searchTerm)

	const results = await db
		.select()
		.from(locations)
		.where(ilike(locations.name, `%${correctedSearchTerm}%`))
		.limit(5)

	if (results.length === 0) {
		return null
	}

	// Find the best match using Levenshtein distance
	const bestMatch = results.reduce((best, current) =>
		distance(current.name, correctedSearchTerm) <
		distance(best.name, correctedSearchTerm)
			? current
			: best
	)

	const weather = await fetchWeatherData(
		bestMatch.latitude,
		bestMatch.longitude
	)
	const pointsOfInterest = await fetchPointsOfInterest(
		bestMatch.latitude,
		bestMatch.longitude
	)

	return {
		id: bestMatch.id,
		name: bestMatch.name,
		address: bestMatch.address,
		coordinates: [bestMatch.latitude, bestMatch.longitude] as [
			number,
			number
		],
		weather,
		pointsOfInterest
	}
}

function correctTypos(searchTerm: string): string {
	// Simple typo correction: remove extra spaces and convert to lowercase
	return searchTerm.trim().toLowerCase().replace(/\s+/g, ' ')
}

// Note: fetchWeatherData and fetchPointsOfInterest are imported from separate files
// to keep this file focused on the search functionality
