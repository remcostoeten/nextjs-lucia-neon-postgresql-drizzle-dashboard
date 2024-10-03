'use client'

import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useCallback, useEffect, useState } from 'react'
import { useMapEvents } from 'react-leaflet'

type Location = {
	lat: number
	lng: number
	name: string
}

const customIcon = new Icon({
	iconUrl: '/placeholder.svg?height=25&width=25',
	iconSize: [25, 25]
})

function MapEvents({
	onLocationSelect
}: {
	onLocationSelect: (location: Location) => void
}) {
	const map = useMapEvents({
		click(e) {
			const { lat, lng } = e.latlng
			onLocationSelect({
				lat,
				lng,
				name: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
			})
		}
	})
	return null
}

export function InteractiveMap() {
	const [isMounted, setIsMounted] = useState(false)
	const [center, setCenter] = useState<[number, number]>([52.3676, 4.9041]) // Default to Amsterdam
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(
		null
	)

	const handleLocationSelect = useCallback((location: Location) => {
		setSelectedLocation(location)
	}, [])

	const handleConfirmLocation = useCallback(() => {
		if (selectedLocation) {
			console.log('Confirmed location:', selectedLocation)
		}
	}, [selectedLocation])

	useEffect(() => {
		setIsMounted(true)
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				position => {
					setCenter([
						position.coords.latitude,
						position.coords.longitude
					])
				},
				error => {
					console.error('Error getting current location:', error)
					// Keep the default Amsterdam coordinates if there's an error
				}
			)
		}
	}, [])

	if (!isMounted) {
		return null // or a loading placeholder
	}

	// ... rest of the component
}
