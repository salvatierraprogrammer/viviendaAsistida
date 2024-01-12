import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { format } from 'date-fns';
import CardUltimaMedicacion from './CardUtimaMedicacion';
import CardBienvenida from './CardBienvenida';
import PlanFarmacologicoScreen from './PlanFarmacologicoScreen';
import CamaraScreen from './CamaraScreen';

const HomeScreen = ({ navigation, route }) => {
  
  const { selectedPatient } = route.params;



  const formattedTimestamp = selectedPatient && selectedPatient.timestamp
  ? format(new Date(selectedPatient.timestamp), 'yyyy-MM-dd HH:mm:ss')
  : '';


    const renderItem = () => (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Datos del paciente:</Text>
        <View style={styles.patientInfo}>
          <Text style={styles.patientInfoText}>{`Nombre: ${selectedPatient.nombre}`}</Text>
          <Text style={styles.patientInfoText}>{`Edad: ${selectedPatient.edad}`}</Text>
          <Text style={styles.patientInfoText}>{`Diagnóstico: ${selectedPatient.diagnostico}`}</Text>
          {selectedPatient.timestamp && (
            <View style={styles.dateTimeContainer}>
              <Text style={styles.patientInfoText}>{`Horario de Asistencia: ${formattedTimestamp}`}</Text>
            </View>
          )}
        </View>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
  data={[selectedPatient]}
  keyExtractor={(item) => (item && item.id ? item.id.toString() : null)}
  renderItem={renderItem}
  ListHeaderComponent={() => <CardBienvenida/>}
  ListFooterComponent={() => (
    <>
    <CamaraScreen/>
    <CardUltimaMedicacion selectedPatient={selectedPatient} />
    <PlanFarmacologicoScreen route={{ params: {  selectedPatient} }} />



    </>
  )}
/>
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
});

export default HomeScreen;