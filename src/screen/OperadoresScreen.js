import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { app } from '../firebase/firebase_auth';

const OperadoresScreen = () => {
  const navigation = useNavigation();
  const [usersData, setUsersData] = useState([]);
  console.log(usersData);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const db = getFirestore(app);
        const usuariosCollection = collection(db, 'usuarios');
        const usuariosSnapshot = await getDocs(query(usuariosCollection, where('userRole', '==', "operador"))); // Cambié 'operador' por 1, asumiendo que 1 es el código para 'operador'
        const usuariosData = usuariosSnapshot.docs.map((doc) => doc.data());
        setUsersData(usuariosData);
        

      } catch (error) {
        console.error('Error al obtener datos de usuarios:', error);
      }
    };

    fetchUsers();
  }, []); // empty dependency array to run once on mount



  const renderOperatorItem = ({ item }) => (
    <TouchableOpacity
      style={styles.operatorItem}
      onPress={() => {
        navigation.navigate('DetailsOperador', { userData: item });
        // fetchAssistanceData(item.id); // Fetch assistance data when an operator is selected
      }}
    >
      <Image
        style={styles.operatorImage}
        source={{ uri: item.photoUrl || 'https://www.revistadiabetes.org/wp-content/uploads/Manejo-del-paciente-psiquiatrico-con-diabetes3.jpg' }}
      />
      <View>
        <Text>{`${item.nombre || 'Nombre Desconocido'} ${item.apellido || 'Apellido Desconocido'}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
     <FlatList
        data={usersData}
        renderItem={renderOperatorItem}
        keyExtractor={(item) => item.userId}
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