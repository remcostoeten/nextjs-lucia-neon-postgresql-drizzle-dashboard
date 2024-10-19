'use server'
import { cache } from 'react'

/**
 * This function fetches the visitor's city using the ipapi.co API.
 * It caches the result to avoid unnecessary API calls.
 * If the API call fails, it returns 'Unknown City'.
 * @returns {Promise<string>} The visitor's city or 'Unknown City'.
 */
export const getCity = cache(async () => {
	try {
		console.log('Fetching city data...')
		const response = await fetch('https://ipapi.co/json')
		if (!response.ok) {
			throw new Error('Failed to fetch city data')
		}
		const data = await response.json()
		console.log('Fetched city data:', data)
		return data.city || 'Unknown City'
	} catch (err) {
		console.error('Error fetching city data:', err)
		return 'Unknown City'
	}
})
