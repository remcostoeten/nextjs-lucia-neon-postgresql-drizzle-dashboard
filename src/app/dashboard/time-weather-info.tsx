'use client'

import { useState, useEffect } from 'react'
import { Flex } from '@/components/atoms/Flex'

type WeatherData = {
    temperature: number
    description: string
}

export default function TimeWeatherInfo() {
    const [currentTime, setCurrentTime] = useState<string>('')
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [location, setLocation] = useState<string>('Amsterdam')

    useEffect(() => {
        // Update time every minute
        const timer = setInterval(() => {
            const now = new Date()
            setCurrentTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }))
        }, 60000)

        // Get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    fetchWeather(latitude, longitude)
                    fetchLocation(latitude, longitude)
                },
                () => {
                    // Fallback to Amsterdam if geolocation is not available
                    fetchWeather(52.3676, 4.9041)
                }
            )
        } else {
            // Fallback to Amsterdam if geolocation is not supported
            fetchWeather(52.3676, 4.9041)
        }

        return () => clearInterval(timer)
    }, [])

    const fetchWeather = async (lat: number, lon: number) => {
        // Replace with your actual weather API call
        // This is a mock implementation
        const mockWeather: WeatherData = {
            temperature: 22,
            description: 'light breeze'
        }
        setWeather(mockWeather)
    }

    const fetchLocation = async (lat: number, lon: number) => {
        // Replace with your actual reverse geocoding API call
        // This is a mock implementation
        setLocation('Your City')
    }

    const getWeatherAdvice = (weather: WeatherData) => {
        if (weather.temperature > 25) {
            return "It's nice and sunny, don't forget to wear sun protection!"
        } else if (weather.description.includes('breeze')) {
            return "There's a light breeze, perfect for a walk!"
        }
        return ''
    }

    return (
        <Flex dir="col" className="text-lg text-title mt-2">
            <p>Current time in {location}: {currentTime}</p>
            {weather && (
                <p>
                    The local weather is {weather.temperature}°C with {weather.description}.
                    {' '}{getWeatherAdvice(weather)}
                </p>
            )}
        </Flex>
    )
}
