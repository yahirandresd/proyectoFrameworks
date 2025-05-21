import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { io } from 'socket.io-client';
import 'leaflet/dist/leaflet.css';

const motorcycleIcon = new L.Icon({
  iconUrl:
    'https://png.pngtree.com/recommend-works/png-clipart/20250101/ourmid/pngtree-orange-delivery-man-on-motorcycle-png-image_15017922.png',
  iconSize: [52, 52],
});

type Coordinate = {
  lat: number;
  lng: number;
};

const FollowMarker = ({ position }: { position: Coordinate }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [position, map]);
  return null;
};

const MotorcycleTracker = ({ motorcycleId }: { motorcycleId: number }) => {
  const [position, setPosition] = useState<Coordinate>({ lat: 5.064, lng: -75.496 });
  const [licensePlate, setLicensePlate] = useState<string | null>(null);

  useEffect(() => {
    // Obtener placa desde el backend
    axios.get(`http://localhost:5000/motorcycles/${motorcycleId}`)
      .then(res => {
        setLicensePlate(res.data.license_plate);
      })
      .catch(err => {
        console.error('Error obteniendo placa:', err.message);
      });
  }, [motorcycleId]);

  useEffect(() => {
    if (!licensePlate) return;

    axios.post(`http://localhost:5000/motorcycles/track/${licensePlate}`).catch(err => {
      console.error('Error iniciando seguimiento:', err.message);
    });

    const socket = io('http://localhost:5000');
    socket.on(licensePlate, (coord: Coordinate) => {
      if (coord.lat && coord.lng) {
        setPosition(coord);
      }
    });

    return () => {
      axios.post(`http://localhost:5000/motorcycles/stop/${licensePlate}`).catch(err => {
        console.error('Error deteniendo seguimiento:', err.message);
      });
      socket.disconnect();
    };
  }, [licensePlate]);

  if (!licensePlate) return <p>Cargando mapa...</p>;

  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
      <MapContainer center={position} zoom={15} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={motorcycleIcon}>
          <Popup>Motocicleta {licensePlate}</Popup>
        </Marker>
        <FollowMarker position={position} />
      </MapContainer>
    </div>
  );
};

export default MotorcycleTracker;
