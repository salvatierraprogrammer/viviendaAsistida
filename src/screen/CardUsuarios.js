import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { vivienda } from '../data/vivienda';

const CardUsuarios = ({ paciente }) => {
  const formattedTimestamp = paciente.timestamp
    ? format(new Date(paciente.timestamp), 'yyyy-MM-dd HH:mm:ss')
    : '';

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{`Vivienda: ${item.nombre}`}</Text>
      <View style={styles.patientInfo}>
        <Text style={styles.patientInfoText}>{`Nombre: ${item.nombre}`}</Text>
        <Text style={styles.patientInfoText}>{`Edad: ${item.edad}`}</Text>
        <Text style={styles.patientInfoText}>{`Diagnóstico: ${item.diagnostico}`}</Text>
        {item.timestamp && (
          <View style={styles.dateTimeContainer}>
            <Text style={styles.patientInfoText}>{`Horario de Asistencia: ${formattedTimestamp}`}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        data={[paciente]}
        keyExtractor={(item) => item.id.toString()} // Replace with the actual unique key
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    width: '96%',
    alignSelf: 'center',
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  patientInfo: {
    marginBottom: 15,
  },
  patientInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default CardUsuarios;