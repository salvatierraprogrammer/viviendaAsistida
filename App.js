import React from 'react';
import LoginScreen from './src/screen/LoginScreen';  // Corregí la ruta de importación
import AdminDashboard from './src/screen/AdminDashboard';
import SelectHouseScreen from './src/screen/SelectHouseScreen';
import ManageUsersScreen from './src/screen/ManageUsersScreen';
import HomeScreen from './src/screen/HomeScreen';
import SelectPatientsScreen from './src/screen/SelectPatientsScreen';
// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="SelectHouse" component={SelectHouseScreen} />
        <Stack.Screen name="SelectPatients" component={SelectPatientsScreen} />
        <Stack.Screen name="ManageUsers" component={ManageUsersScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;