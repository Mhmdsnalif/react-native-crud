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
import React, { useState, useEffect } from 'react';
import 'firebase/firestore';
import firebase from '../database/firebase';
import COLORS from "./color";
import { deleteDoc, doc } from "firebase/firestore";

function DetailPesan ({navigation, route}){
    const place = route.params;
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsubscribe = firebase
          .firestore()
          .collection('pesan')
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

      const handleDelete = (id) => {
        firebase
            .firestore()
            .collection("pesan")
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert(
                "Success",
                "Data berhasil dihapus",
                [{ text: "OK"}],
                { cancelable: false }
                );
            })
            .catch(error => {
                console.error("Error removing document: ", error);
                Alert.alert(
                "Error",
                "Data gagal dihapus",
                [{ text: "OK" }],
                { cancelable: false }
                );
        });
      };

      return(
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <StatusBar translucent backgroundColor={COLORS.primary} />
        
        <View style = {styles.container}>
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
      {data.map((data) => (
          <View style={styles.item} key={data.id}>
            <View style={styles.teks}>
                <Text style={{fontSize: 20}}>ID: {data ? data.id : ''}</Text>
                <Text style={{fontSize: 20}}>Nama: {data ? data.nama : ''}</Text>
                <Text style={{fontSize: 20}}>Jumlah Tiket: {data ? data.jumlah : ''}</Text>
            </View>
            <View>
                
                <TouchableOpacity style={styles.iconContainer} onPress={handleDelete}>
                    <MaterialIcons name="cancel" size={35} color={COLORS.red} />
                </TouchableOpacity>
            </View>
          </View>
        ))}
    </View>
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