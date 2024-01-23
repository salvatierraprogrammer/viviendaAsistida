import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ButtonOperadores = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OperadoresScreen')}>
        <Text style={styles.buttonText}>
        <FontAwesome5 name="house-user" size={20} color="#fff" />
          Lista de Opradores
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonOperadores;

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    marginTop: 9,
  },
  button: {
    backgroundColor: '#5fbcc0',
    borderRadius: 10,
    // padding: 15,
    width: '65%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});