// MapComponent.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',          // Make it responsive
  height: '400px',       // Set a fixed height
  borderRadius: '10px',  // Add rounded corners
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for depth
  margin: '20px 0',      // Add vertical spacing
};

const MapComponent = ({ lat, lng }) => {
  const center = { lat: lat, lng: lng }; // Use the lat and lng props

  return (
    <LoadScript googleMapsApiKey="AIzaSyB-Xj7VtuJQrgzfQN_yGAxp7rkYGE7VugU">
      <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={center} 
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
