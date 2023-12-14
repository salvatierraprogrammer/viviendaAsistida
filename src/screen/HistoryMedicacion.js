import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const HistoryMedicacion = ({ route }) => {
  // Datos de ejemplo (sustitúyelos con los datos reales)
  const data = [
    {
      id: 1,
      hora: "20:00:00",
      responsable: "Javier Milton",
      imagen: "https://www.enfermeriayseguridaddelpaciente.com/wp-content/uploads/2020/12/medicacion.jpg",
    },
    // Agrega más elementos según sea necesario
  ];

  // Renderizar cada elemento de la lista
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Historial medicación:</Text>
            <Text style={styles.patientInfoText}>{`Hora: ${item.hora}`}</Text>
            <Text style={styles.patientInfoText}>{`Responsable: ${item.responsable}`}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.imagen }}
              style={styles.image}
              onError={(error) => console.error('Error loading image:', error)}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
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

export default HistoryMedicacion;