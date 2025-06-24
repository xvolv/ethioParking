// src/MapPage.jsx
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from 'react-leaflet';
import { Link } from 'react-router-dom';

import L from 'leaflet';
import 'leaflet-routing-machine';
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import './home.css'; // 👈 Add your styles here

// Fix marker icon path issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

// 🚧 Hardcoded parking spots (you can replace with DB/API later)
const parkingSpots = [
  {
    id: 1,
    org_name: 'Bole Smart Parking',
    latitude: 9.025,
    longitude: 38.752,
    price: 25,
    info: 'Underground, 24/7 secured'
  },
  {
    id: 2,
    org_name: '4 Kilo Parking Area',
    latitude: 9.04,
    longitude: 38.763,
    price: 20,
    info: 'Outdoor, near shops'
  }
];

// 🔄 Routing component
function Routing({ userPosition, destination }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!userPosition || !destination) return;

    if (routingRef.current) {
      map.removeControl(routingRef.current);
    }

    routingRef.current = L.Routing.control({
      waypoints: [L.latLng(userPosition), L.latLng(destination)],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      lineOptions: {
        styles: [{ color: '#0075BE', weight: 4 }]
      },
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1'
      })
    }).addTo(map);
  }, [userPosition, destination, map]);

  return null;
}
function FlyToUserLocation({ userPosition }) {
  const map = useMap();

  useEffect(() => {
    if (userPosition) {
      map.flyTo(userPosition, 16); // Zoom level can be adjusted
    }
  }, [userPosition, map]);

  return null;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [userPosition, setUserPosition] = useState(null);
  const [destination, setDestination] = useState(null);

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => alert("Location permission denied.")
    );
  }, []);

  // Filter based on search
  const filteredSpots = parkingSpots.filter((spot) =>
    spot.org_name.toLowerCase().includes(query.toLowerCase())
  );

  // 🔴 Custom pulsing icon for user location
  const pulseIcon = L.divIcon({
    className: 'pulse-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return (
    <div style={{ display: 'flex' }}>
      {/* 🔍 Left panel */}
      <aside style={{ width: '300px', padding: '20px', backgroundColor: '#f4f4f4' }}>
        <h3>Search Parking</h3>
        <input
          type="search"
          placeholder="Search parking area"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '100%', marginBottom: '20px' }}
        />
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredSpots.map((spot) => (
            <li
              key={spot.id}
              onClick={() => setDestination([spot.latitude, spot.longitude])}
              style={{
                padding: '10px',
                marginBottom: '10px',
                background: '#fff',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {spot.org_name}
            </li>
          ))}
        </ul>
      </aside>

      {/* 🗺️ Map */}
      <div style={{ flexGrow: 1, height: '100vh' }}>
       <MapContainer center={[9.03, 38.74]} zoom={15} style={{ height: '100%', width: '100%' }}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; OpenStreetMap contributors"
  />

  {userPosition && (
    <Marker position={userPosition} icon={pulseIcon}>
      <Popup>You are here</Popup>
    </Marker>
  )}

  {filteredSpots.map((spot) => (
    <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
   <Popup>
  <strong>{spot.org_name}</strong><br />
  Price: ${spot.price}<br />
  Info: {spot.info}<br />

  <button
    onClick={(e) => {
      e.stopPropagation();  // prevent popup closing
      setDestination([spot.latitude, spot.longitude]);
    }}
  >
    Want to Go
  </button>{' '}

<Link to={`/reserve/${spot.id}`} onClick={e => e.stopPropagation()}>
  <button>Reserve</button>
</Link>

</Popup>

    </Marker>
  ))}

  {userPosition && destination && (
    <Routing userPosition={userPosition} destination={destination} />
  )}

  {/* 👇 Auto-zoom to user's location */}
  {userPosition && <FlyToUserLocation userPosition={userPosition} />}
</MapContainer>

      </div>
    </div>
  );
}
