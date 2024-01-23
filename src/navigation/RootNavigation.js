import React from 'react';

import SelectHouseScreen from '../screen/SelectHouseScreen';
import ManageUsersScreen from '../screen/ManageUsersScreen';
import HomeScreen from '../screen/HomeScreen';
import SelectPatientsScreen from '../screen/SelectPatientsScreen';
import DetailsPlanFarma from '../screen/DetailsPlanFarma';
import DetailsUltimaMEd from '../screen/DetailsUltimaMEd';
import FinalizarJornada from '../screen/FinalizarJornada';
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


const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  
  
  return (
    <Stack.Navigator initialRouteName="home">
    <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerLeft: null, headerShown: false, tabBarVisible: false }}
      />
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
    
      <Stack.Screen name="DetailsPlanFarma" component={DetailsPlanFarma} />
      <Stack.Screen name="DetailsUltimaMEd" component={DetailsUltimaMEd} />
      <Stack.Screen name="FinalizarJornada" component={FinalizarJornada} />

      {/* Rol: 1 Admin */}
      {/* <Stack.Screen name="AdminDashboard" component={AdminDashboard} /> */}

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

