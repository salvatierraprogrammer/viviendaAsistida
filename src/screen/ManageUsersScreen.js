import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';

const ManageUsersScreen = ({ route, navigation }) => {
  const { selectedPatient } = route.params;
  console.log("Datos",selectedPatient )
  // const { userData } = route.params;
  // const { lastName, firstName } = userData;
  // console.log("Nombre Manager", lastName, firstName);

  const [location, setLocation] = useState(null);

  // Función para obtener la ubicación del dispositivo
  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Estado del permiso:', status);
  
      if (status !== 'granted') {
        console.error('Permiso de ubicación denegado');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      console.log('Ubicación actual:', location);
  
      setLocation(location);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  };
  useEffect(() => {
    // Obtén la ubicación cuando el componente se monte
    getLocation();
  }, []);

  const handleAssistance = async () => {
    if (!location) {
      console.error('La ubicación no está disponible.');
      // Si la ubicación no está disponible, puedes mostrar un mensaje al usuario
      return;
    }

    const timestamp = new Date();
    const offset = -3 * 60;
    const timestampWithOffset = new Date(timestamp.getTime() + offset * 60000);
    const formattedTime = timestampWithOffset.toISOString();

    const assistanceData = {
      ...selectedPatient,
      location,
      timestamp: formattedTime,
    };

    navigation.navigate('Home', { selectedPatient: assistanceData });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn.icon-icons.com/icons2/1585/PNG/512/3709730-assistance-call-centre-help-service_108075.png' }}
        style={styles.image}
      />
      <Text style={styles.title}>Registro de Asistencia</Text>

      <View style={styles.buttonContainer}>
        <Button
          icon="chevron-right"
          mode="contained"
          onPress={handleAssistance}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Proporcionar Asistencia
        </Button>
      </View>
      {/* Agrega más funcionalidades según sea necesario */}
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
    alignItems: 'center', // Alinea la imagen y el botón en el centro horizontal
  },
  button: {
    borderRadius: 50, // Hace que el botón sea redondo ajustando el radio del borde
    marginTop: 10,
    backgroundColor: '#ADD8E6',
  },
  buttonText: {
    fontSize: 16,
  },
  image: {
    width: 150, // Ajusta el ancho de la imagen según tus necesidades
    height: 150, // Ajusta la altura de la imagen según tus necesidades
    marginBottom: 10, // Agrega un margen inferior para separar la imagen del botón
  },
});

export default ManageUsersScreen;