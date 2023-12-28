import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DetailsPlanFarmacologico = ({ route }) => {
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

  // Split the medication string into an array of medications
  const medications = subtitle ? subtitle.split(',').map((med) => med.trim()) : [];

  return (
    <Card style={[styles.card, styles.largeCard]}>
      <Card.Title
        title={item.title}
        subtitle={subtitle || 'No especificado'}
        left={(props) => (
          <Avatar.Icon style={styles.cardCircu} {...props} icon={() => <MaterialCommunityIcons name="pill" size={24} color="white" />} />
        )}
        right={(props) => (
          <IconButton
            {...props}
            icon="dots-vertical"
            onPress={() => navigation.navigate('DetailsPlanFarma', { paciente, horaMedicacion: item.subtitle })}
          />
        )}
      />
      <Card.Content>
        {/* Display the list of medications */}
        <FlatList
          data={medications}
          keyExtractor={(med) => med}
          renderItem={({ item: med }) => (
            <Text key={med}>{`${med}`}</Text>
          )}
        />
      </Card.Content>
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
  card: {
    marginBottom: 8,
    marginTop: 8,
    backgroundColor: 'white',
  },
  largeCard: {
    minHeight: 120,
    padding: 16,
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
  cardCircu: {
    backgroundColor: '#5fbcc0',
  },
});

export default DetailsPlanFarmacologico;