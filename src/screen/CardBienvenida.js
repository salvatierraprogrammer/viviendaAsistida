import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebase_auth, app } from '../firebase/firebase_auth';

const CardBienvenida = ({  }) => {
  const navigation = useNavigation();
  const [userData, getUserData] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!userData) {
          // Si userData no está disponible, maneja la lógica según tus necesidades
          return;
        }
        // const db = getFirestore(app);
        // const userDoc = await getDoc(doc(db, 'usuarios', response.user.uid));
        // const fetchedUserData = userDoc.data(); 
        const db = getFirestore(app);
        const userDoc = doc(db, 'usuarios', userData.uid);
        const userSnapshot = await getDoc(userDoc);

        console.log("Document", userDoc);
        console.log('User Snapshot:', userSnapshot.data());

        if (userSnapshot.exists()) {
          const userDataFromFirestore = userSnapshot.data();
          setUserDetails(userDataFromFirestore);
        } else {
          console.warn('User does not exist in Firestore');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userData]);

  console.log(userDetails);
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>¡Hola!</Text>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
        <Text style={styles.patientInfoText}>{`Bienvenido, ${userDetails?.nombre} ${userDetails?.apellido}`}</Text>
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