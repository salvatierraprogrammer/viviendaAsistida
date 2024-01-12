import React from 'react';
import AdminDashboard from '../screen/AdminDashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsuariosScreen from '../screen/UsuariosScreen';
import OperadoresScreen from '../screen/OperadoresScreen';
import DetailsOperador from '../screen/DetailsOperador';
import MapLoc from '../screen/MapLoc';
import ListAsistencia from '../screen/ListAsistencia';
import MapLocEntrada from '../screen/MapLocEntrada';
import DetailsUsuarios from '../screen/DetailsUsuarios';
import CardPlanFarmacologico from '../screen/CardPlanFarmacologico';
import DetailsPlanFarmacologico from '../screen/DetailsPlanFarmacologico';
import { useSelector } from 'react-redux';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase/firebase_auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

const RootNavigationAdmin = () => {
  const user = useSelector((state) => state.authSlice.user);
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

  return (
    <Stack.Navigator initialRouteName="AdminDashboard" >
    
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

export default RootNavigationAdmin;

