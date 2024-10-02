'use client'

import { Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

type MapComponentProps = {
  location: [number, number]
}

export function MapComponent({ location }: MapComponentProps) {
  const [map, setMap] = useState<LeafletMap | null>(null)

  useEffect(() => {
    if (map) {
      map.setView(location, 13)
    }
  }, [map, location])

  return (
    <MapContainer
      center={location}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
      whenCreated={setMap}
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
