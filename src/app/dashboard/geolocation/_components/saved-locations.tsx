'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, ScrollArea } from 'ui'

import { deleteLocation, saveLocation } from 'actions'
import { MapPin, Trash2 } from 'lucide-react'

type SavedLocation = {
	id: string
	title: string
	latitude: number
	longitude: number
}

export function SavedLocations() {
	const [title, setTitle] = useState('')
	const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([])
	const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null)

	async function handleSave() {
		if (!currentLocation) {
			alert('Please search for a location first')
			return
		}
		try {
			const result = await saveLocation(title, currentLocation.latitude, currentLocation.longitude)
			setSavedLocations([...savedLocations, result])
			setTitle('')
		} catch (error) {
			console.error('Error saving location:', error)
			alert('Failed to save location. Please try again.')
		}
	}

	async function handleDelete(id: string) {
		try {
			await deleteLocation(id)
			setSavedLocations(savedLocations.filter(location => location.id !== id))
		} catch (error) {
			console.error('Error deleting location:', error)
			alert('Failed to delete location. Please try again.')
		}
	}

	function handleLocationClick(latitude: number, longitude: number) {
		// Implement logic to update map view with these coordinates
		console.log('Updating map view to:', latitude, longitude)
	}

	return (
		<Card className="mt-4 bg-black text-white">
			<CardHeader>
				<CardTitle>Saved Locations</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex gap-2 mb-4">
					<Input
						type="text"
						placeholder="Enter title for location"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="flex-grow"
					/>
					<Button onClick={handleSave} disabled={!currentLocation}>Save</Button>
				</div>
				<ScrollArea className="h-[200px]">
					<AnimatePresence>
						{savedLocations.map((location) => (
							<motion.div
								key={location.id}
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3 }}
								className="flex items-center justify-between p-2 mb-2 bg-gray-800 rounded"
							>
								<button
									onClick={() => handleLocationClick(location.latitude, location.longitude)}
									className="flex items-center text-left"
								>
									<MapPin className="w-4 h-4 mr-2" />
									<span>{location.title}</span>
								</button>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => handleDelete(location.id)}
								>
									<Trash2 className="w-4 h-4" />
									<span className="sr-only">Delete</span>
								</Button>
							</motion.div>
						))}
					</AnimatePresence>
				</ScrollArea>
			</CardContent>
		</Card>
	)
}
