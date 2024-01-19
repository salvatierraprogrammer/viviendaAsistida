import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import CardUltimaMedicacion from './CardUtimaMedicacion';
import CardBienvenida from './CardBienvenida';
import PlanFarmacologicoScreen from './PlanFarmacologicoScreen';
import CamaraScreen from './CamaraScreen';

const HomeScreen = ({ navigation, route }) => {
  
  const { selectedPatient } = route.params;
  const { assistanceDataToSend } = route.params;
    
    const renderItem = () => (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Datos del usuario:</Text>
        <View style={styles.patientInfo}>
          <Text style={styles.patientInfoText}>{`${selectedPatient.nombre}`}</Text>
          <Text style={styles.patientInfoText}>{`Edad: ${selectedPatient.edad}`}</Text>
          <Text style={styles.patientInfoText}>{`Diagnóstico: ${selectedPatient.diagnostico}`}</Text>
        </View>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[selectedPatient]}
        keyExtractor={(item) => (item && item.id ? item.id.toString() : null)}
        renderItem={renderItem}
        ListHeaderComponent={() => <CardBienvenida route={{ params: {  assistanceDataToSend} }} />}
        ListFooterComponent={() => (
          <>
      {/* <CamaraScreen/> */}
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
    marginTop: 20,
 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
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
    borderWidth: 2,
    borderColor: "#5fbcc0",
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
    flexDirection: 'column',
    marginBottom: 10,
  },
  dateTimeTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateTimeLabelText: {
    fontSize: 16,
    marginRight: 5,
    color: '#555', // Puedes ajustar el color según tus preferencias
  },
  dateTimeText: {
    fontSize: 16,
  },
});

export default HomeScreen;