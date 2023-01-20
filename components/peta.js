import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, Button, Alert, SafeAreaView, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import 'firebase/firestore';
import firebase from '../database/firebase';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from "expo-constants";
import { format } from 'date-fns';
import COLORS from "./color";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
 
Peta = () =>{
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');
    const [markerCoordinates, setMarkerCoordinates] = useState({
        latitude: 0,
        longitude: 0,
      });
    const currentTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    
    useEffect(() => {
        (async () => {
          let { status } = await Permissions.askAsync(Permissions.LOCATION);
          if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          setMarkerCoordinates({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
    
          // Mulai mengambil lokasi secara periodik setiap 5 detik
          const locationInterval = setInterval(async () => {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setMarkerCoordinates({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
          }, 5000);
    
          return () => {
            // Hentikan pengambilan lokasi secara periodik saat komponen di-unmount
            clearInterval(locationInterval);
          };
        })();
      }, []);
      
    const handleSimpan = () =>{
        const db = firebase.firestore();
        db.collection('locations')
            .add({
                latitude: markerCoordinates.latitude,
                longitude: markerCoordinates.longitude,
                time: currentTime,
            })
            .then(() =>{
                Alert.alert("Lokasi Berhasil Disimpan")
            })
            .catch(() => {
                //tampilkan error jika tidak berhasil simpan
                setError(error.message);
            });
    };

    return(
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)" }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.header}>
          <AntDesign
            name="left"
            size={28}
            color={COLORS.white}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <MaterialIcons name="more-vert" size={28} color={COLORS.white} />
        </View>
        <View style={styles.container}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                latitude: markerCoordinates.latitude,
                longitude: markerCoordinates.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={true}
            >
                <Marker
                     coordinate={markerCoordinates}
                     title="My Location"
                     description={`Latitude: ${markerCoordinates.latitude}, Longitude: ${markerCoordinates.longitude}`}
                />
            </MapView>
            <View style={styles.tombol}>
                <Button color="#3740FE" title="Simpan" onPress={handleSimpan}/>
            </View>
            
            {error ? <Text>{error}</Text> : null}
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        //padding: 35,
        backgroundColor: '#fff'
      },
    map: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
    },
    header: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "rgba(0,0,0,0)"
      //backgroundColor: COLORS.primary,
    },
  });

export default Peta;
