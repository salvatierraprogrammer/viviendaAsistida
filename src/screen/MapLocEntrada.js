import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const defaultImage = 'https://psicofeminista.com/wp-content/uploads/2023/08/perfil-por-defecto-1-800x600.png';

const CustomMarker = ({ coordinate, title, image }) => (
  <Marker coordinate={coordinate}>
    {image ? (
      <View style={styles.circle}>
        <Image source={{ uri: image }} style={styles.circleImage} />
      </View>
    ) : (
      <View style={styles.circle} />
    )}
    <Callout>
      <View>
        <Text>{title}</Text>
      </View>
    </Callout>
  </Marker>
);

const MapLocEntrada = ({ route }) => {
  const { location, fecha, hora, tipoEvento, photoUrl } = route.params;
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack(); // Navegar hacia atrás
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <CustomMarker
          coordinate={location}
          title={`Ubicación de ${tipoEvento === 'entrada' ? 'Entrada' : 'Salida'}`}
          image={photoUrl || defaultImage}
        />
        <Circle
          center={location}
          radius={20}
          fillColor="rgba(255, 0, 0, 0.5)"
        />
      </MapView>

      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{`Detalles de ${tipoEvento === 'entrada' ? 'Entrada' : 'Salida'}`}</Text>
        <Text style={styles.cardText}>Fecha: {fecha}</Text>
        <Text style={styles.cardText}>Hora: {hora}</Text>
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
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
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
   circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden', // Asegura que la imagen no se salga del círculo
    borderColor: '#5fbcc0',
    borderWidth: 2,
  },
  circleImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default MapLocEntrada;