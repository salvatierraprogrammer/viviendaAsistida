import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

import { useNavigation } from '@react-navigation/native';
import CardUltimaMedicacion from './CardUtimaMedicacion';

const CardPlanFarmacologico = ({ paciente }) => {
    const navigation = useNavigation();
    
   
    const  selectedPatient  = paciente;
 
    return (
      <View style={styles.row}>
        
      
        <View style={styles.container}>
            
        <TouchableOpacity
            style={styles.column}
            onPress={() => navigation.navigate('DetailsPlanFarmacologico', { paciente })}
            >
            <AntDesign name="exception1" size={24} color="#5fbcc0" />
            <Text style={styles.optionText}>Plan Farmacologico</Text>
        </TouchableOpacity>
        </View>
        {/* <View style={styles.container}>
          <TouchableOpacity style={styles.column} onPress={() => console.log("Hola")}>
            <AntDesign name="profile" size={24} color="#5fbcc0" />
            <Text style={styles.optionText}>Historial medicacion</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    margin: 10,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
  },
  optionText: {
    fontSize: 15,
    marginTop: 5,
    // color: 'white',
  },
  backgroundColor: '#fff',
  padding: 16,
  borderRadius: 8,
  elevation: 3,
  shadowOffset: { width: 1, height: 1 },
  shadowColor: '#333',
  shadowOpacity: 0.3,
  shadowRadius: 2,
  marginBottom: 16,
  width: '96%',
  borderWidth: 2,
  borderColor: "#5fbcc0",
});

export default CardPlanFarmacologico;