import React, { Component } from "react";
import 'firebase/firestore';
import firebase from '../database/firebase';
import { StyleSheet, Text, Alert, View, ActivityIndicator } from "react-native";
import { VStack, NativeBaseProvider, Input, Stack, Icon, Pressable, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      show: false,
      isLoading: false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  toggleShowPassword = () => {
    this.setState({ show: !this.state.show });
  };

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        //console.log(res)
        //console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Dashboard')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    } 
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
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')} />

              <Input w="100%" 
              type={this.state.show ? "text" : "password"} 
              InputLeftElement=
              {<Icon as={<MaterialIcons name="https" />} 
              size={5} ml="2" color="#00C9B1" />}
              InputRightElement={<Pressable onPress={this.toggleShowPassword}>
                    <Icon as={<MaterialIcons name={this.state.show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                  </Pressable>} 
                  placeholder="Password" 
                  variant= "underlined"
                  fontSize = {24}
                  paddingLeft = {5} 
                  value={this.state.password}
                  onChangeText={(val) => this.updateInputVal(val, 'password')}/>
                <Button
                onPress={() => this.userLogin()}
                bgColor="#00C9B1"
                shadow={3}
                marginTop={100}
            >Login</Button>
            <Text style={styles.loginText}>
                Belum Memiliki Akun? <Text onPress={() => this.props.navigation.navigate('Signup')} style={{color: '#3740FE'}}>Click here</Text>
            </Text>
            </Stack>
            </VStack>

          </NativeBaseProvider>
            
    )
    }
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
      },
      preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
      }
})

