import React, { useState } from 'react';
import 'firebase/firestore';
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import firebase from '../database/firebase';

signUp = ({navigation}) =>{
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (email === '') {
            Alert.alert('Error', 'Email kosong');
          } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            Alert.alert('Error', 'Masukan Email yang Valid');
          } else {
            firebase
              .firestore()
              .collection('register')
              .where('email', '==', email)
              .get()
              .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                  Alert.alert('Error', 'Email Sudah Terdaftar');
                    setName('');
                    setEmail('');
                    setPassword('');
                } else {
                  firebase
                    .firestore()
                    .collection('register')
                    .add({
                      name,
                      email,
                      password,
                    })
                    .then(() => {
                        setName('');
                        setEmail('');
                        setPassword('');
                        navigation.navigate('Login');
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
    };

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.inputStyle}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                color="#3740FE"
                title="Signup"
                onPress={handleRegister}
            />
            {error ? <Text>{error}</Text> : null}
            <Text 
                style={styles.loginText}
                onPress={() => navigation.navigate('Login')}>
                Sudah Memiliki Akun? Click here to login
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
      },
      inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
      },
      loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
      }
})

export default signUp;