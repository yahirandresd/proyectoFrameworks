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
  iconUrl: 'https://png.pngtree.com/recommend-works/png-clipart/20250101/ourmid/pngtree-orange-delivery-man-on-motorcycle-png-image_15017922.png',
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

const MotorcycleTracker = () => {
  const [position, setPosition] = useState<Coordinate>({ lat: 5.064, lng: -75.496 });

  useEffect(() => {
    // Inicia el seguimiento cuando el componente se monta
    axios.post('http://localhost:5000/motorcycles/track/ABC124').catch(err => {
      console.error('Error iniciando seguimiento:', err.message);
    });

    // Conectar socket.io
    const socket = io('http://localhost:5000');
    socket.on('ABC124', (coord: Coordinate) => {
      if (coord.lat && coord.lng) {
        setPosition(coord);
      }
    });

    // Al desmontar el componente: parar seguimiento y desconectar socket
    return () => {
      axios.post('http://localhost:5000/motorcycles/stop/ABC124').catch(err => {
        console.error('Error deteniendo seguimiento:', err.message);
      });
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
      <MapContainer center={position} zoom={15} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={motorcycleIcon}>
          <Popup>Motocicleta ABC124</Popup>
        </Marker>
        <FollowMarker position={position} />
      </MapContainer>
    </div>
  );
};

export default MotorcycleTracker;
