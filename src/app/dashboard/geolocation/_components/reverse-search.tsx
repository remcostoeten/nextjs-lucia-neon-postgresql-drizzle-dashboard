'use client'

import { reverseGeocode } from 'actions'
import { useState } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from 'ui'

type LocationInfo = {
    address: string
    city: string
    country: string
}

export function ReverseSearch() {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSearch() {
        setIsLoading(true)
        try {
            const result = await reverseGeocode(parseFloat(latitude), parseFloat(longitude))
            setLocationInfo(result)
        } catch (error) {
            console.error('Error in reverse geocoding:', error)
            // Handle error (e.g., show error message to user)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className= "w-full bg-black text-white" >
        <CardHeader>
        <CardTitle>Reverse Search </CardTitle>
            </CardHeader>
            < CardContent >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" >
                <Input
            placeholder="Latitude"
    value = { latitude }
    onChange = {(e) => setLatitude(e.target.value)
}
type = "number"
step = "any"
    />
    <Input
            placeholder="Longitude"
value = { longitude }
onChange = {(e) => setLongitude(e.target.value)}
type = "number"
step = "any"
    />
    </div>
    < Button onClick = { handleSearch } disabled = { isLoading } className = "w-full mb-4" >
        { isLoading? 'Searching...': 'Search Location' }
        </Button>
{
    locationInfo && (
        <motion.div
            initial={ { opacity: 0, y: 20 } }
    animate = {{ opacity: 1, y: 0 }
}
transition = {{ duration: 0.3 }}
          >
    <p>Address: { locationInfo.address } </p>
        < p > City: { locationInfo.city } </p>
            < p > Country: { locationInfo.country } </p>
                </motion.div>
        )}
</CardContent>
    </Card>
  )
}
