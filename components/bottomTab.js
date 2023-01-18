import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './dashboard';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Peta from './peta';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" 
      component={Dashboard}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name="home-outline" size={34} color="#00C9B1" />
        ),
        tabBarShowLabel: false,
        headerShown: null,
      }} />
      <Tab.Screen name="Ticket" component={Peta} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <FontAwesome name="ticket" size={34} color="#00C9B1" />
        ),
        tabBarShowLabel: false,
        headerShown: null,
      }} />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

export default MyTabs;