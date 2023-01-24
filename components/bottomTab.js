import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './dashboard';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Peta from './peta';
import DetailPesan from './detailPesan';
import COLORS from './color';
import Profile from './profile';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    initialRouteName="Dashboard"
    activeTintColor={COLORS.primary}
    inactiveTintColor="#858585"
    >
      <Tab.Screen name="Dashboard" 
      component={Dashboard}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons 
            name="home-outline" 
            size={34}
            color={focused ? COLORS.primary : "#858585"}/>
        ),
        tabBarShowLabel: false,
        headerShown: null,
      }} />
      <Tab.Screen name="Ticket" component={DetailPesan} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <FontAwesome name="ticket" size={34} 
          color={focused ? COLORS.primary : "#858585"}/>
        ),
        tabBarShowLabel: false,
        headerShown: null,
      }} />
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <FontAwesome name="user-circle-o" size={34} 
          color={focused ? COLORS.primary : "#858585"}/>
        ),
        tabBarShowLabel: false,
        headerShown: null,
      }} />
    </Tab.Navigator>
  );
}

function ProfileKu() {
  return (
    <View>
      <Text>Halaman Profile</Text>
    </View>
  );
}

function About() {
  return (
    <View>
      <Text>About Screen</Text>
    </View>
  );
}

export default MyTabs;