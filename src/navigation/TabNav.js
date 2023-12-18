import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootNavigation from './RootNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import PerfileScreen from '../screen/PerfileScreen';

const Tab = createBottomTabNavigator(); // Define Tab here


const TabNav = () => {
  return (
    <Tab.Navigator screenOptions={{ title: "", headerShown: false }}>
      <Tab.Screen 
        options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="clipboard-list-outline" size={24} color="black" /> }}
        name="rootNavigation" 
        component={RootNavigation} 
      />
      <Tab.Screen 
        name="PerfileScreen" 
        options={{ 
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="account-circle" size={24} color={focused ? 'blue' : 'black'} />,
        }}
        component={PerfileScreen} // Replace 'ProfileScreen' with the actual component for your profile screen
      />
    </Tab.Navigator>
  );
};

export default TabNav;