import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';

const CardDetailsOperador = ({ userData }) => {
  const navigation = useNavigation();
  // console.log("users", userData)
  const { nombre, apellido, photoUrl } = userData;



  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{`${nombre} ${apellido}`}</Text>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.patientInfoText}>
            {/* {`Último ingreso: ${formattedDate} ${formattedTime}`} */}
          </Text>
          <Text style={styles.patientInfoText}>
            {/* {`Ubicación: ${ubicacionIngreso}`} */}
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.terminarHorarioButton,
              { backgroundColor: pressed ? 'red' : 'green' },
            ]}
            onPress={() => navigation.navigate('Trabajando')}
          >
            <Text style={styles.buttonText}>Activo</Text>
          </Pressable>
        </View>
        <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={photoUrl ? { uri: userDetails?.photoUrl } : { uri: 'https://psicofeminista.com/wp-content/uploads/2023/08/perfil-por-defecto-1-800x600.png' }}
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
    width: '90%',
    marginTop: 10,
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

export default CardDetailsOperador;