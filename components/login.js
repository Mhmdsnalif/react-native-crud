import React, { useState } from "react";
import 'firebase/firestore';
import firebase from '../database/firebase';
import { StyleSheet, Text, Alert } from "react-native";
import { VStack, NativeBaseProvider, Input, Stack, Icon, Pressable, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

Login = ({navigation}) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = React.useState(false);

    const handleLogin = () =>{

            if (email === '') {
                Alert.alert('Error', 'Email Kosong');
              } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                Alert.alert('Error', 'Masukkan Email yang Valid');
              } else {
                firebase
                  .firestore()
                  .collection('register')
                  .where('email', '==', email)
                  .where('password', '==', password)
                  .get()
                  .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        Alert.alert('Error', 'Email or password Salah');
                    } else {
                        setEmail('');
                        setPassword('');
                        navigation.navigate('Dashboard');
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
        
    };

    return(
          <NativeBaseProvider> 
            <VStack style={styles.container}>
              <Stack style={styles.contText}>
                <Text style={{
                  color: "#00C9B1",
                  fontWeight: 'bold',
                  fontSize: 44,
                  }}>
                  Welcome 
                </Text>
                <Text style={{
                  color: "#00C9B1",
                  fontWeight: 'bold',
                  fontSize: 44,
                  }}>
                  To <Text style={{color: "#000000", fontWeight: 'bold',}}> MSTourism </Text>
                </Text>
              </Stack>

            <Stack space={4} w="100%" style={styles.inputStyle}>
              <Input w="100%"
              InputLeftElement=
              {<Icon as={<MaterialIcons name="person" />} 
              size={5} ml="2" color="#00C9B1" />}
              fontSize = {24}
              paddingLeft = {5}
              placeholder="Name" 
              variant= "underlined"
              onChangeText={setEmail} />

              <Input w="100%" 
              type={show ? "text" : "password"} 
              InputLeftElement=
              {<Icon as={<MaterialIcons name="https" />} 
              size={5} ml="2" color="#00C9B1" />}
              InputRightElement={<Pressable onPress={() => setShow(!show)}>
                    <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                  </Pressable>} 
                  placeholder="Password" 
                  variant= "underlined"
                  fontSize = {24}
                  paddingLeft = {5} 
                  onChangeText={setPassword}/>
                <Button
                onPress={handleLogin}
                bgColor="#00C9B1"
                shadow={3}
                marginTop={100}
            >Login</Button>
            <Text style={styles.loginText}>
                Belum Memiliki Akun? <Text onPress={() => navigation.navigate('Signup')} style={{color: '#3740FE'}}>Click here</Text>
            </Text>
            </Stack>
            </VStack>

          </NativeBaseProvider>
            
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
      contText: {
        flex: 1,
        marginTop: 140,
      },
      inputStyle: {
        flex: 2,
        marginTop: 150,
        marginBottom: 100,
      },
      loginText: {
        color: '#000',
        marginTop: 25,
        textAlign: 'center',
        fontSize: 16,
      }
})

export default Login;