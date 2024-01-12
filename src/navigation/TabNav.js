
  import React from 'react'
  import RootNavigation from './RootNavigation';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { Entypo } from '@expo/vector-icons'; 
  import { Ionicons } from '@expo/vector-icons'; 
  import { AntDesign } from '@expo/vector-icons'; 
  import { MaterialCommunityIcons } from '@expo/vector-icons'; 
  import PerfileScreen from '../screen/PerfileScreen';
  import HomeScreen from '../screen/HomeScreen';
  import { useNavigationState } from '@react-navigation/native';


  const Tab = createBottomTabNavigator(); // Define Tab here

  const TabNav = () => {
    const navigationState = useNavigationState((state) => state);
  

  
    return (
      <Tab.Navigator
        screenOptions={{
          title: "",
          headerShown: false,
         
        }}
      >
        <Tab.Screen
          name="HomeScreen"
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