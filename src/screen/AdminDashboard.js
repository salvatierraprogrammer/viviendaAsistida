import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, Pressable } from 'react-native';
import { vivienda } from '../data/vivienda';
import { useNavigation } from '@react-navigation/native';
import { users } from '../data/users';

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opciones: [
        { id: 1, name: "Usuarios" },
        { id: 2, name: "Operadores" },
        // { id: 3, name: "Pacientes" },
      ],
    };
  }

  renderOptionButton = ({ item }) => (
    <Pressable
      style={styles.button}
      key={item.id}
      onPress={() => this.handleOptionPress(item.name)}
    >
      <Text style={styles.optionText}>{item.name}</Text>
    </Pressable>
  );

  handleOptionPress = (optionName) => {
    const { navigation } = this.props;
    // Acciones específicas según la opción seleccionada
    switch (optionName) {
      case 'Operadores':
        console.log('Mostrar operadores:', users.filter(user => user.role === 'operator'));
        navigation.navigate('OperadoresScreen');
        // Puedes manejar la lista de operadores aquí
        break;
      case 'Usuarios':
        console.log('Mostrar pacientes:', vivienda);
        navigation.navigate('UsuariosScreen');
        // Puedes manejar la lista de pacientes aquí
        break;
      default:
        console.log('Opción no reconocida');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido, seleccione para comenzar</Text>
        <FlatList
          data={this.state.opciones}
          renderItem={this.renderOptionButton}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  button: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#5fbcc0',
    justifyContent: 'center',
    padding: 10,
    width: '44%',
    height: 200,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  title:{
    fontWeight: 'bold',
    // fontFamily: 'bold',
    fontSize: 18,
    margin: 5,
    padding: 10,
    backgroundColor: '#5fbcc0',
    width: '93%',
    height: 50,
    color: 'white',
    borderRadius: 9,
    textAlign: 'center',

  },
});