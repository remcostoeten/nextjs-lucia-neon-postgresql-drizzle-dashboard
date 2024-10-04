import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

type MapComponentProps = {
	location?: [number, number]
}

const DEFAULT_LOCATION: [number, number] = [51.505, -0.09] // London coordinates

const customIcon = new L.Icon({
	iconUrl: '/pointer.svg',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34]
})

function MapUpdater({ location }: { location: [number, number] }) {
	const map = useMap()
	useEffect(() => {
		map.setView(location, 13)
	}, [map, location])
	return null
}

export function MapComponent({ location }: MapComponentProps) {
	const mapRef = useRef<L.Map | null>(null)

	return (
		<MapContainer
			center={location || DEFAULT_LOCATION}
			zoom={13}
			style={{ height: '400px', width: '100%' }}
			ref={mapRef}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{location && (
				<>
					<Marker position={location} icon={customIcon}>
						<Popup>
							Latitude: {location[0].toFixed(4)}
							<br />
							Longitude: {location[1].toFixed(4)}
						</Popup>
					</Marker>
					<MapUpdater location={location} />
				</>
			)}
		</MapContainer>
	)
}
