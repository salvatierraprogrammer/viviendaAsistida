import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CardUsuarios from './CardUsuarios';
import CardPlanFarmacologico from './CardPlanFarmacologico';
import CardUltimaMedicacion from './CardUtimaMedicacion';

const DetailsUsuarios = ({ route }) => {
  const { paciente } = route.params;
  const  selectedPatient  = paciente;

  return (
    <SafeAreaView  style={styles.container}>
      <CardUsuarios paciente={paciente} />
  
      <CardPlanFarmacologico  paciente={paciente}/>
      <CardUltimaMedicacion style={styles.medicacion} selectedPatient={selectedPatient} />
    </SafeAreaView>
  );
};

export default DetailsUsuarios;

const styles = StyleSheet.create({
  container: {

    flex: 1,
    
  },
  medicacion:{
    marginBottom: 100,
    backgroundColor: "blue",
  },
});