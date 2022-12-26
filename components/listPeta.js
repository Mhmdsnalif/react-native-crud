import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

function liatPeta() {
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
    <View>
      {locations.map((location) => (
        <Text key={location.id}>{location.time}</Text>
      ))}
    </View>
  );
}

export default liatPeta;
