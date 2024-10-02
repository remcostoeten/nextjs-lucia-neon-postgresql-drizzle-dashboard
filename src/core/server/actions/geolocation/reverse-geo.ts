'use server'

import { cache } from 'react'

const OPENROUTE_SERVICE_API_KEY = process.env.OPENROUTE_SERVICE_API_KEY

if (!OPENROUTE_SERVICE_API_KEY) {
    throw new Error('OPENROUTE_SERVICE_API_KEY is not set in environment variables')
}

type LocationInfo = {
    address: string
    city: string
    country: string
}

export const reverseGeocode = cache(async (latitude: number, longitude: number): Promise<LocationInfo> => {
    try {
        const response = await fetch(
            `https://api.openrouteservice.org/geocode/reverse?api_key=${OPENROUTE_SERVICE_API_KEY}&point.lon=${longitude}&point.lat=${latitude}`
        )

        if (!response.ok) {
            throw new Error('Failed to fetch reverse geocoding data')
        }

        const data = await response.json()

        if (data.features.length === 0) {
            throw new Error('No location data found for the given coordinates')
        }

        const feature = data.features[0]
        const properties = feature.properties

        return {
            address: properties.name || 'Unknown Address',
            city: properties.locality || properties.county || 'Unknown City',
            country: properties.country || 'Unknown Country',
        }
    } catch (error) {
        console.error('Error in reverse geocoding:', error)
        throw new Error('Failed to reverse geocode the given coordinates')
    }
})
