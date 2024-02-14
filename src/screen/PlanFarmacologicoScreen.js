import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PlanFarmacologicoScreen = ({ selectedPatient }) => {
  // const { selectedPatient } = route.params;
  const navigation = useNavigation();

  if (!selectedPatient || !selectedPatient.planFarmacologico) {
    return (
      <View style={styles.container}>
        <Text>Error: Estructura de datos del paciente incorrecta</Text>
      </View>
    );
  }

  const renderMedicationItem = ({ item }) => {
    const subtitle = selectedPatient.planFarmacologico[item.subtitle];
    const medicationHour = parseInt(subtitle, 10);
  
    // Obtener la hora actual
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
  
    // Determinar si la medicación está cerca de ser tomada
    const isNearMedicationTime = Math.abs(currentHour - medicationHour) <= 1;
  
    // Determinar si la medicación ya pasó
    const hasPassedMedicationTime = currentHour > medicationHour;
  
    // Definir el color de fondo según la lógica
    let backgroundColor;
  
    if (isNearMedicationTime) {
      backgroundColor = '#90EE90';
    } else if (hasPassedMedicationTime) {
      // Puedes ajustar el valor de opacidad para hacer el color más claro o más fuerte
      backgroundColor = 'rgba(255, 0, 0, 0.3)';
    } else {
      /* Color amarillo transparente con 50% de opacidad */
      backgroundColor = 'rgba(255, 255, 0, 0.5)';
    }
  
    return (
      <Card style={[styles.card, { backgroundColor }]}>
        <Card.Title
         
          title={item.title}
          subtitle={subtitle || 'No especificado'}
          left={(props) => (
            <Avatar.Icon  style={styles.cardCircu}  {...props} icon={() => <MaterialCommunityIcons name="pill" size={24} color="white" />} />
          )}
          right={(props) => (
            <IconButton
              {...props}
              icon="dots-vertical"
              onPress={() => navigation.navigate('DetailsPlanFarma', { selectedPatient, horaMedicacion: item.subtitle })}
            />
          )}
        />
        {/* Mostrar un ícono de cámara de fotos si está cerca de la hora de la medicación y no ha pasado */}
        {isNearMedicationTime && !hasPassedMedicationTime && (
         <Pressable onPress={() => handleCameraPress()} style={styles.cameraIconContainer}>
         <MaterialCommunityIcons name="camera" color="white" size={50} style={styles.cameraIcon} />
       </Pressable>
        )}
      </Card>
    );
  };
  const handleCameraPress = () => {
    // Aquí puedes colocar el código para abrir la cámara o mostrar un mensaje en la consola
    console.log('Presionaste el ícono de la cámara');
    // Código para abrir la cámara (si corresponde)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Medicación de ${selectedPatient.nombre}`}</Text>
      {selectedPatient.planFarmacologico && (
        <FlatList
          data={[
            { title: 'Mañana', subtitle: 'manana' },
            { title: 'Mediodía', subtitle: 'mediodia' },
            { title: 'Tarde', subtitle: 'tarde' },
            { title: 'Noche', subtitle: 'noche' },
          ]}
          keyExtractor={(item) => item.title}
          renderItem={renderMedicationItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    marginTop: 8,
    borderWidth: 2,
    borderColor: "#5fbcc0",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 15,
    borderWidth: 2,
    borderColor: "#5fbcc0",
    backgroundColor: "white",
    borderRadius: 20,
  },
  cameraIcon: {
    backgroundColor: 'green',
    borderRadius: 12,
    padding: 4,
    position: 'absolute',
    right: 10,
    top: 0,
  },
  cardCircu: {
    backgroundColor: '#5fbcc0',
  },
  cameraIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

});

export default PlanFarmacologicoScreen;