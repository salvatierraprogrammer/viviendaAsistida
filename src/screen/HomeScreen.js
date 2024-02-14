import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import CardUltimaMedicacion from './CardUtimaMedicacion';
import CardBienvenida from './CardBienvenida';
import PlanFarmacologicoScreen from './PlanFarmacologicoScreen';
import CamaraScreen from './CamaraScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import SelectHouseScreen from './SelectHouseScreen';
import { storeData, retrieveData } from '../redux/storageService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardUsuarioDatos from '../components/CardUsuarioDatos';

const HomeScreen = ({ navigation, route }) => {
  const { selectedPatient, assistanceDataToSend } = route.params || {};
  const { fechaSalida, ubicacionSalida } = route.params || {};
  console.log("Ubicacion Salida: ", ubicacionSalida);
  console.log("Fecha Salida: ", fechaSalida);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [storedSelectedPatient, setStoredSelectedPatient] = useState(null);
  const [storedAssistanceDataToSend, setStoredAssistanceDataToSend] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFinishedWork, setHasFinishedWork] = useState(false);
  // Define the verificarSalida function
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedPatient) {
          await AsyncStorage.setItem('selectedPatient', JSON.stringify(selectedPatient));
        }

        if (assistanceDataToSend) {
          await AsyncStorage.setItem('assistanceDataToSend', JSON.stringify(assistanceDataToSend));
        }

        const storedSelectedPatient = await AsyncStorage.getItem('selectedPatient');
        const storedAssistanceDataToSend = await AsyncStorage.getItem('assistanceDataToSend');
        console.log('Retrieved selectedPatient from AsyncStorage:', storedSelectedPatient);
        console.log('Retrieved assistanceDataToSend from AsyncStorage:', storedAssistanceDataToSend);
        if (storedSelectedPatient) {
          setStoredSelectedPatient(JSON.parse(storedSelectedPatient));
        }
        if (storedAssistanceDataToSend) {
          setStoredAssistanceDataToSend(JSON.parse(storedAssistanceDataToSend));
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedPatient, assistanceDataToSend]);

  useEffect(() => {
    const fetchData = async () => {
      const storedUserId = await retrieveData('userId');
      const storedUserRole = await retrieveData('userRole');

      setUserId(storedUserId);
      setUserRole(storedUserRole);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          const fetchedUserData = userDoc.data();

          const role = fetchedUserData?.userRole;
          setUserRole(role);
          setUserId(user.uid);

          storeData('userId', user.uid);
          storeData('userRole', role);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkWorkStatus = async () => {
      try {
        if (storedAssistanceDataToSend && storedAssistanceDataToSend.fechaSalida && storedAssistanceDataToSend.ubicacionSalida) {
          setHasFinishedWork(true);
        }
      } catch (error) {
        console.error('Error checking work status:', error);
      }
    };
  
    checkWorkStatus();
  }, [storedAssistanceDataToSend]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let selectedPatientData = null;
        let assistanceDataToSend = null;
  
        if (selectedPatient) {
          await AsyncStorage.setItem('selectedPatient', JSON.stringify(selectedPatient));
          selectedPatientData = selectedPatient;
        } else {
          const storedSelectedPatient = await AsyncStorage.getItem('selectedPatient');
          selectedPatientData = storedSelectedPatient ? JSON.parse(storedSelectedPatient) : null;
        }
  
        if (assistanceDataToSend) {
          await AsyncStorage.setItem('assistanceDataToSend', JSON.stringify(assistanceDataToSend));
        } else {
          const storedAssistanceDataToSend = await AsyncStorage.getItem('assistanceDataToSend');
          assistanceDataToSend = storedAssistanceDataToSend ? JSON.parse(storedAssistanceDataToSend) : null;
  
          // Limpieza de los datos de persistencia aquí
          if (ubicacionSalida.latitude && ubicacionSalida.longitude && fechaSalida) {
            console.log("Starting persistence data cleanup...");
            await AsyncStorage.removeItem('assistanceDataToSend');
            await AsyncStorage.removeItem('selectedPatient');
            console.log("Persistence data cleared successfully.");
          }
        }
  
        setStoredSelectedPatient(selectedPatientData);
        setStoredAssistanceDataToSend(assistanceDataToSend);
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [selectedPatient, assistanceDataToSend]);

  console.log("----> Datos a dar persistencia  <------");
  console.log("###> UserId:   ", userId, "<###");
  console.log("###> Persiste: ", userRole, "<###-----");
  console.log("------------> Fin  <-----------------");
  console.log("Persistencia selectedPatient:", storedSelectedPatient);
  console.log("Persistencia assistanceDataToSend:", storedAssistanceDataToSend);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {storedAssistanceDataToSend ? (
          <>
            <CardBienvenida assistanceDataToSend={storedAssistanceDataToSend} />
            <CardUsuarioDatos selectedPatient={storedSelectedPatient}/>
            <CardUltimaMedicacion selectedPatient={storedSelectedPatient} />
            <PlanFarmacologicoScreen selectedPatient={storedSelectedPatient} /> 
          </>
        ) : (
          <SelectHouseScreen />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  patientInfo: {
    marginBottom: 15,
  },
  patientInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateTimeContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  dateTimeTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateTimeLabelText: {
    fontSize: 16,
    marginRight: 5,
    color: '#555',
  },
  dateTimeText: {
    fontSize: 16,
  },
});

export default HomeScreen;