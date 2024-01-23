import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const ButtonUsuarios = () => {

  navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UsuariosScreen')}>
        <Text style={styles.buttonText}>
          <FontAwesome name="users" size={20} color="#fff" />
          Lista de Usuarios
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonUsuarios;

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