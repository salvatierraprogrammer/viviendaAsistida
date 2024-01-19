

  import React, { useRef, useEffect, useState } from 'react';
  import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
  import MapView, { Marker, Callout } from 'react-native-maps';
  import { getFirestore, doc, getDoc } from 'firebase/firestore';
  import { app } from '../firebase/firebase_auth';
  
  const MapWithDetails = (userData) => {
    const mapRef = useRef(null);

    
    const [userRegistros, setUserRegistros] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [lastEntry, setLastEntry] = useState(null);
  
    const userId = userData.route.params.userData.userData.userData.userId;
    const nombre = userData.route.params.userData.userData.userData.nombre;
    const apellido = userData.route.params.userData.userData.userData.apellido;
    const phoneNumber = userData.route.params.userData.userData.userData.phoneNumber;
    
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
    
            // Hacer zoom a la ubicación del usuario
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
  
        // Setear la última entrada en el estado
        if (userRegistros.length > 0) {
          const lastEntry = userRegistros[userRegistros.length - 1];
          setLastEntry(lastEntry);
        }
      } catch (error) {
        console.error('Error al obtener datos de usuarios:', error);
      }
    };
  
    useEffect(() => {
      // Fetch user details
      fetchUsers();
    }, [lastEntry]);
    
    useEffect(() => {
      // Check if userLocation has been updated
      if (lastEntry && lastEntry.ubicacionIngreso) {
        // Zoom a la ubicación del usuario
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: lastEntry.ubicacionIngreso.latitude,
            longitude: lastEntry.ubicacionIngreso.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          });
        }
      }
    }, [lastEntry]);
    return (
      <View style={styles.container}>
        <MapView ref={mapRef} style={styles.map} initialRegion={userLocation}>
          {lastEntry && (
            <Marker coordinate={lastEntry.ubicacionIngreso} title="Última ubicación">
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
    
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Operador: {nombre} {apellido}</Text>
          <Text style={styles.cardText}>Telefono: {phoneNumber}</Text>
          {/* Mostrar la hora de ingreso desde lastEntry */}
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