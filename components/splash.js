import { Component } from "react";
import {Text} from "react-native";
import Constants from "expo-constants";
import { Image, VStack, Center, NativeBaseProvider } from "native-base";

export default class Front extends Component{
    
  componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate("Stack");
        }, 5000);
    }

    render(){
        return(
          <NativeBaseProvider bg="#00000">
            <VStack
              bg="#ffffff"
              flex="1"
              justifyContent={"center"}
              alignItems={"center"}
            >
          <Center>
            <Image style={{
                marginTop: Constants.statusBarHeight, width: 256, height: 95,
              }} source={require("../media/logo.png")} alt='logo'/>
          </Center>
        </VStack>
      </NativeBaseProvider>
        );
    }
}
