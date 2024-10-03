'use client'

import { cn } from '@/lib/utils'
import { calculateDistance, searchLocations } from 'actions'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	Popover,
	PopoverContent,
	PopoverTrigger
} from 'ui'

type RouteInfo = {
	straightLineDistance: number
	roadDistance: number
	estimatedTime: string
}

type Location = {
	id: string
	name: string
	address: string
}

function useDebounce(callback: (...args: any[]) => void, delay: number) {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	return useCallback(
		(...args: any[]) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}

			timeoutRef.current = setTimeout(() => {
				callback(...args)
			}, delay)
		},
		[callback, delay]
	)
}

export function DistanceCalculator() {
	const [origin, setOrigin] = useState('')
	const [destination, setDestination] = useState('')
	const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [originSuggestions, setOriginSuggestions] = useState<Location[]>([])
	const [destinationSuggestions, setDestinationSuggestions] = useState<
		Location[]
	>([])
	const [openOrigin, setOpenOrigin] = useState(false)
	const [openDestination, setOpenDestination] = useState(false)

	const debouncedSearch = useDebounce(
		async (
			input: string,
			setSuggestions: (locations: Location[]) => void
		) => {
			if (input.length > 2) {
				const suggestions = await searchLocations(input)
				setSuggestions(suggestions)
			}
		},
		300
	)

	const handleOriginChange = (value: string) => {
		setOrigin(value)
		debouncedSearch(value, setOriginSuggestions)
	}

	const handleDestinationChange = (value: string) => {
		setDestination(value)
		debouncedSearch(value, setDestinationSuggestions)
	}

	async function handleCalculate() {
		setIsLoading(true)
		try {
			const result = await calculateDistance(origin, destination)
			setRouteInfo(result)
		} catch (error) {
			console.error('Error calculating distance:', error)
			// Handle error (e.g., show error message to user)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Card className="w-full bg-black text-white">
			<CardHeader>
				<CardTitle>Distance Calculator</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<Popover open={openOrigin} onOpenChange={setOpenOrigin}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={openOrigin}
								className="w-full justify-between"
							>
								{origin || 'Select origin...'}
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0">
							<Command>
								<CommandInput
									placeholder="Search origin..."
									onValueChange={handleOriginChange}
								/>
								<CommandEmpty>No location found.</CommandEmpty>
								<CommandGroup>
									{originSuggestions.map(location => (
										<CommandItem
											key={location.id}
											onSelect={() => {
												setOrigin(location.name)
												setOpenOrigin(false)
											}}
										>
											<Check
												className={cn(
													'mr-2 h-4 w-4',
													origin === location.name
														? 'opacity-100'
														: 'opacity-0'
												)}
											/>
											{location.name}
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>

					<Popover
						open={openDestination}
						onOpenChange={setOpenDestination}
					>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={openDestination}
								className="w-full justify-between"
							>
								{destination || 'Select destination...'}
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0">
							<Command>
								<CommandInput
									placeholder="Search destination..."
									onValueChange={handleDestinationChange}
								/>
								<CommandEmpty>No location found.</CommandEmpty>
								<CommandGroup>
									{destinationSuggestions.map(location => (
										<CommandItem
											key={location.id}
											onSelect={() => {
												setDestination(location.name)
												setOpenDestination(false)
											}}
										>
											<Check
												className={cn(
													'mr-2 h-4 w-4',
													destination ===
														location.name
														? 'opacity-100'
														: 'opacity-0'
												)}
											/>
											{location.name}
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
				<Button
					onClick={handleCalculate}
					disabled={isLoading}
					className="w-full mb-4"
				>
					{isLoading ? 'Calculating...' : 'Calculate Distance'}
				</Button>
				<AnimatePresence>
					{routeInfo && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<p>
								Straight Line Distance:{' '}
								{routeInfo.straightLineDistance.toFixed(2)} km
							</p>
							<p>
								Road Distance:{' '}
								{routeInfo.roadDistance.toFixed(2)} km
							</p>
							<p>
								Estimated Travel Time: {routeInfo.estimatedTime}
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</CardContent>
		</Card>
	)
}
