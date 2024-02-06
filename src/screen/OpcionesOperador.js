import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OpcionesOperador = ({ userData }) => {
  const navigation = useNavigation();
  console.log("USERDATA: ", userData);

  // Desestructura directamente userId, nombre, apellido, photoUrl
  const { userId, nombre, apellido, photoUrl } = userData || {};
  
  console.log("UserId: ", userId);

  return (
    <View style={styles.row}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.column} 
          onPress={() => navigation.navigate("ListAsistencia", { userData })}>
          <FontAwesome5 name="clipboard-list" size={24} color="#5fbcc0" />
          <Text style={styles.optionText}>Asistencias</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.column}
          onPress={() => navigation.navigate('MapLoc', {userData })}
          >
          <Entypo name="location" size={24} color="#5fbcc0" />
          <Text style={styles.optionText}>Ubicación</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '43%',
    margin: 10,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    marginTop: 5,
    // color: 'white',
  },
});

export default OpcionesOperador;