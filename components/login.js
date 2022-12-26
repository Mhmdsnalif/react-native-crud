import { useState } from "react";
import 'firebase/firestore';
import firebase from '../database/firebase';
import { View, StyleSheet, Button, Text, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { doc } from "firebase/firestore";

Login = ({navigation}) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () =>{
        const db = firebase.firestore();
        db.collection('register')
            .where('email', '==', email)
            .where('password', '==', password)
            .get()
            .then((snapshot) => {
                if(snapshot.empty){
                    Alert.alert('Isi dengan Benar');
                    return;
                }else{
                    navigation.navigate('Dashboard');
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return(
        <View style={styles.container}>
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
                title="Sigin"
                onPress={handleLogin}
            />
            {error ? <Text>{error}</Text> : null}
            <Text 
                style={styles.loginText}
                onPress={() => navigation.navigate('Signup')}>
                Belum Memiliki Akun? Click here to register
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

export default Login;