import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Button } from 'react-native-paper';
import { useSaveAssistanceMutation } from '../services/ecApi';
import { app } from '../firebase/firebase_auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { format, utcToZonedTime } from 'date-fns-tz';

const ManageUsersScreen = ({ route, navigation }) => {
  const { selectedPatient } = route.params;
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const saveAssistanceMutation = useSaveAssistanceMutation();

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.error('Permiso de ubicación denegado');
        setLoadingLocation(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('Ubicación actual:', location);
      setLocation(location);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleAssistance = async () => {
    if (!location) {
      console.error('La ubicación no está disponible.');
      return;
    }
  
    const assistanceLocation = location;
    const currentUtcTime = new Date();

    // Convierte la fecha y hora a la zona horaria de Buenos Aires (America/Argentina/Buenos_Aires)
    const formattedTime = format(utcToZonedTime(currentUtcTime, 'America/Argentina/Buenos_Aires'), "yyyy-MM-dd'T'HH:mm:ssXXX");
  
    // Crear un nuevo objeto con los datos específicos que deseas pasar
    const assistanceDataToSend = {
      id: selectedPatient.id,
      fechaIngreso: formattedTime,
      ubicacionIngreso: assistanceLocation,
    };
  
    console.log('Datos antes de guardar:', assistanceDataToSend);
  
    // Indicar que se están guardando los datos
    setLoadingLocation(true);
  
    // Guardar solo fecha, hora e ubicación en Firebase Firestore
    try {
      const db = getFirestore(app);
      const userCollection = collection(db, 'usuarios');
  
      // Agregar un nuevo registro con la fecha de ingreso y ubicación de ingreso
      const docRef = await addDoc(userCollection, { ...selectedPatient, ...assistanceDataToSend });
  
      console.log('Datos guardados en Firebase Firestore con ID:', docRef.id);
  
      // Navegar a la pantalla de inicio después de guardar con éxito
      navigation.navigate('Home', {
        selectedPatient: selectedPatient,
        assistanceDataToSend,
      });
    } catch (error) {
      console.error('Error al guardar la asistencia:', error);
    } finally {
      // Finalizar indicación de que se están guardando los datos
      setLoadingLocation(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn.icon-icons.com/icons2/1585/PNG/512/3709730-assistance-call-centre-help-service_108075.png',
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Registro de Asistencia</Text>

      {loadingLocation ? (
        <ActivityIndicator size="large" color="#ADD8E6" />
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            icon="chevron-right"
            mode="contained"
            onPress={handleAssistance}
            style={styles.button}
            labelStyle={styles.buttonText}
            disabled={saveAssistanceMutation.isLoading}
          >
            Proporcionar Asistencia
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: '#ADD8E6',
  },
  buttonText: {
    fontSize: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});

export default ManageUsersScreen;