import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase/firebase_auth';
import { AntDesign } from '@expo/vector-icons';

const defaultImage = 'https://psicofeminista.com/wp-content/uploads/2023/08/perfil-por-defecto-1-800x600.png';

const MapWithDetails = ({ navigation, route }) => {
  const mapRef = useRef(null);

  const [userRegistros, setUserRegistros] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [lastEntry, setLastEntry] = useState(null);

  const userData = route.params.userData;
  const userId = userData.userId;
  const nombre = userData.nombre;
  const apellido = userData.apellido;
  const phoneNumber = userData.phoneNumber;
  const photoUrl = userData.photoUrl;

  const fetchUsers = async () => {
    try {
      const db = getFirestore(app);
      const asistenciasDocRef = doc(db, 'asistencias', 'G8YnEIZi0DCNwn6S5kxS');
      const userDocRef = doc(db, 'users', userId);

      const asistenciasData = (await getDoc(asistenciasDocRef)).data() || {};
      const userDoc = await getDoc(userDocRef);

      const currentRegistros = asistenciasData.registrosAsistencias || [];
      const userRegistros = currentRegistros
        .filter((registro) => registro.userId === userId)
        .map((registro) => ({
          ...registro,
          fIngreso: registro.fechaIngreso.split('T')[0],
          hIngreso: registro.fechaIngreso.split('T')[1].split('Z')[0],
          fSalida: registro.fechaSalida ? registro.fechaSalida.split('T')[0] : null,
          hSalida: registro.fechaSalida ? registro.fechaSalida.split('T')[1].split('Z')[0] : null,
        }));

      setUserRegistros(userRegistros);

      if (userDoc.exists()) {
        const userLocationData = userDoc.data()?.lastLocation;

        if (userLocationData) {
          setUserLocation({
            latitude: userLocationData.latitude,
            longitude: userLocationData.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });

          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: userLocationData.latitude,
              longitude: userLocationData.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }
        }
      }

      if (userRegistros.length > 0) {
        const lastEntry = userRegistros[userRegistros.length - 1];
        setLastEntry(lastEntry);
      }
    } catch (error) {
      console.error('Error al obtener datos de usuarios:', error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchUsers();
  }, [lastEntry]);

  useEffect(() => {
    if (lastEntry && lastEntry.ubicacionIngreso) {
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: lastEntry.ubicacionIngreso.latitude,
          longitude: lastEntry.ubicacionIngreso.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    }
  }, [lastEntry]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView ref={mapRef} 
    
        showsUserLocation={true}
      style={styles.map} initialRegion={userLocation}>
        {lastEntry && (
          <Marker coordinate={lastEntry.ubicacionIngreso} title="Última ubicación">
            <Image
              style={styles.markerImage}
              source={{ uri: photoUrl || defaultImage }}
            />
            <Callout>
              <View>
                <Text>Detalles de la última ubicación</Text>
                <Text>Latitud: {lastEntry.ubicacionIngreso.latitude}</Text>
                <Text>Longitud: {lastEntry.ubicacionIngreso.longitude}</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Operador: {nombre} {apellido}</Text>
        <Text style={styles.cardText}>Telefono: {phoneNumber}</Text>
        <Text style={styles.cardText}>Hora de ingreso: {lastEntry ? lastEntry.hIngreso : ''}</Text>
        <Text style={styles.cardText}>
          {lastEntry && lastEntry.hSalida ? (
            <>
              Hora de salida: {lastEntry.hSalida}
            </>
          ) : (
            <Text style={{ color: 'green' }}>Activo</Text>
          )}
        </Text>
        <TouchableOpacity style={styles.cardButton} onPress={() => console.log("Ver detalles")}>
          <Text style={styles.cardButtonText}>Ver Detalles</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    borderColor: '#5fbcc0',
    borderWidth: 2,
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