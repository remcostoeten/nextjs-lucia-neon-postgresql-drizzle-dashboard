'use client'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input
} from '@/components/ui'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { searchLocations } from '@/core/server/actions'
import { useState, useTransition } from 'react'
import { MapComponent } from './map-component'
import { SavedLocations } from './saved-locations'

type Location = {
	address: string
	coordinates: [number, number]
	weather: null
	pointsOfInterest: never[]
}

export function GeolocationFinder() {
	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState<Location[]>([])
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(
		null
	)
	const [isPending, startTransition] = useTransition()

	async function handleSearch() {
		startTransition(async () => {
			const results = await searchLocations(searchTerm)
			if (results && results.length > 0) {
				const formattedResults: Location[] = results.map(result => ({
					address: result.address,
					coordinates: result.coordinates,
					weather: null,
					pointsOfInterest: []
				}))
				setSearchResults(formattedResults)
				setSelectedLocation(null) // Clear previous selection
			} else {
				setSearchResults([])
				setSelectedLocation(null)
			}
		})
	}

	function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			handleSearch()
		}
	}

	function handleSelectLocation(address: string) {
		const location = searchResults.find(
			result => result.address === address
		)
		if (location) {
			setSelectedLocation(location)
		}
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Geolocation Finder</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex gap-2 mb-4">
					<Input
						type="text"
						placeholder="Enter city, street, address, or postal code"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						onKeyPress={handleKeyPress}
						className="flex-grow"
					/>
					<Button onClick={handleSearch} disabled={isPending}>
						{isPending ? 'Searching...' : 'Search'}
					</Button>
				</div>

				{searchResults.length > 0 && (
					<Select
						onValueChange={handleSelectLocation}
						className="mb-4"
					>
						<SelectTrigger>
							<SelectValue placeholder="Select a location" />
						</SelectTrigger>
						<SelectContent>
							{searchResults.map((result, index) => (
								<SelectItem key={index} value={result.address}>
									{result.address}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}

				{selectedLocation && (
					<div>
						<MapComponent location={selectedLocation.coordinates} />
						<p>Address: {selectedLocation.address}</p>
					</div>
				)}

				<SavedLocations />
			</CardContent>
		</Card>
	)
}
