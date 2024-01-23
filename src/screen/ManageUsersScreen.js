import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Button } from 'react-native-paper';
import { useSaveAssistanceMutation } from '../services/ecApi';
import { app } from '../firebase/firebase_auth';
import { getFirestore, getDoc, doc, setDoc, arrayUnion  } from 'firebase/firestore';
import { format, utcToZonedTime } from 'date-fns-tz';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Constants from 'expo-constants'; 




const ManageUsersScreen = ({ route, navigation }) => {
  const { selectedPatient } = route.params;
  const { selectedHouse } = route.params;
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const saveAssistanceMutation = useSaveAssistanceMutation();
  const auth = getAuth(app);

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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is logged in:', user.uid);
    } else {
      console.log('User is logged out');
      // Handle the case where the user is not logged in
    }
  });
 const getNextAssistanceId = () => {
    // Utiliza la marca de tiempo actual junto con un valor aleatorio
    const timestamp = new Date().getTime();
    const randomValue = Math.floor(Math.random() * 1000); // Puedes ajustar el rango según tus necesidades
    return `${timestamp}-${randomValue}`;
  };

  const handleAssistance = async () => {
    if (!location || !selectedPatient) {
      console.error('La ubicación o el paciente no están disponibles.');
      return;
    }
  
    const { id: userId, nombre } = selectedPatient;
    const { nombre: nombreCasa } = selectedHouse;
  
    if (!userId || !nombre || !nombreCasa) {
      console.error('Datos del paciente o de la casa incompletos.');
      return;
    }
  
    setLoadingLocation(true);

    try {
      const db = getFirestore(app);
      const asistenciasDocRef = doc(db, 'asistencias', 'G8YnEIZi0DCNwn6S5kxS');
  
      const formattedTime = (date) => {
        return format(
          utcToZonedTime(date, 'America/Argentina/Buenos_Aires'),
          "yyyy-MM-dd'T'HH:mm:ssXXX"
        );
      };
  
      const nextAssistanceId = getNextAssistanceId();
  
      const assistanceData = {
        assistanceId: nextAssistanceId,
        userId: auth.currentUser.uid,
        vivienda: nombreCasa || 'Casa Desconocida',
        usuario: nombre,
        fechaIngreso: formattedTime(new Date()),
        ubicacionIngreso: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        fechaSalida: null,
        ubicacionSalida: null,
        marcaModeloCelularIngreso: `${Constants.platform?.ios ? 'iPhone' : 'Android'} - ${Constants.deviceName}`,
        marcaModeloCelularSalida: null,
      };
  
      // Obtener los registros actuales antes de actualizar
      const currentRegistros = (await getDoc(asistenciasDocRef)).data()?.registrosAsistencias || [];
      
      await setDoc(asistenciasDocRef, { registrosAsistencias: arrayUnion(assistanceData, ...currentRegistros) }, { merge: true });

  
      console.log('Datos guardados en Firebase Firestore');
  
      navigation.navigate('home', {
        selectedPatient: selectedPatient,
        assistanceDataToSend: assistanceData, // Corregir el nombre de la variable aquí
      });
    } catch (error) {
      console.error('Error al guardar la asistencia:', error);
      // Puedes mostrar un mensaje de error al usuario
    } finally {
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
        <ActivityIndicator size="large" color="#5fbcc0" />
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
    backgroundColor: '#5fbcc0',
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