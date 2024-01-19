import React from 'react';
import { StyleSheet } from 'react-native';
import LoginScreen from '../screen/LoginScreen';  // Adjusted the import statement
import AdminDashboard from '../screen/AdminDashboard';
import SelectHouseScreen from '../screen/SelectHouseScreen';
import ManageUsersScreen from '../screen/ManageUsersScreen';
import HomeScreen from '../screen/HomeScreen';
import SelectPatientsScreen from '../screen/SelectPatientsScreen';
import DetailsPlanFarma from '../screen/DetailsPlanFarma';
import DetailsUltimaMEd from '../screen/DetailsUltimaMEd';
import FinalizarJornada from '../screen/FinalizarJornada';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistreScreen from '../screen/RegistreScreen';
import UsuariosScreen from '../screen/UsuariosScreen';
import OperadoresScreen from '../screen/OperadoresScreen';
import DetailsOperador from '../screen/DetailsOperador';
import MapLoc from '../screen/MapLoc';
import ListAsistencia from '../screen/ListAsistencia';
import MapLocEntrada from '../screen/MapLocEntrada';
import DetailsUsuarios from '../screen/DetailsUsuarios';
import CardPlanFarmacologico from '../screen/CardPlanFarmacologico';
import DetailsPlanFarmacologico from '../screen/DetailsPlanFarmacologico';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebase_auth, app } from '../firebase/firebase_auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  
  const [fetchedUserData, setFetchedUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('fetchedUserData');
        const parsedUserData = JSON.parse(storedUserData);
        setFetchedUserData(parsedUserData);
  
        // Obtener la información del usuario de Firestore
        const db = getFirestore(app);
        const userDoc = doc(db, 'usuarios', parsedUserData.uid);
        const userSnapshot = await getDoc(userDoc);
  
        if (userSnapshot.exists()) {
          const userDataFromFirestore = userSnapshot.data();
          
          // Almacena los detalles del usuario en AsyncStorage
          await AsyncStorage.setItem('userDetails', JSON.stringify(userDataFromFirestore));
  
          // También podrías setear los detalles del usuario en el estado si es necesario
          setUserDetails(userDataFromFirestore);
        } else {
          console.warn('User does not exist in Firestore');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    fetchUserData();
  }, []);

  const { userRole } = fetchedUserData || {};
  // Verifica si el usuario existe y tiene el rol 2
   console.log("Rol del usuario: ", userRole);
  return (
    <Stack.Navigator initialRouteName="home" >
      {/*Despues de login si es rol 2*/}
      {/* Rol: 2 operador  */}
      {/* <Stack.Screen name="AdminDashboard" component={AdminDashboard} /> */}
      <Stack.Screen
      name="SelectHouse"
      component={SelectHouseScreen}
      options={{ headerShown: false, tabBarVisible: false }}
      screenOptions={{
         tabBarVisible: false
      }}
    />
    <Stack.Screen
      name="SelectPatients"
      component={SelectPatientsScreen}
      options={{ headerShown: false, tabBarVisible: false }}
    />
    <Stack.Screen
      name="ManageUsers"
      component={ManageUsersScreen}
      options={{ headerShown: false, tabBarVisible: false }}
    />

    

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerLeft: null, headerShown: false, tabBarVisible: false }}
       
      />
      <Stack.Screen name="DetailsPlanFarma" component={DetailsPlanFarma} />
      <Stack.Screen name="DetailsUltimaMEd" component={DetailsUltimaMEd} />
      <Stack.Screen name="FinalizarJornada" component={FinalizarJornada} />

      {/* Rol: 1 Admin */}
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name='UsuariosScreen' component={UsuariosScreen} />
      <Stack.Screen name='OperadoresScreen' component={OperadoresScreen} />
      <Stack.Screen name='DetailsOperador' component={DetailsOperador} />
      <Stack.Screen name='MapLoc' component={MapLoc} />
      <Stack.Screen name='ListAsistencia' component={ListAsistencia} />
      <Stack.Screen name='MapLocEntrada' component={MapLocEntrada} />
      <Stack.Screen name='DetailsUsuarios' component={DetailsUsuarios}/>
      <Stack.Screen name='CardPlanFarmacologico' component={CardPlanFarmacologico}/>
      <Stack.Screen name='DetailsPlanFarmacologico' component={DetailsPlanFarmacologico}/>
      
    
     

    </Stack.Navigator>
  );
};

export default RootNavigation;

