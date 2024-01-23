import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PerfileScreen from '../screen/PerfileScreen';
import RootNavigation from './RootNavigation';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        title: "",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="rootNavigation"
        component={RootNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="clipboard-list-outline" size={24} color={focused ? '#5fbcc0' : 'black'} />
          ),
        }}
      />
      <Tab.Screen
        name="PerfileScreen"
        component={PerfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="account-circle" size={24} color={focused ? '#5fbcc0' : 'black'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;