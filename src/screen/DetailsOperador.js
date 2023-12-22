import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardDetailsOperador from './CardDetailsOperador';
import OpcionesOperador from './OpcionesOperador';

const DetailsOperador = ({ route }) => {
  const { userData } = route.params;

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
    // justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsOperador;