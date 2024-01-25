import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import CardUltimaMedicacion from './CardUtimaMedicacion';
import CardBienvenida from './CardBienvenida';
import PlanFarmacologicoScreen from './PlanFarmacologicoScreen';
import CamaraScreen from './CamaraScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import SelectHouseScreen from './SelectHouseScreen';


const HomeScreen = ({ navigation, route }) => {
  const { selectedPatient, assistanceDataToSend } = route.params || {};
  // const ubicacionSalida = (assistanceDataToSend && assistanceDataToSend.ubicacionSalida) || null;
  // console.log("USar variable",ubicacionSalida);

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          const fetchedUserData = userDoc.data();

          // Assuming your user data has a 'userRole' field
          const role = fetchedUserData?.userRole; // Use optional chaining to handle undefined
          setUserRole(role);
          // console.log("Rol del usuario a condicionar:", role);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // console.log("Rol del usuario a condicionar:", userRole);

    
  
    const renderItem = () => (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Datos del usuario:</Text>
        <View style={styles.patientInfo}>
          <Text style={styles.patientInfoText}>{`${selectedPatient?.nombre || 'Nombre no disponible'}`}</Text>
          <Text style={styles.patientInfoText}>{`Edad: ${selectedPatient?.edad || 'Edad no disponible'}`}</Text>
          <Text style={styles.patientInfoText}>{`Diagnóstico: ${selectedPatient?.diagnostico || 'Diagnóstico no disponible'}`}</Text>
        </View>
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
        {selectedPatient ? (
          <FlatList
            data={[selectedPatient]}
            keyExtractor={(item) => (item && item.id ? item.id.toString() : null)}
            renderItem={renderItem}
            ListHeaderComponent={() => <CardBienvenida route={{ params: { assistanceDataToSend } }} />}
            ListFooterComponent={() => (
              <>
                {/* <CamaraScreen/> */}
                {selectedPatient && <CardUltimaMedicacion selectedPatient={selectedPatient} />}
                {selectedPatient && <PlanFarmacologicoScreen route={{ params: { selectedPatient } }} />}
                {(!selectedPatient && !assistanceDataToSend) && <SelectHouseScreen />}
              </>
            )}
          />
        ) : (
          <>
            {/* <CamaraScreen/> */}
            {selectedPatient && <CardUltimaMedicacion selectedPatient={selectedPatient} />}
            {selectedPatient && <PlanFarmacologicoScreen route={{ params: { selectedPatient } }} />}
            {(!selectedPatient && !assistanceDataToSend) && <SelectHouseScreen />}
          </>
        )}
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
 
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
    color: '#555', // Puedes ajustar el color según tus preferencias
  },
  dateTimeText: {
    fontSize: 16,
  },
});

export default HomeScreen;