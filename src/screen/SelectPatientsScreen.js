import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Image } from 'react-native';
// import { vivienda } from '../data/vivienda';
import { TextInput, Button } from 'react-native-paper';
import {useSelector} from 'react-redux';
const SelectPatientsScreen = ({ route, navigation }) => {

  
  const vivienda = useSelector((state) => state.homeSlice.allVivienda);
  const { userData } = route.params;
  // const { lastName, firstName } = userData;
  // console.log("Nombre", lastName, firstName);
  const { house } = route.params;
  
  const selectedHouse = vivienda.find((casa) => casa.nombre === house);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleSelectPatients = () => {
    if (selectedPatient) {
      navigation.navigate('ManageUsers', { selectedPatient, userData });
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
    setSelectedPatient(selectedPatient);
  };

  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri:
            'https://media.istockphoto.com/id/1397186871/es/vector/los-j%C3%B3venes-est%C3%A1n-parados-cerca-de-un-enorme-tel%C3%A9fono-inteligente-con-elementos-de-redes.jpg?s=612x612&w=0&k=20&c=MFHjki1qz3a75OrHxPYw1DvCibxi1xxCqM90Xw4uvy4=',
        }}
      />
      <Text style={styles.houseTitle}>{`Usuarios de ${selectedHouse.nombre}`}</Text>
      <FlatList
        data={selectedHouse.pacientes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        icon="chevron-right"
        mode="outlined"
        onPress={handleSelectPatients}
        style={styles.selectButton}
        labelStyle={styles.selectButtonText}
      >
        Seleccionar Pacientes
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300, // Adjust the height as needed
    resizeMode: 'cover',
  },
  houseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignContent: 'center',
    textAlign: 'center',
    marginTop: 20,
    
  },
  
  patientItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    marginLeft: 30,
    backgroundColor: 'white',
  },
  selectedPatientItem: {
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
  },
  selectButton: {
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
    width: '70%',
    justifyContent: 'center',
    marginLeft: 50,
    alignContent: 'center',
    
    
  },
  selectButtonText: {
    color: 'black',
    fontSize: 16,
    
  },
});

export default SelectPatientsScreen;