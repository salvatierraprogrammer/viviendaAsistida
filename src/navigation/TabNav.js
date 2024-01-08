  import { StyleSheet, Text, View } from 'react-native'
  import React from 'react'
  import RootNavigation from './RootNavigation';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { Entypo } from '@expo/vector-icons'; 
  import { Ionicons } from '@expo/vector-icons'; 
  import { AntDesign } from '@expo/vector-icons'; 
  import { MaterialCommunityIcons } from '@expo/vector-icons'; 
  import PerfileScreen from '../screen/PerfileScreen';
  import { useNavigationState } from '@react-navigation/native';


  const Tab = createBottomTabNavigator(); // Define Tab here

  const TabNav = () => {
    const navigationState = useNavigationState((state) => state);
  
    // Asegúrate de que navigationState esté definido y tenga las propiedades necesarias
    const currentRoute = navigationState?.routes?.[navigationState?.index]?.name || null;
  
    // Lista de rutas que deben ocultar la barra de pestañas
    const routesToHideTabBar = ['SelectHouse', 'SelectPatients', 'ManageUsers'];
  
    return (
      <Tab.Navigator
        screenOptions={{
          title: "",
          headerShown: false,
          tabBarVisible: !routesToHideTabBar.includes(currentRoute),
        }}
      >
        <Tab.Screen
          name="rootNavigation"
          component={RootNavigation}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name="clipboard-list-outline" size={24} color={focused ? 'blue' : 'black'} />
            ),
          }}
        />
        <Tab.Screen
          name="PerfileScreen"
          component={PerfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name="account-circle" size={24} color={focused ? 'blue' : 'black'} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  
  export default TabNav;