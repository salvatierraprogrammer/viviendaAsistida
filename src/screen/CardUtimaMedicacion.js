import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CardUltimaMedicacion = ({ route }) => {
  // Datos de ejemplo (sustitúyelos con los datos reales)
  const data = {
    ultimaMedicacion: {
      hora: "20:00:00",
      fecha:"12/11/2023",
      responsable: "Javier Milton",
      imagen: "https://www.enfermeriayseguridaddelpaciente.com/wp-content/uploads/2020/12/medicacion.jpg",
    },
  };

  // Extraer datos de la última medicación
  const { hora, responsable, imagen } = data.ultimaMedicacion;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Ultima medicación:</Text>
            <Text style={styles.patientInfoText}>{`Hora: ${hora}`}</Text>
            <Text style={styles.patientInfoText}>{`Responsable: ${responsable}`}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imagen }}
              style={styles.image}
              onError={(error) => console.error('Error loading image:', error)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 16,
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  patientInfoText: {
    marginBottom: 4,
  },
  imageContainer: {
    marginLeft: 16,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 10,
  },
});

export default CardUltimaMedicacion;
