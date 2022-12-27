import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import 'firebase/firestore';
import firebase from '../database/firebase';

function ListPeta() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('locations')
      .get()
      .then((querySnapshot) => {
        const updatedLocations = [];
        querySnapshot.forEach((doc) => {
          updatedLocations.push({
            id: doc.id,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            time: doc.data().time,
          });
        });
        setLocations(updatedLocations);
      });
    return () => unsubscribe();
  }, []);

  return (
    <View style = {styles.container}>
      {locations.map((location) => (
          <View style={styles.item} key={location.id}>
            <Text>ID: {location.id}</Text>
            <Text>Latitude: {location.latitude}</Text>
            <Text>Longitude: {location.longitude}</Text>
            <Text>Current Time: {location.time}</Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
})

export default ListPeta;
