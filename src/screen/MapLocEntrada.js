import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const MapLocEntrada = ({ route }) => {
  const { location } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={location} title="Ubicación de Entrada">
          <Callout>
            <View>
              <Text>Detalles de la ubicación de Entrada</Text>
              {/* Puedes agregar más detalles aquí según tus necesidades */}
              <Text>Latitud: {location.latitude}</Text>
              <Text>Longitud: {location.longitude}</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      {/* Card flotante */}
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Detalles de Entrada</Text>
        <Text style={styles.cardText}>Fecha: 10 de abril de 2023</Text>
        <Text style={styles.cardText}>Hora: 09:00:00</Text>
        {/* Puedes agregar más detalles aquí según tus necesidades */}
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>Ver Más Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardButton: {
    backgroundColor: '#5fbcc0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cardButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MapLocEntrada;