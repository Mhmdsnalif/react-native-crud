import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import 'firebase/firestore';
import firebase from '../database/firebase';
import React, { useState, useEffect } from 'react';
import COLORS from './color';
import { AntDesign } from '@expo/vector-icons';


export default Profile = () => {

    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const unsubscribe = firebase
          .firestore()
          .collection('register')
          .where('name', '==', name )
          .where('email', '==', email)
          .get()
          .then((querySnapshot) => {
            const updatedDetails = [];
            querySnapshot.forEach((doc) => {
              updatedDetails.push({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                password: doc.data().password
              });
            });
            setData(updatedDetails);
          });
        return () => unsubscribe();
      }, []);

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <StatusBar translucent backgroundColor={COLORS.primary} />
        
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
          <View
          style={{
            backgroundColor: COLORS.primary,
            height: 120,
            paddingHorizontal: 20,
          }}
        >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.avatar}
                    source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
      />
            </View>
        </View>
        <View style={styles.cont}>
      {data.map((data) => (
          <View style={styles.item} key={data.id}>
            <View style={styles.teks}>
                <Text style={{fontSize: 20}}>Nama: {data ? data.name : ''}</Text>
                <Text style={{fontSize: 20}}>Email: {data ? data.email : ''}</Text>
            </View>
          </View>
        ))}
        </View>
    
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.primary,
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
    inputContainer: {
        height: 60,
        width: "100%",
        backgroundColor: COLORS.white,
        borderRadius: 10,
        position: "absolute",
        top: 90,
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
        elevation: 12,
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 70,
      },
      cont: {
        marginTop: 140
      }
})

                                            