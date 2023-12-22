import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { vivienda } from '../data/vivienda';

const UsuariosScreen = ({ navigation }) => {
  const renderPatientItem = ({ item }) => (
    <TouchableOpacity
      style={styles.patientItem}
      onPress={() => navigation.navigate('DetailsUsuarios', { paciente: item })}
    >
      <Image
        source={{ uri: item.photoUrl || 'https://www.revistadiabetes.org/wp-content/uploads/Manejo-del-paciente-psiquiatrico-con-diabetes3.jpg' }}
        style={styles.patientImage}
      />
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.nombre}</Text>
        {/* Puedes agregar más información aquí, como el apellido, etc. */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {/* <Text style={styles.screenTitle}>Lista de Usuarios</Text> */}
      <FlatList
        data={vivienda.reduce((acc, edificio) => [...acc, ...edificio.pacientes], [])}
        renderItem={renderPatientItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    // backgroundColor: 'white',
  },
  patientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  patientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UsuariosScreen;