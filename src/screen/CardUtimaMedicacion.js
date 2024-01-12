import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CardUltimaMedicacion = ({ selectedPatient }) => {
  const navigation = useNavigation();

  // Function to get the last medication record for the selected patient
  function getLastMedicationRecord() {
    const { registroMedicacion } = selectedPatient;

    if (!registroMedicacion || registroMedicacion.length === 0) {
      return null;
    }

    const sortedRecords = registroMedicacion.sort((a, b) => {
      const dateA = new Date(`${a.fecha} ${a.hora}`);
      const dateB = new Date(`${b.fecha} ${b.hora}`);
      return dateB - dateA;
    });

    return sortedRecords[0] || null;
  }

  const lastMedicationRecord = getLastMedicationRecord();
  

  if (!lastMedicationRecord) {
    return (
      <View style={styles.container}>
        <Text>No hay registros de medicación para este paciente.</Text>
      </View>
    );
  }

  const { hora, responsable, imagen } = lastMedicationRecord;
  const handlePress = () => {
    navigation.navigate('DetailsUltimaMEd', {
      selectedPatient: selectedPatient, // Puedes pasar más información si es necesario
    });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
    >
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Última medicación:</Text>
            <Text style={styles.patientInfoText}>{`Hora: ${hora}`}</Text>
            <Text style={styles.patientInfoText}>{`Responsable: ${responsable}`}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imagen }}
              style={styles.image}
              resizeMode="cover"
              onError={(error) => console.error('Error loading image:', error)}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 16,
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  patientInfoText: {
    marginBottom: 4,
  },
  imageContainer: {
    marginLeft: 16,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 10,
  },
});

export default CardUltimaMedicacion;