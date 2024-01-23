import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { format, utcToZonedTime } from 'date-fns-tz';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { app } from '../firebase/firebase_auth';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import Constants from 'expo-constants'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FinalizarJornada = ({ route }) => {
  
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const { assistanceDataToSend } = route.params;

  
  const userId = assistanceDataToSend.userId;
  // console.log("Id usuario", userId);
  // console.log("datos a actualizar: ", assistanceDataToSend);

  const confirmarTerminarJornada = async () => {
    try {
      const db = getFirestore(app);
  
      // Obtener referencia al documento que deseas actualizar
      const assistanceRef = doc(db, 'asistencias', 'G8YnEIZi0DCNwn6S5kxS');
  
      // Obtener la fecha y hora actual en el huso horario de Buenos Aires
      const fechaSalidaBuenosAires = format(
        utcToZonedTime(new Date(), 'America/Argentina/Buenos_Aires'),
        "yyyy-MM-dd'T'HH:mm:ssXXX"
      );
  
      // Obtener la ubicación
      const locationResult = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      };
  
      console.log('Location:', currentLocation);
      // Obtener los registros actuales antes de actualizar
      const currentDoc = await getDoc(assistanceRef);
      const currentRegistros = currentDoc.data()?.registrosAsistencias || [];

      // Realizar la actualización del campo registrosAsistencias
      await updateDoc(assistanceRef, {
        registrosAsistencias: currentRegistros.map((registro) => {
          if (registro.assistanceId === assistanceDataToSend.assistanceId) {
            // Actualizar el registro actual con nueva información
            return {
              ...registro,
              fechaSalida: fechaSalidaBuenosAires,
              ubicacionSalida: currentLocation,
              // marcaModeloCelularSalida: `${Constants.platform?.ios ? 'iPhone' : 'Android'} - ${Constants.deviceName}`,
            };
          } else {
            return registro;
          }
        }),
      });

  
      Alert.alert(
        '¡Excelente trabajo!',
        'Has completado la jornada con éxito. Tu dedicación y apoyo hacen una gran diferencia en la vida de quienes atiendes. Recuerda tomarte un momento para relajarte y recargar energías. ¡Gracias por tu labor tan valiosa!',
      );
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
      Alert.alert('Error', 'Hubo un error al intentar finalizar la jornada. Por favor, comunícate con soporte.');
    }
  };
  

  const handleConfirmation = () => {
    // Mostrar la confirmación adicional
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
            navigation.navigate('home');
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const obtenerUbicacion = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
    
        if (status !== 'granted') {
          Alert.alert('Permiso de ubicación', 'Se requiere permiso para acceder a la ubicación.');
          return;
        }
    
        const locationResult = await Location.getCurrentPositionAsync({});
        const currentLocation = {
          latitude: locationResult.coords.latitude,
          longitude: locationResult.coords.longitude,
        };
    
        console.log('Location:', currentLocation);
        setLocation(currentLocation);
      } catch (error) {
        console.error('Error al obtener la ubicación:', error);
        Alert.alert('Error', 'Hubo un error al obtener la ubicación. Por favor, comunícate con soporte.');
      }
    
    };
  
    obtenerUbicacion();
  }, [setLocation]); // Ajusta las dependencias según tus necesidades

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalizar Jornada</Text>
      <Text style={styles.message}>
        Al confirmar, se dará por terminada la jornada. ¿Estás seguro de continuar?
      </Text>
      <Pressable style={styles.button} onPress={handleConfirmation}>
        <Text style={styles.buttonText}>
          Confirmar <MaterialCommunityIcons name="exit-to-app" size={24} color="white" />
        </Text>
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
    backgroundColor: '#fff',
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
    backgroundColor: '#5fbcc0',
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