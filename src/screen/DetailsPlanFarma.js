import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DetailsPlanFarma = ({ route }) => {
  const { selectedPatient, horaMedicacion } = route.params;

  if (!selectedPatient || !selectedPatient.planFarmacologico) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Detalles de Medicación</Text>
        <Text>Error: Datos del paciente no disponibles</Text>
      </View>
    );
  }

  const medicacion = selectedPatient.planFarmacologico[horaMedicacion];

  if (!medicacion) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Detalles de Medicación</Text>
        <Text>Error: Medicación no disponible para la hora seleccionada</Text>
      </View>
    );
  }

  // Separar las medicaciones en una lista
  const listaMedicaciones = medicacion.split(',').map((item, index) => {
    const medicacionDetalle = item.trim().split('-');
    const medicacionText = medicacionDetalle.slice(1).map((med) => med.trim()).join('\n- ');

    return (
      <View key={index} style={styles.medicationItem}>
        <Text style={styles.medicationTime}>{`${medicacionDetalle[0]}`}</Text>
        <MaterialCommunityIcons name="pill" size={20} color="#555" style={styles.icon} />
        <Text>{medicacionText}</Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{`Detalles de Medicación - ${paciente.nombre}`}</Text> */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Datos del Paciente:</Text>
        <Text>{`Nombre: ${selectedPatient.nombre}`}</Text>
        <Text>{`Edad: ${selectedPatient.edad}`}</Text>
        <Text>{`Diagnóstico: ${selectedPatient.diagnostico || 'No especificado'}`}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{`Medicación a las ${horaMedicacion}:`}</Text>
        {listaMedicaciones}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  medicationTime: {
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
  },
});

export default DetailsPlanFarma;