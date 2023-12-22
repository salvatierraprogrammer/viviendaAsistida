import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const MapWithDetails = () => {
  const mapRef = useRef(null);

  // Coordenadas de la ubicación simulada
  const location = {
    latitude: -34.603722,
    longitude: -58.381592,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // URL de la imagen para el marcador
  const markerImage = 'https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg';

  // Función para hacer zoom al marcador
  const zoomToMarker = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...location,
        latitudeDelta: 0.05, // Ajusta estos valores según tu preferencia
        longitudeDelta: 0.05,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={location}>
        <Marker coordinate={location} title="Ubicación simulada">
          <Image source={{ uri: markerImage }} style={styles.markerImage} />
          {/* Puedes personalizar el contenido del marcador aquí si es necesario */}
          {/* Por ejemplo, agregar una ventana emergente de información */}
          <Callout>
            <View>
              <Text>Detalles de la ubicación</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Operador: Juana de Arco</Text>
       
        <Text style={styles.cardText}>Telefono: + 549 1132764532</Text>
        <Text style={styles.cardText}>Hora de ingreso: 08:00:00</Text>
        <TouchableOpacity style={styles.cardButton} onPress={zoomToMarker}>
          <Text style={styles.cardButtonText}>Ver Detalles</Text>
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
    ...StyleSheet.absoluteFillObject,
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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

export default MapWithDetails;