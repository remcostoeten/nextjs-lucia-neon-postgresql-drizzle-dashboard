'use client'

import { useState, useEffect } from 'react'

interface WeatherData {
    current: {
        temp_c: number
        condition: { text: string }
    }
    forecast: {
        forecastday: Array<{
            day: {
                avgtemp_c: number
                condition: { text: string }
            }
        }>
    }
}

async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
    const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
    if (!res.ok) throw new Error('Failed to fetch weather data')
    return res.json()
}

export default function PersonalizedGreeting({ name }: { name: string }) {
    const [greeting, setGreeting] = useState<string>('')

    useEffect(() => {
        async function getLocationAndWeather() {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords
                    try {
                        const weatherData = await fetchWeatherData(latitude, longitude)
                        const now = new Date()
                        const currentTemp = weatherData.current.temp_c
                        const currentCondition = weatherData.current.condition.text
                        const tomorrowTemp = weatherData.forecast.forecastday[0].day.avgtemp_c
                        const tomorrowCondition = weatherData.forecast.forecastday[0].day.condition.text

                        setGreeting(`Hey ${name}! It's ${now.toLocaleTimeString()} and ${currentCondition.toLowerCase()} with ${currentTemp}°C. Tomorrow it'll be ${tomorrowCondition.toLowerCase()} with ${tomorrowTemp}°C.`)
                    } catch (error) {
                        console.error('Error fetching weather data:', error)
                        setGreeting(`Hey ${name}! Welcome to your dashboard.`)
                    }
                }, () => {
                    setGreeting(`Hey ${name}! Welcome to your dashboard.`)
                })
            } else {
                setGreeting(`Hey ${name}! Welcome to your dashboard.`)
            }
        }

        getLocationAndWeather()
    }, [name])

    return <h2 className="text-3xl font-semibold mb-4">{greeting}</h2>
}
