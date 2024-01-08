import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screen/LoginScreen';
import RegistreScreen from '../screen/RegistreScreen';

const Stack = createNativeStackNavigator()

const AuthNav  = () =>{

    return (
    
        <Stack.Navigator screenOptions={ { headerShown: false } }>
            <Stack.Screen name="login" component={LoginScreen} />
            {/* <Stack.Screen name="SelectHouse" component={SelectHouseScreen} options={{ headerShown: false, tabBarVisible: false }} />  */}
            <Stack.Screen name="registreScreen" component={RegistreScreen} />
        </Stack.Navigator>
    )
  }


export default AuthNav;