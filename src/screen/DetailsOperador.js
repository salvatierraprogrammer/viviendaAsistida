import React from 'react';
import { View, StyleSheet } from 'react-native';
import CardDetailsOperador from './CardDetailsOperador';
import OpcionesOperador from './OpcionesOperador';

const DetailsOperador = ({ route }) => {
  const { userData } = route.params;

  console.log("Datos operador:", userData);

  if (userData.asistencia) {
    const { fechaIngreso, ubicacionIngreso } = userData.asistencia;
    console.log('Fecha de ingreso:', fechaIngreso);
    console.log('Ubicación de ingreso:', ubicacionIngreso);
  } else {
    console.log('El usuario no tiene datos de asistencia.');
  }

  return (
    <View style={styles.container}>
      <CardDetailsOperador userData={userData} />
      <OpcionesOperador />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default DetailsOperador;