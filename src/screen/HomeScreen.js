import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import PlanFarmacologicoScreen from './PlanFarmacologicoScreen';

const HomeScreen = ({ route }) => {
  const { patientData } = route.params;

  const handleTerminarHorario = () => {
    // Lógica para terminar el horario laboral
    console.log('Horario laboral terminado');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la pantalla de inicio</Text>
      {patientData && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Datos del paciente:</Text>
          <Text>{`Nombre: ${patientData.nombre}`}</Text>
          <Text>{`Edad: ${patientData.edad}`}</Text>
          <Text>{`Diagnóstico: ${patientData.diagnostico}`}</Text>
          {patientData.location && (
            <View>
              <Text>{`Ubicación: ${JSON.stringify(patientData.location)}`}</Text>
            </View>
          )}
          {patientData.timestamp && (
            <View>
              <Text>{`Horario de Asistencia: ${patientData.timestamp.toString()}`}</Text>
            </View>
          )}
          {/* Pressable para terminar el horario laboral */}
          <Pressable
            style={({ pressed }) => [
              styles.terminarHorarioButton,
              { backgroundColor: pressed ? 'red' : '#cc0000' },
            ]}
            onPress={handleTerminarHorario}
          >
            <Text style={{ color: 'white' }}>Terminar Jornada Laboral</Text>
          </Pressable>
        </View>
      )}
      
      {/* Renderizar el componente PlanFarmacologicoScreen */}
      <PlanFarmacologicoScreen route={{ params: { paciente: patientData } }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  terminarHorarioButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default HomeScreen;