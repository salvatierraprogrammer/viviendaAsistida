import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebase_auth, app } from '../firebase/firebase_auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CardBienvenida = ({  }) => {
  const navigation = useNavigation();
  // const [userData, getUserData] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [fetchedUserData, setFetchedUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('fetchedUserData');
        const parsedUserData = JSON.parse(storedUserData);
        setFetchedUserData(parsedUserData);
  
        // Obtener la información del usuario de Firestore
        const db = getFirestore(app);
        const userDoc = doc(db, 'usuarios', parsedUserData.uid);
        const userSnapshot = await getDoc(userDoc);
  
        if (userSnapshot.exists()) {
          const userDataFromFirestore = userSnapshot.data();
          
          // Almacena los detalles del usuario en AsyncStorage
          await AsyncStorage.setItem('userDetails', JSON.stringify(userDataFromFirestore));
  
          // También podrías setear los detalles del usuario en el estado si es necesario
          setUserDetails(userDataFromFirestore);
        } else {
          console.warn('User does not exist in Firestore');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    fetchUserData();
  }, []);

  const { nombre, apellido } = fetchedUserData || {};


  console.log(userDetails);
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>¡Hola!</Text>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
        <Text style={styles.patientInfoText}>{`Bienvenido:`}</Text>
        <Text style={styles.patientInfoText}>{`${nombre || ''} ${apellido || ''}`}</Text>

          <Pressable
            style={({ pressed }) => [
              styles.terminarHorarioButton,
              { backgroundColor: pressed ? 'red' : 'green' },
            ]}
            onPress={() => navigation.navigate('FinalizarJornada')}
          >
            <Text style={styles.buttonText}>Terminar jornada</Text>
          </Pressable>
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: userDetails?.photoUrl }}
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
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
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
    marginTop: 1,
    marginLeft: 1,
    padding: 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CardBienvenida;