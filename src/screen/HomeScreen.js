import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import PlanFarmacologicoScreen from './PlanFarmacologicoScreen';
import CardUltimaMedicacion from './CardUtimaMedicacion';
import CardBienvenida from './CardBienvenida';
import { users } from '../data/users';

const HomeScreen = ({navigation, route }) => {
  const { userData } = route.params;
  const { lastName, firstName } = userData;
  console.log("Nombre Home", lastName, firstName);
  const { patientData } = route.params;
  


  const formattedTimestamp = patientData.timestamp
    ? format(new Date(patientData.timestamp), 'yyyy-MM-dd HH:mm:ss')
    : '';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CardBienvenida userData={userData}  />
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Datos del paciente:</Text>
          <View style={styles.patientInfo}>
            <Text style={styles.patientInfoText}>{`Nombre: ${patientData.nombre}`}</Text>
            <Text style={styles.patientInfoText}>{`Edad: ${patientData.edad}`}</Text>
            <Text style={styles.patientInfoText}>{`Diagnóstico: ${patientData.diagnostico}`}</Text>
            {patientData.timestamp && (
              <View style={styles.dateTimeContainer}>
                <Text style={styles.patientInfoText}>{`Horario de Asistencia: ${formattedTimestamp}`}</Text>
              </View>
            )}
         
          </View>
        </View>
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
  
});

export default HomeScreen;