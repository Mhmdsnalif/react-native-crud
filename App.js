import * as React from 'react';
import { View, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Peta from './components/peta';
import ListPeta from './components/listPeta';
import Front from './components/splash';
import Details from './components/details';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTab from './components/bottomTab'
//import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
      />
      <Stack.Screen 
       name="Dashboard" 
       component={BottomTab} 
     />
      <Stack.Screen 
       name="Peta" 
       component={Peta}  
     />
      <Stack.Screen 
       name="List Peta" 
       component={ListPeta} 
     />
      <Stack.Screen 
       name="Details" 
       component={Details} 
     />
    </Stack.Navigator>
    </NavigationContainer>
  );
}


const RootNavigator = createSwitchNavigator(
  {
    Splash: Front,
    Stack: MyStack,
    Tab: BottomTab,
    
  },
  {
    initialRouteName: "Splash",
  }
);

export default createAppContainer(RootNavigator);
