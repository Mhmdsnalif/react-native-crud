import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, Image, Alert } from 'react-native';
import COLORS from './color';
import 'firebase/firestore';
import firebase from '../database/firebase';

const Pesan = ({ isVisible, onClose }) => {
  const [nama, setNama] = useState('');
  const [jumlah, setJumlah] = useState(0);


  const handlePesan = () =>{
    const db = firebase.firestore();
    db.collection("pesan").add({
        nama,
        jumlah,
        userId: firebase.auth().currentUser.uid
    })
    .then(function(docRef) {
        Alert.alert(
            'Success',
            'Terima Kasih Sudah Pesan Tiket',
            [
                {text: 'OK', onPress: () => onClose()},
            ],
            {cancelable: false},
        );
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        Alert.alert(
            'Error',
            'Data gagal disimpan',
            [
                {text: 'OK', onPress: () => onClose()},
            ],
            {cancelable: false},
        );
    });
  }

  return (
    <Modal visible={isVisible} animationType='slide' transparent={true} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ width: '65%', height: '40%', backgroundColor: 'white',  padding: 20, borderRadius: 10, elevation: 10, justifyContent: 'space-between'}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{
                width: 206, height: 65,
              }} source={require("../media/logo.png")} alt='logo'/>
          </View>
          <View >
            <Text style={{ fontWeight: 'bold', marginRight: 10, fontSize: 20 }}>Nama:</Text>
            <TextInput
              value={nama}
              onChangeText={(text) => setNama(text)}
              style={{ borderBottomColor: 'black', borderBottomWidth: 1, padding: 5, width: '100%' }}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold', marginRight: 10, fontSize: 20 }}>Jumlah tiket:</Text>
            <TextInput
              value={jumlah}
              onChangeText={(text) => setJumlah(text)}
              keyboardType='numeric'
              style={{ borderBottomColor: 'black', borderBottomWidth: 1, padding: 5, width: '100%' }}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button
              title="Pesan"
              color={COLORS.primary}
              onPress={
                handlePesan
                //onClose();
              }
            />
            <Button
              title="cancel"
              color={COLORS.primary}
              onPress={() => {
                onClose()
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};


export default Pesan;