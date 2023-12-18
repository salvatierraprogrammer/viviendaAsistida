import React from 'react';
import { View, FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { vivienda } from '../data/vivienda';  // Add this import statement

const SelectHouseScreen = ({ navigation, route }) => {
  const { userData } = route.params;
  const { lastName, firstName } = userData;
  console.log("Nombre", lastName, firstName);
  const handleHouseSelection = (house) => {
    // Lógica de selección de casa (puedes implementarla según tus necesidades)

    // Después de seleccionar la casa, navegar a la pantalla de gestión de usuarios.
    navigation.navigate('SelectPatients', { house, userData });
  };

  const renderHouseButton = ({ item }) => (
    <Pressable
      style={styles.button}
      key={item.id}
      onPress={() => handleHouseSelection(item.nombre)}
    >
      <FontAwesome5 name="house-user" size={24} color="black" />
      <Text style={styles.houseName}>{item.nombre}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{`Bienvenido ${firstName} ${lastName}, selecciona una vivienda para comenzar la jornada laboral`}</Text>
      <FlatList
        data={vivienda}
        renderItem={renderHouseButton}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '44%',
  },
  houseName: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectHouseScreen;