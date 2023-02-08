import {
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect, useCallback } from 'react';
import 'firebase/firestore';
import firebase from '../database/firebase';
import COLORS from "./color";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { RefreshControl } from "react-native";

function DetailPesan ({navigation, route}){
    
  const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const user = firebase.auth().currentUser;
      const unsubscribe = firebase
        .firestore()
        .collection('pesan')
        .where("userId", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          const updatedDetails = [];
          querySnapshot.forEach((doc) => {
            updatedDetails.push({
              id: doc.id,
              nama: doc.data().nama,
              jumlah: doc.data().jumlah,
            });
          });
          setData(updatedDetails);
        });
      return () => unsubscribe();
    }, []);
  
    const deleteData = (id) => {
      firebase.firestore().collection('pesan').doc(id).delete()
      .then(() => {
        console.log('Data deleted successfully');
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Error deleting data: ', error);
      });
    }
  
    const showConfirmDialog = (id) => {
      Alert.alert(
        'Confirm',
        'Apakah anda yakin ingin membatalkan pesanan ?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => deleteData(id),
          },
        ],
        { cancelable: false },
      );
    };
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      const user = firebase.auth().currentUser;
      const unsubscribe = firebase
        .firestore()
        .collection('pesan')
        .where("userId", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          const updatedDetails = [];
          querySnapshot.forEach((doc) => {
            updatedDetails.push({
              id: doc.id,
              nama: doc.data().nama,
              jumlah: doc.data().jumlah,
            });
          });
          setData(updatedDetails);
          setRefreshing(false);
        });
      return () => unsubscribe();
    }, [refreshing]);
    
    useEffect(() => {
      onRefresh();
    }, []);
    
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <StatusBar translucent backgroundColor={COLORS.primary} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <AntDesign
                name="left"
                size={28}
                color={COLORS.white}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </View>
            {data.map((data) => (
              <View style={styles.item} key={data.id}>
                <View style={styles.teks}>
                  <Text style={{ fontSize: 20 }}>ID: {data ? data.id : ''}</Text>
                  <Text style={{ fontSize: 20 }}>Nama: {data ? data.nama : ''}</Text>
                  <Text style={{ fontSize: 20 }}>Jumlah Tiket: {data ? data.jumlah : ''}</Text>
                </View>
                <View>
                  <TouchableOpacity style={styles.iconContainer} onPress={() => showConfirmDialog(data.id)}>
                    <MaterialIcons name="cancel" size={35} color={COLORS.red} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      //justifyContent: 'center'
    },
    item: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#f9f9f9',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
        
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.primary,
      },
      iconContainer: {
        marginRight: 10
      }
  })

export default DetailPesan;