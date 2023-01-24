import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const locations = [
  {
    latitude: -7.8118006,
    longitude: 112.0525034,
    name: "Kediri"
  },
  {
    latitude: -7.619369,
    longitude: 111.8287976,
    name: "Nganjuk"
  },
  {
    latitude: -8.1039,
    longitude: 111.917,
    name: "Tulungagung"
  }
];

const MapScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -7.8118006,
          longitude: 112.0525034,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;
