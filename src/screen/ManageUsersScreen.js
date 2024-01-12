import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator  } from 'react-native';
import * as Location from 'expo-location';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useSaveAssistanceMutation } from '../services/ecApi';
import { format, utcToZonedTime } from 'date-fns-tz';

const ManageUsersScreen = ({ route, navigation }) => {
  const { selectedPatient } = route.params;
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const { mutate: saveAssistance, isLoading: isSavingAssistance } = useSaveAssistanceMutation();

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

    // Obtén la fecha y hora actual en UTC
    const currentUtcTime = new Date();

    // Convierte la fecha y hora a la zona horaria de Buenos Aires (America/Argentina/Buenos_Aires)
    const formattedTime = format(utcToZonedTime(currentUtcTime, 'America/Argentina/Buenos_Aires'), "yyyy-MM-dd'T'HH:mm:ssXXX");

    const assistanceData = {
      ...selectedPatient,
      location,
      timestamp: formattedTime,
    };

    try {
      await saveAssistance(assistanceData);
      navigation.navigate('Home', { selectedPatient: assistanceData });
    } catch (error) {
      console.error('Error al guardar la asistencia:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn.icon-icons.com/icons2/1585/PNG/512/3709730-assistance-call-centre-help-service_108075.png' }}
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
            disabled={isSavingAssistance}
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