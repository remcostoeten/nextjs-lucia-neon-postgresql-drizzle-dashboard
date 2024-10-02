'use client'

import { searchLocations } from 'actions'
import { motion } from 'framer-motion'
import { useOptimistic, useState, useTransition } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from 'ui'
import { MapComponent } from './map-component'
import { PointsOfInterest } from './points-of-interest'
import { SavedLocations } from './saved-locations'
import { WeatherForecast } from './weather-forecast'

type Location = {
  address: string
  coordinates: [number, number]
  weather: any
  pointsOfInterest: any[]
}

export function GeolocationFinder() {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState<Location | null>(null)
  const [isPending, startTransition] = useTransition()
  const [optimisticLocation, addOptimisticLocation] = useOptimistic(
    location,
    (state, newLocation: Location) => newLocation
  )

  function handleSearch() {
    startTransition(async () => {
      const results = await searchLocations(searchTerm)
      if (results && results.length > 0) {
        const result = results[0] // Take the first result
        const newLocation: Location = {
          address: result.address,
          coordinates: [parseFloat(result.latitude), parseFloat(result.longitude)],
          weather: null, // You'll need to fetch this separately
          pointsOfInterest: [] // You'll need to fetch this separately
        }
        addOptimisticLocation(newLocation)
        setLocation(newLocation)
        // Here you would typically fetch weather and points of interest
      }
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Geolocation Finder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Enter city, street, address, or postal code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch} disabled={isPending}>
            {isPending ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {optimisticLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MapComponent location={optimisticLocation.coordinates} />
            {optimisticLocation.weather && (
              <WeatherForecast weather={optimisticLocation.weather} />
            )}
            {optimisticLocation.pointsOfInterest && (
              <PointsOfInterest points={optimisticLocation.pointsOfInterest} />
            )}
          </motion.div>
        )}

        <SavedLocations />
      </CardContent>
    </Card>
  )
}
