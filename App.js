import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer, createSwitchNavigator} from "react-navigation";
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Peta from './components/peta';
import ListPeta from './components/listPeta';
import Front from './components/splash';
import { NavigationContainer } from '@react-navigation/native';

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
       component={Dashboard} 
     />
      <Stack.Screen 
       name="Peta" 
       component={Peta}  
     />
      <Stack.Screen 
       name="List Peta" 
       component={ListPeta} 
     />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const RootNavigator = createSwitchNavigator(
  {
    Stack: MyStack,
    Splash: Front,
  },
  {
    initialRouteName: "Splash",
  }
);

export default createAppContainer(RootNavigator);
