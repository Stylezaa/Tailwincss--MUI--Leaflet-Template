import React from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

function MapComponent() {
  return (
    <MapContainer style={{ widht: '100vw', height: '100vh'}} className="drop-shadow-md rounded" center={[17.965835,102.611009]} zoom={14} scrollWheelZoom={false}>
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
    </MapContainer>
  )
}

export default MapComponent