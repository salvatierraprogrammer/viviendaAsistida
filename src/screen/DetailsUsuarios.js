import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardUsuarios from './CardUsuarios';
import CardPlanFarmacologico from './CardPlanFarmacologico';

const DetailsUsuarios = ({ route }) => {
  const { paciente } = route.params;

  return (
    <View>
      {/* <Text>Detalles usuario</Text> */}
      {/* Pasa los datos del paciente a CardUsuarios */}
      
      <CardUsuarios paciente={paciente} />
      <CardPlanFarmacologico paciente={paciente}/>
    </View>
  );
};

export default DetailsUsuarios;

const styles = StyleSheet.create({});