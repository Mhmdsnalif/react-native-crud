import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const locations = [
  {
    latitude: -7.942965,
    longitude: 112.953186,
    name: "Bromo"
  },
  {
    latitude: -8.4431039573,
    longitude: 112.665374279,
    name: "Pantai Teluk Asmara"
  },
  {
    latitude: -7.29234577,
    longitude: 112.71901103, 
    name: "Pantai Sendiki"
  },
  {
  latitude: -6.893190,
  longitude: 112.468150,
  name: "Pantai Delegan"
  },
  {
    latitude: -8.28269,
    longitude: 111.93862,
    name: "Pantai Sine"
  },
  {
    latitude: -7.55182,
    longitude: 111.73933,
    name: "Air Terjun Sedudo"
  },
  {
    latitude: -8.22508,
    longitude: 112.93351,
    name: "Air Terjun Tumpak Sewu"
  }
];

const MapScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSearch = name => {
    const foundLocation = locations.find(
      location => location.name.toLowerCase() === name.toLowerCase()
    );
    if (foundLocation) {
      setSelectedLocation(foundLocation);
    }
  };

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
        region={
          selectedLocation
            ? {
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : null
        }
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={text => setSearch(text)}
          placeholder="Search by name"
          onSubmitEditing={() => handleSearch(search)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    marginBottom: 30,
    padding: 10,
    //backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
  },
  mapView: {
    flex: 1,
  },
});

export default MapScreen;
