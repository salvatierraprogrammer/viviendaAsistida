import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de inicio de sesión (puedes implementarla según tus necesidades)
    // Aquí deberías verificar las credenciales, por ejemplo, con una API o datos simulados.

    // Simulación de roles basada en las credenciales (esto es solo un ejemplo, ajusta según tus necesidades)
    const userRole = getUserRole(username, password);

    // Redirige a la pantalla correspondiente según el rol
    if (userRole === 'admin') {
      navigation.navigate('AdminDashboard');
    } else if (userRole === 'operator') {
      navigation.navigate('SelectHouse');
    } else {
      // Manejo para credenciales incorrectas o rol no reconocido
      console.log('Credenciales incorrectas o rol no reconocido');
    }
  };

  // Función simulada para obtener el rol del usuario
  const getUserRole = (username, password) => {
    // Implementa la lógica real para obtener el rol del usuario
    // Puedes obtener esta información después del inicio de sesión.
    // Por ahora, simularemos que el usuario es un operador si el nombre de usuario es "operador"
    return username.toLowerCase() === 'operador' ? 'operator' : 'admin';
  };

  return (
    <View>
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;