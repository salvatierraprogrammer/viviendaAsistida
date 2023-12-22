import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapLocEntrada from './MapLocEntrada';  // Asegúrate de ajustar la ruta correcta

const ListAsistencia = () => {
  const navigation = useNavigation();

  const eventos = [
    {
      id: '1',
      fechaEntrada: '10 de abril de 2023',
      horaEntrada: '09:00:00',
      fechaSalida: '10 de abril de 2023',
      horaSalida: '18:00:00',
      ubicacionEntrada: { latitude: 40.7128, longitude: -74.0060 }, // Ejemplo de ubicación de entrada
      ubicacionSalida: { latitude: 34.0522, longitude: -118.2437 }, // Ejemplo de ubicación de salida
    },
    {
      id: '2',
      fechaEntrada: '8 de septiembre de 2023',
      horaEntrada: '09:30:00',
      fechaSalida: '8 de septiembre de 2023',
      horaSalida: '17:30:00',
      ubicacionEntrada: { latitude: 41.8781, longitude: -87.6298 }, // Ejemplo de ubicación de entrada
      ubicacionSalida: { latitude: 37.7749, longitude: -122.4194 }, // Ejemplo de ubicación de salida
    },
  ];

  const verUbicacion = (evento, tipo) => {
    // Lógica para ver la ubicación del evento (entrada o salida)
    const ubicacion = tipo === 'entrada' ? evento.ubicacionEntrada : evento.ubicacionSalida;
    navigation.navigate('MapLocEntrada', { location: ubicacion });
  };

  const renderItem = ({ item }) => (
    <View style={styles.eventoContainer}>
      <Text style={styles.eventoTitle}>Evento</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Fecha de Entrada: {item.fechaEntrada}</Text>
        <Text style={styles.infoText}>Hora de Entrada: {item.horaEntrada}</Text>
        <TouchableOpacity onPress={() => verUbicacion(item, 'entrada')} style={styles.iconContainer}>
          <Ionicons name="location-sharp" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Fecha de Salida: {item.fechaSalida}</Text>
        <Text style={styles.infoText}>Hora de Salida: {item.horaSalida}</Text>
        <TouchableOpacity onPress={() => verUbicacion(item, 'salida')} style={styles.iconContainer}>
          <Ionicons name="location-sharp" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Lista de Asistencia</Text> */}
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  eventoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  eventoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
  },
  iconContainer: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
});

export default ListAsistencia;