import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PlanFarmacologicoScreen = ({ route }) => {
  const { paciente } = route.params;
  const navigation = useNavigation();

  if (!paciente || !paciente.planFarmacologico) {
    return (
      <View style={styles.container}>
        <Text>Error: Estructura de datos del paciente incorrecta</Text>
      </View>
    );
  }

  const renderMedicationItem = ({ item }) => {
    const subtitle = paciente.planFarmacologico[item.subtitle];

    return (
      <Card style={styles.card}>
        <Card.Title
          title={item.title}
          subtitle={subtitle || 'No especificado'}
          left={(props) => (
            <Avatar.Icon {...props} icon={() => <MaterialCommunityIcons name="pill" size={24} />} />
          )}
          right={(props) => (
            <IconButton
              {...props}
              icon="dots-vertical"
              onPress={() => navigation.navigate('DetailsPlanFarma', { paciente, horaMedicacion: item.subtitle })}
            />
          )}
        />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Medicación de ${paciente.nombre}`}</Text>
      {paciente.planFarmacologico && (
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
  card:{
    marginBottom: 8,
    marginTop:8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 15,
  },
});

export default PlanFarmacologicoScreen;