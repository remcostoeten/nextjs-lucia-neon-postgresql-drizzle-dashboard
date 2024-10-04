'use client'

import { reverseGeocode } from 'actions'
import { useEffect, useState } from 'react'

type LocationInfo = {
	address: string
	city: string
	country: string
}

export function useReverseGeocode() {
	const [latitude, setLatitude] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('reverseGeocode_latitude') || ''
		}
		return ''
	})
	const [longitude, setLongitude] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('reverseGeocode_longitude') || ''
		}
		return ''
	})
	const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('reverseGeocode_latitude', latitude)
		}
	}, [latitude])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('reverseGeocode_longitude', longitude)
		}
	}, [longitude])

	const handleLatitudeChange = (value: string) => {
		setLatitude(value)
	}

	const handleLongitudeChange = (value: string) => {
		setLongitude(value)
	}

	const handleSearch = async () => {
		setIsLoading(true)
		setError(null)
		try {
			const result = await reverseGeocode(
				parseFloat(latitude),
				parseFloat(longitude)
			)
			setLocationInfo(result)
		} catch (err) {
			console.error('Error in reverse geocoding:', err)
			setError('Failed to fetch location information. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return {
		latitude,
		handleLatitudeChange,
		longitude,
		handleLongitudeChange,
		locationInfo,
		isLoading,
		error,
		handleSearch
	}
}
