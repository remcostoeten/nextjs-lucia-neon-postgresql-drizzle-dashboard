'use client'

import { useState, useTransition, useOptimistic } from 'react'
import { motion } from 'framer-motion'
import { Input } from 'ui/input'
import { Button } from 'ui/button'
import { Card, CardContent, CardHeader, CardTitle } from 'ui/card'
import { searchLocation } from 'actions/geolocation'
import { MapComponent } from './map-component'
import { WeatherForecast } from './weather-forecast'
import { PointsOfInterest } from './points-of-interest'
import { SavedLocations } from './saved-locations'

type Location = {
  address: string
  coordinates: [number, number]
  weather: any // Replace with actual weather type
  pointsOfInterest: any[] // Replace with actual POI type
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
      const result = await searchLocation(searchTerm)
      if (result) {
        addOptimisticLocation(result)
        setLocation(result)
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
            <WeatherForecast weather={optimisticLocation.weather} />
            <PointsOfInterest points={optimisticLocation.pointsOfInterest} />
          </motion.div>
        )}
        
        <SavedLocations />
      </CardContent>
    </Card>
  )
}
