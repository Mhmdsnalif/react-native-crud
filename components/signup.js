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
        //cek email pada database
        const db = firebase.firestore();
        db.collection('register')
            .where('email', '==', email)
            .get()
            .then((snapshot) => {
                if (!snapshot.empty){
                    Alert.alert('Masukkan Email Yang Terdaftar');
                    return;
                }

                //jika email belum terdaftar, add data
                db.collection('register')
                    .add({
                        name,
                        email,
                        password,
                    })
                    .then(() => {
                        //jika login berhasil maka masuk halaman login
                        navigation.navigate('Login')
                    })
                    //jika gagal add data akan muncul error
                    .catch((error) => {
                        setError(error.message);
                    })
            })
            .catch((error) => {
                //jika mengambil data gagal, akan tampil error
                setError(error.message);
            })
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