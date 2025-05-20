import { useEffect, useState } from "react"
import io from "socket.io-client"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import axios from "axios"

const socket = io("http://localhost:5000")

const MapTracker = () => {
  const [position, setPosition] = useState<[number, number] | null>(null)
  const [tracking, setTracking] = useState(false)
  const [plate, setPlate] = useState("")

  const startTracking = async () => {
    if (!plate) return alert("Por favor ingresa una placa")

    try {
      await axios.post(`http://localhost:5000/motorcycles/track/${plate}`)
      setTracking(true)
    } catch (error) {
      console.error("Error al iniciar el rastreo:", error)
      alert("Error al iniciar el rastreo")
    }
  }

  const stopTracking = async () => {
    try {
      await axios.post(`http://localhost:5000/motorcycles/stop/${plate}`)
      setTracking(false)
      setPosition(null)
    } catch (error) {
      console.error("Error al detener el rastreo:", error)
    }
  }

  useEffect(() => {
    if (!tracking) return

    // Escucha el canal que es el nombre de la placa
    socket.on(plate, (coord: { lat: number; lng: number }) => {
      setPosition([coord.lat, coord.lng])
    })

    return () => {
      socket.off(plate)
    }
  }, [tracking, plate])

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          placeholder="Ingrese la placa"
          className="border border-gray-300 rounded px-3 py-2"
        />

        <button
          onClick={startTracking}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Iniciar rastreo
        </button>

        <button
          onClick={stopTracking}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Detener rastreo
        </button>
      </div>

      <MapContainer center={[10.0, -74.0]} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {position && (
          <Marker
            position={position}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>Vehículo: {plate}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}

export default MapTracker
