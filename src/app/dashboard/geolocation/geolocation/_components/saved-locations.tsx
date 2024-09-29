'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	ScrollArea,
	Input,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from 'ui'
import { Trash2, MapPin } from 'lucide-react'

type SavedLocation = {
	id: string
	title: string
	coordinates: [number, number]
}

export function SavedLocations() {
	const [title, setTitle] = useState('')
	const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([])
	const [currentCoordinates, setCurrentCoordinates] = useState<
		[number, number] | null
	>(null)

	async function handleSave() {
		if (!currentCoordinates) {
			alert('Please search for a location first')
			return
		}
		const result = await saveLocation(title, currentCoordinates)
		if (result) {
			setSavedLocations([...savedLocations, result])
			setTitle('')
		}
	}

	async function handleDelete(id: string) {
		const success = await deleteLocation(id)
		if (success) {
			setSavedLocations(
				savedLocations.filter((location) => location.id !== id)
			)
		}
	}

	function handleLocationClick(coordinates: [number, number]) {
		// Implement logic to update map view with these coordinates
		console.log('Updating map view to:', coordinates)
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
					<Button onClick={handleSave} disabled={!currentCoordinates}>
						Save
					</Button>
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
									onClick={() =>
										handleLocationClick(
											location.coordinates
										)
									}
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
