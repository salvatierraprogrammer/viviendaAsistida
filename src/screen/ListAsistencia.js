import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase/firebase_auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { FontAwesome6 } from '@expo/vector-icons';



const ListAsistencia = (userData) => {
    const navigation = useNavigation();
    const [userRegistros, setUserRegistros] = useState([]);
  
    const userId = userData.route.params.userData.userData.userData.userId;
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const db = getFirestore(app);
          const asistenciasDocRef = doc(db, 'asistencias', 'G8YnEIZi0DCNwn6S5kxS');
  
          const currentRegistros = (await getDoc(asistenciasDocRef)).data()?.registrosAsistencias || [];
  
          // Filter the records based on userId
          const userRegistros = currentRegistros
            .filter(registro => registro.userId === userId)
            .map((registro) => ({
              ...registro,
              fIngreso: registro.fechaIngreso.split('T')[0],
              hIngreso: registro.fechaIngreso.split('T')[1].split('Z')[0],
              fSalida: registro.fechaSalida ? registro.fechaSalida.split('T')[0] : null,
              hSalida: registro.fechaSalida ? registro.fechaSalida.split('T')[1].split('Z')[0] : null,
            }))
            .sort((a, b) => new Date(b.fechaIngreso) - new Date(a.fechaIngreso)); // Ordenar por fecha de ingreso de forma descendente
  
          setUserRegistros(userRegistros);
  
        } catch (error) {
          console.error('Error al obtener datos de usuarios:', error);
        }
      };
  
      fetchUsers();
    }, [userId]);
  
    const verUbicacion = (evento, tipo) => {
      const ubicacion = tipo === 'entrada' ? evento.ubicacionIngreso : evento.ubicacionSalida;
    
      // Pass additional data in the navigation parameters
      navigation.navigate('MapLocEntrada', {
        location: ubicacion,
        fecha: tipo === 'entrada' ? evento.fIngreso : evento.fSalida,
        hora: tipo === 'entrada' ? evento.hIngreso : evento.hSalida,
        tipoEvento: tipo,
      });
    };
    const renderItem = ({ item }) => (
      <View style={styles.eventoContainer}>
        <Text style={styles.eventoTitle}><MaterialCommunityIcons name="calendar-account" size={24} color="#5fbcc0" />
          Asistencia
        </Text>
        <Text>
        <MaterialCommunityIcons name="home" size={24} color="#5fbcc0" />
         Vivienda: {item.vivienda}
        </Text>
        <Text>
        <MaterialCommunityIcons name="home-account" size={24} color="#5fbcc0" />
         Usuario: {item.usuario}
        </Text>
        <View style={styles.infoContainer}>
       
        <Text style={styles.infoText}>
          <MaterialCommunityIcons name="calendar-arrow-right" size={24} color="#5fbcc0" />
            Entrada: {item.fIngreso}
            </Text>
          <Text style={styles.infoText}>
          <MaterialCommunityIcons name="exit-run" size={24} color="#5fbcc0" style={{ transform: [{ scaleX: -1 }] }} />
            Hora: {item.hIngreso}</Text>
          <TouchableOpacity onPress={() => verUbicacion(item, 'entrada')} style={styles.iconContainer}>
            <Ionicons name="location-sharp" size={24} color="#5fbcc0" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
          <MaterialCommunityIcons name="calendar-arrow-left" size={24} color="#5fbcc0" />
          Salida: {item.fSalida}</Text>
          <Text style={styles.infoText}>
          <MaterialCommunityIcons name="exit-run" size={24} color={"#5fbcc0"} style={{ transform: [{ rotateY: '180deg' }] }} />
          Hora: {item.hSalida ? item.hSalida : <Text style={{ color: "green" }}>Activo</Text>}
        </Text>
          <TouchableOpacity onPress={() => verUbicacion(item, 'salida')} style={styles.iconContainer}>
            <Ionicons name="location-sharp" size={24} color="#5fbcc0" />
          </TouchableOpacity>
        </View>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={userRegistros}
          keyExtractor={(item, index) => (item && item.id ? item.id.toString() : index.toString())}
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
    borderWidth: 2,
    borderColor: "#5fbcc0",
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