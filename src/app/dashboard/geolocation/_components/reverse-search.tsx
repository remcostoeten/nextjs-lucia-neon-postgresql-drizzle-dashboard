'use client'

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Switch
} from '@/components/ui'
import {
	createShortcutMap,
	useKeyboardShortcuts
} from '@/core/hooks/use-keyboard-shortcuts'
import { motion } from 'framer-motion'
import { InfoIcon, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import React, { useRef, useState } from 'react'
import { useReverseGeocode } from '../_hooks/use-reverse-geocode'

const MapComponent = dynamic(
	() => import('./map-component').then(mod => mod.MapComponent),
	{
		ssr: false,
		loading: () => <p>Loading map...</p>
	}
)

export type ReverseSearchProps = {
	prop: string
}

export function ReverseSearch({ prop }: ReverseSearchProps) {
	const {
		latitude,
		handleLatitudeChange,
		longitude,
		handleLongitudeChange,
		locationInfo,
		isLoading,
		error,
		handleSearch
	} = useReverseGeocode()

	const [autoFillEnabled, setAutoFillEnabled] = useState(true)
	const [showMap, setShowMap] = useState(false)
	const [mapLocation, setMapLocation] = useState<[number, number] | null>(
		null
	)
	const longitudeInputRef = useRef<HTMLInputElement>(null)

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearchWithMap()
		}
	}

	const clearBothInputs = () => {
		handleLatitudeChange('')
		handleLongitudeChange('')
		setShowMap(false)
		setMapLocation(null)
	}

	const clearLatitude = () => {
		handleLatitudeChange('')
		setShowMap(false)
		setMapLocation(null)
	}

	const clearLongitude = () => {
		handleLongitudeChange('')
		setShowMap(false)
		setMapLocation(null)
	}

	const shortcuts = createShortcutMap([['ctrl+alt+x', clearBothInputs]])

	useKeyboardShortcuts(shortcuts, { disableOnInput: false })

	const handleLatitudePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		if (!autoFillEnabled) return

		e.preventDefault()
		const pastedText = e.clipboardData.getData('text')
		const [lat, lon] = pastedText.split(',').map(coord => coord.trim())

		if (lat && lon) {
			const parsedLat = parseFloat(lat).toFixed(6)
			const parsedLon = parseFloat(lon).toFixed(6)

			handleLatitudeChange(parsedLat)
			handleLongitudeChange(parsedLon)

			if (longitudeInputRef.current) {
				longitudeInputRef.current.focus()
			}
		} else {
			handleLatitudeChange(pastedText)
		}
	}

	const handleSearchWithMap = async () => {
		await handleSearch()
		const parsedLat = parseFloat(latitude)
		const parsedLon = parseFloat(longitude)
		if (!isNaN(parsedLat) && !isNaN(parsedLon)) {
			setMapLocation([parsedLat, parsedLon])
			setShowMap(true)
		}
	}

	return (
		<Card className="w-full bg-black text-gray-200">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-white">Reverse Search</CardTitle>
				<div className="flex items-center space-x-2">
					<Switch
						checked={autoFillEnabled}
						onCheckedChange={setAutoFillEnabled}
						aria-label="Toggle auto-fill mechanism"
					/>
					<span className="text-sm">Auto-fill</span>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="text-gray-400 hover:text-white"
							>
								<InfoIcon className="h-4 w-4" />
								<span className="sr-only">
									Open help popover
								</span>
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<h3 className="font-semibold mb-2 text-white">
								Keyboard Shortcuts & Features
							</h3>
							<ul className="list-disc pl-4 space-y-1">
								<li>
									<strong>Ctrl+Alt+X:</strong> Clear both
									input fields
								</li>
								<li>
									<strong>Enter:</strong> Perform search
								</li>
								<li>
									<strong>Auto-fill:</strong> When enabled,
									pasting coordinates (e.g., "53.234, 6.570")
									into the Latitude field will automatically
									fill both fields
								</li>
							</ul>
						</PopoverContent>
					</Popover>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative">
					<div className="relative">
						<Input
							placeholder="Latitude"
							value={latitude}
							onChange={e => handleLatitudeChange(e.target.value)}
							onKeyPress={handleKeyPress}
							onPaste={handleLatitudePaste}
							type="number"
							step="any"
						/>
						{latitude && (
							<button
								onClick={clearLatitude}
								className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
							>
								&#x2715;
							</button>
						)}
					</div>
					<div className="relative">
						<Input
							ref={longitudeInputRef}
							placeholder="Longitude"
							value={longitude}
							onChange={e =>
								handleLongitudeChange(e.target.value)
							}
							onKeyPress={handleKeyPress}
							type="number"
							step="any"
						/>
						{longitude && (
							<button
								onClick={clearLongitude}
								className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
							>
								&#x2715;
							</button>
						)}
					</div>
				</div>
				<Button
					onClick={handleSearchWithMap}
					className="mt-4 w-full"
					disabled={isLoading}
				>
					{isLoading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Searching...
						</>
					) : (
						'Search Location'
					)}
				</Button>
				{error && (
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="text-error mb-4"
					>
						{error}
					</motion.p>
				)}
				{locationInfo && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="text-gray-300 mt-4"
					>
						<p>Address: {locationInfo.address}</p>
						<p>City: {locationInfo.city}</p>
						<p>Country: {locationInfo.country}</p>
					</motion.div>
				)}
				{showMap && mapLocation && (
					<div
						className="mt-4"
						style={{ height: '400px', width: '100%' }}
					>
						<MapComponent location={mapLocation} />
					</div>
				)}
			</CardContent>
		</Card>
	)
}
