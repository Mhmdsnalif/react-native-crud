import { StyleSheet, Button, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar, TextInput } from 'react-native'
import 'firebase/firestore';
import firebase from '../database/firebase';
import React, { useState, useEffect, Component } from 'react';
import COLORS from './color';
import { AntDesign } from '@expo/vector-icons';


export default class Profile extends Component{
  
  constructor(){
    super();
    this.state = {
      uid: '',
      //displayName: '',
      //email: '',
      //password: ''
      password: '',
      newPassword: ''
    };
  }
  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  updatePassword = () => {
    const user = firebase.auth().currentUser;
    const { newPassword } = this.state;

    user.updatePassword(newPassword)
      .then(() => {
        console.log("Password updated!");
      })
      .catch(error => {
        console.log(error.message);
      });
  }


  render(){
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
      uid: firebase.auth().currentUser.uid
    }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <StatusBar translucent backgroundColor={COLORS.primary} />
        
        <View style={styles.header}>
          <AntDesign
            name="left"
            size={28}
            color={COLORS.white}
            onPress={() => {
              this.props.navigation.goBack();
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
      
          <View style={styles.item}>
            <View style={styles.teks}>
                <Text style={{fontSize: 20}}>Nama: {this.state.displayName}</Text>
                
                
            </View>
          </View>
          <View style={styles.item}>
              <Text style={{fontSize: 20}}>Email: {this.state.email}</Text>
            </View>
{/*}
            <View style={styles.item}>
              <Text style={{fontSize: 20}}>Update Password:</Text>
              <TextInput
                secureTextEntry={true}
                placeholder="New password"
                onChangeText={newPassword => this.setState({ newPassword })}
                value={this.state.newPassword}
              />
              <Button
              title='Konfirmasi'
                onPress={() => this.updatePassword()}
                bgColor="#00C9B1"
                />
                </View>
        {*/}
    
            <View style={styles.tombol}><Button
                onPress={() => this.signOut()}
                bgColor="#00C9B1"
                shadow={3}
                width = {300}
                title= "Keluar"
                style={{width: "80%", height: 100, fontSize: 20}}
            >Keluar</Button>
            </View>
            
        </View>
    
        </SafeAreaView>
    )
  }
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
        flex: 1,
        flexDirection: 'column',
        marginTop: 140
      },
      tombol: {
        marginTop: 100,
        paddingLeft: 20,
        paddingRight: 20,
        
      }
})

                                            