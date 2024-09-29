'use client'

import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type MapComponentProps = {
  location: [number, number]
}

export function MapComponent({ location }: MapComponentProps) {
  const [mapKey, setMapKey] = useState(0)

  // Force re-render of map when location changes
  if (location !== prevLocation) {
    setMapKey(mapKey + 1)
  }

  return (
    <MapContainer
      key={mapKey}
      center={location}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={location}>
        <Popup>
          Latitude: {location[0].toFixed(3)}<br />
          Longitude: {location[1].toFixed(3)}
        </Popup>
      </Marker>
    </MapContainer>
  )
}
