import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { format } from 'date-fns';
import PlanFarmacologicoScreen from './PlanFarmacologicoScreen';
import CardUltimaMedicacion from './CardUtimaMedicacion';

const HomeScreen = ({ route }) => {
  const { patientData } = route.params;

  const handleTerminarHorario = () => {
    console.log('Horario laboral terminado');
  };

  const formattedTimestamp = patientData.timestamp
    ? format(new Date(patientData.timestamp), 'yyyy-MM-dd HH:mm:ss')
    : '';
    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {patientData && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Datos del paciente:</Text>
            <View style={styles.patientInfo}>
              <Text style={styles.patientInfoText}>{`Nombre: ${patientData.nombre}`}</Text>
              <Text style={styles.patientInfoText}>{`Edad: ${patientData.edad}`}</Text>
              <Text style={styles.patientInfoText}>{`Diagnóstico: ${patientData.diagnostico}`}</Text>
              {/* {patientData.location && (
                <Text style={styles.patientInfoText}>{`Ubicación: ${JSON.stringify(patientData.location)}`}</Text>
              )} */}
              {patientData.timestamp && (
                <View style={styles.dateTimeContainer}>
                  <Text style={styles.patientInfoText}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.terminarHorarioButton,
                        { backgroundColor: pressed ? 'red' : '#cc0000' },
                      ]}
                      onPress={handleTerminarHorario}
                    >
                      <Text style={styles.buttonText}>{`Horario de Asistencia: ${formattedTimestamp}`}</Text>
                    </Pressable>
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
        <CardUltimaMedicacion />
        <PlanFarmacologicoScreen route={{ params: { paciente: patientData } }} />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    width: '100%',
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
  terminarHorarioButton: {
    marginTop: 1,
    marginLeft: 10,
    padding: 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;