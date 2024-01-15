import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { format, utcToZonedTime } from 'date-fns-tz';
import * as Location from 'expo-location';  // Asumiendo que ya tienes esta importación
import { useNavigation } from '@react-navigation/native';

const FinalizarJornada = () => {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  

  const confirmarTerminarJornada = async () => {
    try {
      // Obtener la ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.error('Permiso de ubicación denegado');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Obtener la fecha y hora actual
      const currentUtcTime = new Date();

      // Convierte la fecha y hora a la zona horaria de Buenos Aires (America/Argentina/Buenos_Aires)
      const formattedTime = format(utcToZonedTime(currentUtcTime, 'America/Argentina/Buenos_Aires'), "yyyy-MM-dd'T'HH:mm:ssXXX");

      // Agrega aquí la lógica para guardar la fecha de salida y la ubicación de salida
      console.log('Fecha de salida:', formattedTime);
      console.log('Ubicación de salida:', currentLocation);

      // Lógica adicional según tus necesidades (puedes guardar esto en Firebase, por ejemplo)
      
      // Mostrar la confirmación
      Alert.alert(
        'Confirmación',
        'Jornada terminada',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              // Puedes agregar aquí la navegación o cualquier otra lógica adicional después de la confirmación
              navigation.navigate('SelectHouse');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error al finalizar la jornada:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalizar Jornada</Text>
      <Text style={styles.message}>
        Al confirmar, se dará por terminada la jornada. ¿Estás seguro de continuar?
      </Text>
      <Pressable style={styles.button} onPress={confirmarTerminarJornada}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FinalizarJornada;