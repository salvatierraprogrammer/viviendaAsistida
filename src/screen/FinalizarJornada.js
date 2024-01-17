import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { format, utcToZonedTime } from 'date-fns-tz';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { app } from '../firebase/firebase_auth';

import {
  getFirestore,
  collection,
  addDoc,
} from 'firebase/firestore';

const FinalizarJornada = ({ userId }) => {
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
      const formattedTime = format(
        utcToZonedTime(currentUtcTime, 'America/Argentina/Buenos_Aires'),
        "yyyy-MM-dd'T'HH:mm:ssXXX"
      );

      // Referencia a la colección "usuarios"
      const db = getFirestore(app);
      const usuariosCollection = collection(db, 'usuarios');

      // Datos de la jornada
      const jornadaData = {
        fechaFin: formattedTime,
        ubicacionFin: {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
      };

      // Agregar un nuevo documento a la colección "usuarios"
      const nuevoDocumento = await addDoc(usuariosCollection, jornadaData);

    
    } catch (error) {
      console.error('Error al finalizar la jornada:', error.message, error.stack);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalizar Jornada</Text>
      <Text style={styles.message}>
        Al confirmar, se dará por terminada la jornada. ¿Estás seguro de continuar?
      </Text>
      <Pressable style={styles.button} onPress={() =>   // Mostrar la confirmación adicional
      Alert.alert(
        'Confirmación Adicional',
        '¿Deseas realizar alguna acción adicional?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              // Llamar a confirmarTerminarJornada después de la confirmación adicional
              confirmarTerminarJornada();
              navigation.navigate('SelectHouse');
            },
          },
        ],
        { cancelable: false }
      )}>
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