'use server'

import { cache } from 'react'

export type WeatherData = {
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

const API_KEY = process.env.WEATHER_API_KEY

export const fetchWeatherData = cache(
	async (latitude: number, longitude: number): Promise<WeatherData> => {
		if (!API_KEY) {
			throw new Error('Weather API key is not set')
		}

		try {
			const response = await fetch(
				`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=5&aqi=no&alerts=no`
			)

			if (!response.ok) {
				throw new Error('Failed to fetch weather data')
			}

			const data = await response.json()

			return {
				current: {
					temperature: data.current.temp_c,
					condition: data.current.condition.text,
					humidity: data.current.humidity,
					windSpeed: data.current.wind_kph
				},
				forecast: data.forecast.forecastday.map((day: any) => ({
					date: day.date,
					maxTemp: day.day.maxtemp_c,
					minTemp: day.day.mintemp_c,
					condition: day.day.condition.text
				}))
			}
		} catch (error) {
			console.error('Error fetching weather data:', error)
			throw error
		}
	}
)
