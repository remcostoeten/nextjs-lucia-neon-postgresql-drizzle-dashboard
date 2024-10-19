'use client'

import { useEffect, useState } from 'react'
import CurrentTime from './current-time'

const WEATHER_API_KEY = '34fbe462685d4f289e8134528231509'

async function getWeather(city) {
	const response = await fetch(
		`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`
	)
	if (!response.ok) {
		throw new Error('Failed to fetch weather data')
	}
	return response.json()
}

function Dashboard() {
	const [city, setCity] = useState('Loading...')
	const [weather, setWeather] = useState(null)
	const [name, setName] = useState('User') // You can update this with actual user name if available

	useEffect(() => {
		async function fetchCityAndWeather() {
			try {
				const fetchedCity = await getCity()
				setCity(fetchedCity)
				const weatherData = await getWeather(fetchedCity)
				setWeather(weatherData)
				log('Weather data:', weatherData)
			} catch (err) {
				error('Error fetching data:', err)
				setCity('Unknown City')
			}
		}

		fetchCityAndWeather()
	}, [error, log])

	const getGreeting = () => {
		const hour = new Date().getHours()
		if (hour < 12) return 'Good morning'
		if (hour < 18) return 'Good afternoon'
		return 'Good evening'
	}

	const getWeatherAdvice = () => {
		if (!weather) return ''

		const temp = weather.current.temp_c
		const condition = weather.current.condition.text.toLowerCase()

		if (temp > 25)
			return (
				"Pack your sunglasses because it's " + temp + '°C outside! ☀️'
			)
		if (temp < 10)
			return "Don't forget your coat, it's chilly at " + temp + '°C! 🧥'
		if (condition.includes('rain'))
			return 'Grab an umbrella, it looks like rain! ☔'
		if (condition.includes('snow')) return "Bundle up, it's snowing! ❄️"
		if (temp >= 20 && temp <= 25)
			return 'Perfect weather for a walk at ' + temp + '°C! 🚶‍♂️'
		return "Enjoy your day, it's " + temp + '°C outside! 😊'
	}

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto my-8">
			<h2 className="text-3xl font-bold mb-4">
				{getGreeting()} {name}, 👋
			</h2>
			<div className="flex justify-between items-center mb-6">
				<div>
					<p className="text-lg text-gray-600">Current time:</p>
					<CurrentTime format="full" showPeriod={true} />
				</div>
				<div>
					<p className="text-lg text-gray-600">Your location:</p>
					<p className="text-xl font-semibold">{city}</p>
				</div>
			</div>
			{weather && (
				<div className="bg-blue-50 p-4 rounded-lg">
					<p className="text-xl mb-2">
						{weather.current.temp_c}°C |{' '}
						{weather.current.condition.text}
					</p>
					<p className="text-lg text-blue-800">
						{getWeatherAdvice()}
					</p>
				</div>
			)}
		</div>
	)
}

export { Dashboard }
