'use client'

import { Card, CardContent, CardHeader, CardTitle, Input } from "@/components/ui"
import { searchLocations } from "@/core/server/actions"
import { useState, useTransition } from "react"
import { Button } from "react-day-picker"
import { MapComponent } from "./map-component"
import { SavedLocations } from "./saved-locations"

export function GeolocationFinder() {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState<Location | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSearch() {
    startTransition(async () => {
      const results = await searchLocations(searchTerm)
      if (results && results.length > 0) {
        const result: Location = {
          address: results[0].address,
          coordinates: results[0].coordinates,
          weather: null,
          pointsOfInterest: []
        }
        setLocation(result)
      }
    })
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSearch()
    }
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
            onKeyPress={handleKeyPress}
            className="flex-grow"
          />
          <Button onClick={handleSearch} disabled={isPending}>
            {isPending ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {location && (
          <div>
            <MapComponent location={location.coordinates} />
            <p>Address: {location.address}</p>
          </div>
        )}

        <SavedLocations />
      </CardContent>
    </Card>
  )
}
