'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
	ScrollArea,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from 'ui'
import { MapPin, Phone, Globe, Clock } from 'lucide-react'

type POI = {
	id: string
	name: string
	type: string
	address: string
	phone?: string
	website?: string
	openingHours?: string
	distance: number
}

type PointsOfInterestProps = {
	points: POI[]
}

export function PointsOfInterest({ points }: PointsOfInterestProps) {
	const [selectedType, setSelectedType] = useState<string | null>(null)

	const filteredPoints = selectedType
		? points.filter(point => point.type === selectedType)
		: points

	const types = Array.from(new Set(points.map(point => point.type)))

	return (
		<Card className="mt-4 bg-black text-white">
			<CardHeader>
				<CardTitle>Points of Interest</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-2 mb-4">
					<Button
						variant={selectedType === null ? 'default' : 'outline'}
						onClick={() => setSelectedType(null)}
					>
						All
					</Button>
					{types.map(type => (
						<Button
							key={type}
							variant={
								selectedType === type ? 'default' : 'outline'
							}
							onClick={() => setSelectedType(type)}
						>
							{type}
						</Button>
					))}
				</div>
				<ScrollArea className="h-[300px] rounded-md border p-4">
					{filteredPoints.map((point, index) => (
						<motion.div
							key={point.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							className="mb-4 last:mb-0"
						>
							<h4 className="text-lg font-semibold">
								{point.name}
							</h4>
							<p className="text-sm text-gray-400">
								{point.type}
							</p>
							<div className="mt-2 space-y-1">
								<div className="flex items-center">
									<MapPin className="w-4 h-4 mr-2" />
									<span className="text-sm">
										{point.address}
									</span>
								</div>
								{point.phone && (
									<div className="flex items-center">
										<Phone className="w-4 h-4 mr-2" />
										<a
											href={`tel:${point.phone}`}
											className="text-sm hover:underline"
										>
											{point.phone}
										</a>
									</div>
								)}
								{point.website && (
									<div className="flex items-center">
										<Globe className="w-4 h-4 mr-2" />
										<a
											href={point.website}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm hover:underline"
										>
											Website
										</a>
									</div>
								)}
								{point.openingHours && (
									<div className="flex items-center">
										<Clock className="w-4 h-4 mr-2" />
										<span className="text-sm">
											{point.openingHours}
										</span>
									</div>
								)}
							</div>
							<p className="mt-2 text-sm text-gray-400">
								{point.distance.toFixed(2)} km away
							</p>
						</motion.div>
					))}
				</ScrollArea>
			</CardContent>
		</Card>
	)
}
