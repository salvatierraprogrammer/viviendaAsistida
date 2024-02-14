import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebase_auth, app } from '../firebase/firebase_auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Entypo } from '@expo/vector-icons';

const CardBienvenida = ({   assistanceDataToSend}) => {
  const navigation = useNavigation();
  // const {assistanceDataToSend } = route.params;
  console.log("Assitencia Bienvenida:" ,assistanceDataToSend)

  const [fetchedUserData, setFetchedUserData] = useState(null);
  
  const formattedTimestamp = assistanceDataToSend && assistanceDataToSend.fechaIngreso
  ? format(new Date(assistanceDataToSend.fechaIngreso), 'yyyy-MM-dd HH:mm:ss')
  : '';

const [fechaAsistencia, horaIngreso] = formattedTimestamp.split(' ');

useEffect(() => {
  const fetchUserData = async () => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          const userData = userDoc.data();
          setFetchedUserData(userData);
          // Almacena los datos del usuario en AsyncStorage para persistencia
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      }
    });

    return () => unsubscribe();
  };

  fetchUserData();
}, []);

useEffect(() => {
  const retrievePersistedUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setFetchedUserData(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario persistente:', error);
    }
  };

  retrievePersistedUserData();
}, []);


// console.log("Datos del usuario obtenidos:", fetchedUserData);

// Asegúrate de que fetchedUserData no sea nulo antes de desestructurarlo
const { id, nombre, apellido, photoUrl } = fetchedUserData || {};







  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>¡Hola! Bienvenido</Text>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
        {/* <Text style={styles.patientInfoText}>{`:`}</Text> */}
        <Text style={styles.patientInPre}>
          <FontAwesome5 name="house-user" size={23} color="#5fbcc0" />{`${id || ''} ${nombre || ''} ${apellido || ''}`}
        </Text>
        {assistanceDataToSend && assistanceDataToSend.fechaIngreso && (
            <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeTextContainer}>
                <Text style={styles.patientInPre}>
                <MaterialCommunityIcons name="timetable" size={24} color="#5fbcc0" />
                <Text style={styles.dateTimeText}> Inicio: {fechaAsistencia}</Text>
                </Text>
                
                <Text style={styles.patientInPre}>
                  <MaterialCommunityIcons name="timer-outline" size={24} color="#5fbcc0" /> 
                  <Text style={styles.dateTimeText}> Hora de Ingreso:  {horaIngreso}</Text>
                </Text>
            </View>
          </View>          
          )}
        <Pressable
              style={({ pressed }) => [
                styles.terminarHorarioButton,
                { backgroundColor: pressed ? 'red' : '#5fbcc0' },
              ]}
              onPress={() => {
                if (fetchedUserData && fetchedUserData.userId) {
                  navigation.navigate('FinalizarJornada', { userId: fetchedUserData.userId, assistanceDataToSend: assistanceDataToSend });
                } else {
                  console.error('UserId not found in fetchedUserData');
                }
              }}
            >
              <Text style={styles.buttonText}>Terminar jornada <MaterialCommunityIcons name="exit-run" size={22} color="white" /></Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.terminarHorarioButton,
            { backgroundColor: pressed ? 'red' : '#5fbcc0' },
          ]}
          onPress={() => {
            if (fetchedUserData && fetchedUserData.userId) {
              navigation.navigate('Asistencia', { userId: fetchedUserData.userId });
            } else {
              console.error('UserId not found in fetchedUserData');
            }
          }}
        >
          <Text style={styles.buttonText}>Mi asistencia
           
           <Entypo name="hour-glass" size={24} color="white" />
           </Text>
</Pressable>
        </View>
        <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={photoUrl ? { uri: photoUrl } : { uri: 'https://psicofeminista.com/wp-content/uploads/2023/08/perfil-por-defecto-1-800x600.png' }}
        />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    width: '100%',
    borderWidth: 2,
    borderColor: "#5fbcc0",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    // textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientInPre: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
    width: "100%",
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: '20%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
   
  },
  patientInfoText: {
    fontSize: 18,
    marginBottom: 5,
    // textAlign: 'center',
  },
  terminarHorarioButton: {
    marginTop: 5,
    marginLeft: 1,
    padding: 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  patientInfo: {
    marginBottom: 15,
  },
  patientInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateTimeLabelText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
   
    // // marginRight: 5,
    // color: '#555', // Puedes ajustar el color según tus preferencias
  },
  dateTimeText:{
    marginLeft: 1,
  },
});

export default CardBienvenida;