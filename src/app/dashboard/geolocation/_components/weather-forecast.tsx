'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
	Tabs,
	ScrollArea,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	TabsContent,
	TabsList,
	TabsTrigger
} from 'ui'
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from 'lucide-react'

type WeatherData = {
	current: {
		temperature: number
		condition: string
		humidity: number
		windSpeed: number
	}
	forecast: Array<{
		date: string
		maxTemp: number
		minTemp: number
		condition: string
	}>
}

type WeatherForecastProps = {
	weather: WeatherData
}

const weatherIcons = {
	sunny: Sun,
	cloudy: Cloud,
	rainy: CloudRain,
	snowy: CloudSnow
}

export function WeatherForecast({ weather }: WeatherForecastProps) {
	const [selectedTab, setSelectedTab] = useState('current')
	const WeatherIcon = ({ condition }: { condition: string }) => {
		const Icon =
			weatherIcons[
				condition.toLowerCase() as keyof typeof weatherIcons
			] || Cloud
		return <Icon className="w-6 h-6 mr-2" />
	}

	return (
		<Card className="mt-4 bg-black text-white">
			<CardHeader>
				<CardTitle>Weather Forecast</CardTitle>
			</CardHeader>
			<CardContent>
				<Tabs value={selectedTab} onValueChange={setSelectedTab}>
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="current">Current</TabsTrigger>
						<TabsTrigger value="forecast">
							5-Day Forecast
						</TabsTrigger>
					</TabsList>
					<TabsContent value="current">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="p-4"
						>
							<div className="flex items-center mb-4">
								<WeatherIcon
									condition={weather.current.condition}
								/>
								<span className="text-3xl font-bold">
									{weather.current.temperature}°C
								</span>
							</div>
							<p className="mb-2">{weather.current.condition}</p>
							<p className="mb-2">
								Humidity: {weather.current.humidity}%
							</p>
							<div className="flex items-center">
								<Wind className="w-4 h-4 mr-2" />
								<span>
									Wind Speed: {weather.current.windSpeed} km/h
								</span>
							</div>
						</motion.div>
					</TabsContent>
					<TabsContent value="forecast">
						<ScrollArea className="h-[300px] rounded-md border p-4">
							{weather.forecast.map((day, index) => (
								<motion.div
									key={day.date}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.3,
										delay: index * 0.1
									}}
									className="mb-4 last:mb-0"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<WeatherIcon
												condition={day.condition}
											/>
											<span className="font-semibold">
												{new Date(
													day.date
												).toLocaleDateString('en-US', {
													weekday: 'short'
												})}
											</span>
										</div>
										<div>
											<span className="text-sm">
												{day.maxTemp}°C / {day.minTemp}
												°C
											</span>
										</div>
									</div>
									<p className="mt-1 text-sm text-gray-400">
										{day.condition}
									</p>
								</motion.div>
							))}
						</ScrollArea>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	)
}
