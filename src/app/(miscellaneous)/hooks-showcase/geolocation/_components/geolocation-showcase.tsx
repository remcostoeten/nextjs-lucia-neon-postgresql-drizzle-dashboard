'use client'

import { useGeolocation } from '@/core/hooks'
import { AlertTriangle, Clock, Compass, MapPin } from 'lucide-react'
import { SiExpedia } from 'react-icons/si'
import GeolocationLoader from './geolocation.loader'

export default function GeolocationUI() {
    const { data, error, isLoading } = useGeolocation()

    if (isLoading) {
        return (
            <GeolocationLoader />
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="border rounded-lg p-6 max-w-md w-full shadow-lg">
                    <div className="flex items-center justify-center text-destructive mb-4">
                        <AlertTriangle className="w-12 h-12" />
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-2">Error</h2>
                    <p className="text-center text-muted-foreground">{error.message}</p>
                </div>
            </div>
        )
    }

    if (!data) {
        return null
    }

    const dataPoints = [
        { icon: <MapPin />, label: 'Latitude', value: data.latitude.toFixed(6) },
        { icon: <MapPin />, label: 'Longitude', value: data.longitude.toFixed(6) },
        { icon: <Compass />, label: 'Accuracy', value: `${data.accuracy.toFixed(2)} meters` },
        { icon: <MapPin />, label: 'Altitude', value: data.altitude ? `${data.altitude.toFixed(2)} meters` : 'N/A' },
        { icon: <Compass />, label: 'Altitude Accuracy', value: data.altitudeAccuracy ? `${data.altitudeAccuracy.toFixed(2)} meters` : 'N/A' },
        { icon: <Compass />, label: 'Heading', value: data.heading ? `${data.heading.toFixed(2)}°` : 'N/A' },
        { icon: <SiExpedia />, label: 'Speed', value: data.speed ? `${(data.speed * 3.6).toFixed(2)} km/h` : 'N/A' },
        { icon: <Clock />, label: 'Timestamp', value: new Date(data.timestamp).toLocaleString() },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataPoints.map((point, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-section-lighter rounded-md border">
                    <div className="text-primary">{point.icon}</div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{point.label}</p>
                        <p className="text-lg font-semibold">{point.value}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
