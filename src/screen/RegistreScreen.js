import React, { useState } from 'react';
import { View, Pressable, Image, StyleSheet, Text, TextInput, Alert } from 'react-native';
import {  Button } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebase_auth, app } from '../firebase/firebase_auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useGetUsuariosQuery } from "../services/ecApi";

const RegistreScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("operador");
  const [error, setError] = useState(null);

  const handleRegistre = async () => {
    try {
      // Validaciones
      if (nombre.trim() === "") {
        setError("Por favor, ingresa tu nombre.");
        return;
      }
      
      if (apellido.trim() === "") {
        setError("Por favor, ingresa tu apellido.");
        return;
      }
      
      if (dni.length <= 8) {
        setError("El DNI debe tener más de 8 caracteres.");
        return;
      }
      
      if (phoneNumber.length <= 9) {
        setError("El número de teléfono debe tener más de 10 caracteres.");
        return;
      }
      
     

      // Validar formato de correo electrónico
      const emailRegex = /^(?=.*[@])(?=.*[.]).*$/;
      const validEmailProviders = ["gmail.com", "hotmail.com", "yahoo.com"];
      const emailProvider = email.split("@")[1];
      if (!emailRegex.test(email) || !validEmailProviders.includes(emailProvider)) {
        setError("Ingresa un correo electrónico válido de Gmail, Hotmail o Yahoo.");
        return;
      }

      // Validar longitud de la contraseña
      if (password.length <= 5) {
        setError("La contraseña debe tener al menos 7 caracteres.");
        return;
      }

      // Crear el usuario en Firebase Authentication
      const response = await createUserWithEmailAndPassword(
        firebase_auth,
        email,
        password
      );

      // Asignar un ID único al usuario
      const userId = response.user.uid;

      // Agregar el nuevo usuario a la base de datos con datos de asistencia
      const db = getFirestore(app);
      await setDoc(doc(db, 'usuarios', userId), {
        userId: userId,
        userRole: userRole,
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        phoneNumber: phoneNumber,
        photoUrl: null,
      });

      // Navegar a la pantalla de inicio de sesión después del registro exitoso
      navigation.navigate("login");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };
  


  return (
    <View style={styles.container}>
      <Image source={{ uri: 'data:image/png;base64,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' }} style={styles.logo} />
      <TextInput
      
      placeholder="Nombre "
        onChangeText={(text) => setNombre(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido "
        onChangeText={(text) => setApellido(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Dni"
        onChangeText={(text) => setDni(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefono"
        onChangeText={(text) => setPhoneNumber(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Escriba su email aqui"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Nueva contraseña"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleRegistre}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Crear cuenta
      </Button>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <Pressable style={styles.cuenta} onPress={() => { navigation.navigate("login") }}>
        <Text style={styles.cuentatext}>Ya tienes cuenta? Iniciar sesión</Text>
      </Pressable>
    </View>
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
    marginTop:20,
    borderRadius:30,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderWidth: 2, // Ancho del borde
    borderColor: "#5fbcc0",
  },
  button: {
    backgroundColor: '#5fbcc0',
  },
  buttonText: {
    color: 'white',
  },
  cuentatext: {
    marginTop: 10,
    fontSize: 15,
    color: '#5fbcc0',
  },
  errorText:{
    color: "red",
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default RegistreScreen;