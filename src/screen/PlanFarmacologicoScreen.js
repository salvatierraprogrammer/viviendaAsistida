import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlanFarmacologicoScreen = ({ route }) => {
  const { paciente } = route.params;

  const getCurrentTime = () => {
    const now = new Date();
    const offset = -3 * 60; // GMT offset en minutos
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const localTime = new Date(utc + offset * 60000);
  
    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();
    console.log(`Current Time: ${hours}:${minutes}`);
    return `${hours}:${minutes}`;
  };
  
  const compareTimes = (currentTime, medicationTime) => {
    const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
    const [medicationHours, medicationMinutes] = medicationTime.split(':').map(Number);
  
    const currentTotalMinutes = currentHours * 60 + currentMinutes;
    const medicationTotalMinutes = medicationHours * 60 + medicationMinutes;
  
    if (currentTotalMinutes > medicationTotalMinutes) {
      console.log('Past Medication Time');
      return 'past'; // La hora de medicación ya pasó
    } else if (currentTotalMinutes === medicationTotalMinutes) {
      console.log('Current Medication Time');
      return 'current'; // Estamos en la hora de medicación actual
    } else {
      console.log('Future Medication Time');
      return 'future'; // La hora de medicación es en el futuro
    }
  };

  const renderMedication = (hour, medication, backgroundColor) => {
    return (
      <View style={[styles.medicationItem, { backgroundColor }]} key={hour}>
        <Text>{`${hour}: ${medication}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Medicación de ${paciente.nombre}`}</Text>
      {paciente.planFarmacologico && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Plan Farmacológico:</Text>
          {renderMedication('Mañana', paciente.planFarmacologico.manana, compareTimes(getCurrentTime(), paciente.planFarmacologico.manana))}
          {renderMedication('Mediodía', paciente.planFarmacologico.mediodia, compareTimes(getCurrentTime(), paciente.planFarmacologico.mediodia))}
          {renderMedication('Tarde', paciente.planFarmacologico.tarde, compareTimes(getCurrentTime(), paciente.planFarmacologico.tarde))}
          {renderMedication('Noche', paciente.planFarmacologico.noche, compareTimes(getCurrentTime(), paciente.planFarmacologico.noche))}
        </View>
      )}
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
  medicationItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default PlanFarmacologicoScreen;