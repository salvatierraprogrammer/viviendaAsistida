import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase/firebase_auth';

import { ActivityIndicator } from 'react-native-paper';
// import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const ListMiAsistencia = (route) => {
    const navigation = useNavigation();
    const [userRegistros, setUserRegistros] = useState([]);
    const [hasAsistencia, setHasAsistencia] = useState(true); // Nuevo estado
    const [loading, setLoading] = useState(true);
    const { userId } = route.params || route.route.params || {};
    console.log("User id: ", userId);

    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
  
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
              fIngreso: new Date(registro.fechaIngreso).toLocaleDateString(),
              hIngreso: new Date(registro.fechaIngreso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
              fSalida: registro.fechaSalida ? new Date(registro.fechaSalida).toLocaleDateString() : null,
              hSalida: registro.fechaSalida ? new Date(registro.fechaSalida).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) : null,
            }))
            .sort((a, b) => new Date(b.fechaIngreso) - new Date(a.fechaIngreso));
    
          setUserRegistros(userRegistros);
          setHasAsistencia(userRegistros.length > 0); // Actualiza el estado según si hay registros o no
        } catch (error) {
          console.error('Error al obtener datos de usuarios:', error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchUsers();
    }, [userId]);
  
  
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#5fbcc0" />
        <Text>Cargando...</Text>
      </View>
       
      );
    }
  
    if (!hasAsistencia) {
      return (
        <View style={styles.container}>
          <Text>No hay registros de asistencia para este operador.</Text>
        </View>
      );
    }
const renderItem = ({ item }) => (
  <View style={styles.eventoContainer}>
    <Text style={styles.eventoTitle}><MaterialCommunityIcons name="calendar-account" size={24} color="#5fbcc0" />
      Asistencia
    </Text>
    <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="home" size={20} color="#5fbcc0" />
          <Text style={styles.infoText}>Vivienda: {item.vivienda}</Text>
        </View>
      </View>
      <View style={styles.infoContainerButon}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="home-account" size={20} color="#5fbcc0" />
          <Text style={styles.infoText}>Usuario: {item.usuario}</Text>
        </View>
    </View>
    <View style={styles.infoContainer}>
      <View style={styles.infoItem}>
        <MaterialCommunityIcons name="calendar-arrow-right" size={20} color="#5fbcc0" />
        <Text style={styles.infoText}>Entrada: {item.fIngreso}</Text>
      </View>
      <View style={styles.infoItem}>
        <MaterialCommunityIcons name="exit-run" size={20} color="#5fbcc0" style={{ transform: [{ scaleX: -1 }] }} />
        <Text style={styles.infoText}>Hora: {item.hIngreso}</Text>
      </View>
    </View>
<View style={styles.infoContainer}>
  <View style={styles.infoItem}>
    <MaterialCommunityIcons name="calendar-arrow-left" size={20} color="#5fbcc0" />
    <Text style={styles.infoText}>Salida: {item.fSalida} </Text>
    {item.hSalida ? (
      <View style={styles.infoItem}>
        <Text style={styles.infoText2}>
        <MaterialCommunityIcons name="exit-run" size={20} color={"#5fbcc0"} style={{ transform: [{ rotateY: '180deg' }] }} />
          Hora: {item.hSalida}</Text>
      </View>
    ) : (
      <Text style={{ color: "green", marginLeft: 4 }}>Activo</Text>
    )}
  </View>
</View>
  </View>
);
  
    return (
      <View style={styles.container}>
        <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>{error}</Text>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textStyle}>Cerrar</Text>
      </Pressable>
    </View>
  </View>
</Modal>
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
    eventoContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: "#5fbcc0",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    eventoTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#5fbcc0',
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    infoContainerButon:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      marginBottom: 10,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoText: {
      fontSize: 16,
      marginLeft: 4, // Ajusta el margen izquierdo para dar espacio entre el icono y el texto
    },
    infoText2: {
      fontSize: 16,
      marginLeft: 65, // Ajusta el margen izquierdo para dar espacio entre el icono y el texto
    },
    iconContainer: {
      marginRight: 8,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: '#5fbcc0',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

export default ListMiAsistencia;