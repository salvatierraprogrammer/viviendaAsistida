import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { vivienda } from '../data/vivienda';

const SelectPatientsScreen = ({ route, navigation }) => {
  const { house } = route.params;
  const selectedHouse = vivienda.find((casa) => casa.nombre === house);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleSelectPatients = () => {
    // Puedes implementar la lógica para seleccionar los pacientes
    // y obtener la información necesaria antes de navegar a la siguiente pantalla.
    if (selectedPatient) {
      navigation.navigate('ManageUsers', { selectedPatient });
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={[
        styles.patientItem,
        selectedPatient === item && styles.selectedPatientItem,
      ]}
      onPress={() => handlePatientSelection(item)}
    >
      <Text>{`- ${item.nombre}`}</Text>
    </Pressable>
  );

  const handlePatientSelection = (selectedPatient) => {
    // Actualiza el estado con el paciente seleccionado
    setSelectedPatient(selectedPatient);
  };

  return (
    <View>
      <Text style={styles.houseTitle}>{`Pacientes de ${selectedHouse.nombre}`}</Text>
      <FlatList
        data={selectedHouse.pacientes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* Botones u opciones para seleccionar a los pacientes */}
      <Pressable
        style={styles.selectButton}
        onPress={handleSelectPatients}
      >
        <Text style={styles.selectButtonText}>Seleccionar Pacientes</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  houseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  patientItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    marginLeft: 30,
  },
  selectedPatientItem: {
    backgroundColor: '#ADD8E6', // Puedes cambiar el color según tus preferencias
    justifyContent: 'center',
  },
  selectButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
    marginLeft: 15,
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SelectPatientsScreen;