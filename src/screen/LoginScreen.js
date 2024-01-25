import React, { useState } from 'react';
import {SafeAreaView, View, Pressable, Image, StyleSheet, TextInput, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setIdToken, setUser } from '../redux/slice/authSlice';
import { firebase_auth} from '../firebase/firebase_auth';

import { useNavigation } from '@react-navigation/native';


const LoginScreen = ({ }) => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setLoading(true); // Indicar que se está cargando
      const response = await signInWithEmailAndPassword(
        firebase_auth,
        email,
        password
      );
      AsyncStorage.setItem("userEmail", response.user.email);
      dispatch(setUser(response.user.email));
      dispatch(setIdToken(response._tokenResponse.idToken));
      // console.log(response);
    } catch (e) {
      console.log("Error en Login", e);
      setError("Credenciales incorrectas. Por favor, inténtelo de nuevo.");
    } finally {
      setLoading(false); // Indicar que la carga ha finalizado
    }
  };


  return (
    <SafeAreaView style={styles.container}>

      <Image
        source={{
          uri: 'data:image/png;base64,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' }}
        style={styles.logo}
      />
      <TextInput
        placeholder='correo@email.com'
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder='Contraseña'
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
     <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text style={styles.texto}>
            Comenzar
          </Text>
        )}
      </TouchableOpacity>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      <Pressable onPress={() => {
        navigation.navigate('registreScreen');
      }}>
        <Text style={[styles.texto, { color: '#5fbcc0', marginTop: 20 }]}>
          No tienes cuenta? Registrate
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  input: {
    padding: 10,
    paddingStart: 30,
    height: 50,
    width: '80%',
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#5fbcc0",
  },
  button: {
    marginTop: 10,
    backgroundColor: '#5fbcc0',
    width: '50%',
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: 'white',
    fontSize: 20,
  },
  errorText:{
    color: "red",
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default LoginScreen;