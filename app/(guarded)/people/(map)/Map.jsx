'use client';

import 'leaflet/dist/leaflet.css';
// --import to be able to use a pin
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
// Marker and popup are for the pin, TileLayer is for crediting leaflet, MapContainer is main function
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function Map(props) {
  const { users, currentUser } = props;
  console.log('props from inside map component', props);
  console.log('users.length', users.length);

  if (users.length > 0) {
    const center = [0, 0];
    const currentUserLat = currentUser[0].latitude;
    const userMarkers = users.map(userMarker => (
      <Marker
        // turn string lat and long back into Number by calling Number()
        position={[Number(userMarker.latitude), Number(userMarker.longitude)]}>
        <Popup>
          {userMarker.username}
          <br />
        </Popup>
      </Marker>
    ));
    return (
      <div className="min-h-[30vh] min-w-[30vw] w-2/4 h-[80%]">
        <MapContainer
          center={center}
          className="h-full w-full mx-5"
          scrollWheelZoom
          zoom={1}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {currentUserLat ? (
            <Marker
              position={[
                Number(currentUser[0].latitude),
                Number(currentUser[0].longitude)
              ]}>
              <Popup>
                {currentUser[0].username}
                <br />
              </Popup>
            </Marker>
          ) : null}
          {userMarkers}
        </MapContainer>
      </div>
    );
  }
}

export default Map;