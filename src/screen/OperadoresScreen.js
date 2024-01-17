import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { app } from '../firebase/firebase_auth';

const OperadoresScreen = () => {
  const navigation = useNavigation();
  const [usersData, setUsersData] = useState([]);
  console.log("UserData: ", usersData);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const db = getFirestore(app);
        const usuariosCollection = collection(db, 'usuarios');
        const usuariosSnapshot = await getDocs(usuariosCollection);
        const usuariosData = usuariosSnapshot.docs
          .map((doc) => doc.data())
          .filter(user => user.userRole === 'operador');
        setUsersData(usuariosData);
      } catch (error) {
        console.error('Error al obtener datos de usuarios:', error);
      }
    };

    fetchUsers();
  }, []); // empty dependency array to run once on mount

  useEffect(() => {
    console.log('UserData: ', usersData);
  }, [usersData]);

  const fetchAssistanceData = async (userId) => {
    try {
      const db = getFirestore(app);
      const assistanceCollection = collection(db, 'asistencia');
      const assistanceQuery = query(assistanceCollection, where('userId', '==', userId));
      const assistanceSnapshot = await getDocs(assistanceQuery);
      const assistanceData = assistanceSnapshot.docs.map((doc) => doc.data());
      console.log('AssistanceData for User ID', userId, ':', assistanceData);
    } catch (error) {
      console.error('Error al obtener datos de asistencia:', error);
    }
  };

  const renderOperatorItem = ({ item }) => (
    <TouchableOpacity
      style={styles.operatorItem}
      onPress={() => {
        navigation.navigate('DetailsOperador', { userData: item });
        fetchAssistanceData(item.id); // Fetch assistance data when an operator is selected
      }}
    >
      <Image
        style={styles.operatorImage}
        source={{ uri: item.photoUrl || 'https://www.revistadiabetes.org/wp-content/uploads/Manejo-del-paciente-psiquiatrico-con-diabetes3.jpg' }}
      />
      <View>
        <Text>{`${item.nombre || 'Nombre Desconocido'}`}{` ${item.apellido || 'Apellido Desconocido'}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={usersData.filter(user => user.userRole === 'operador')}
        renderItem={renderOperatorItem}
        keyExtractor={(item) => `${item.id}_${item.username}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  operatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    margin: 1,
  },
  operatorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default OperadoresScreen;