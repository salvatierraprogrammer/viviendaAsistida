import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { users } from '../data/users';
import { useNavigation } from '@react-navigation/native';

const OperadoresScreen = () => {
  const navigation = useNavigation();

  const renderOperatorItem = ({ item }) => (
    <TouchableOpacity
      style={styles.operatorItem}
      onPress={() => navigation.navigate('DetailsOperador', { userData: item })}
    >
      <Image
        style={styles.operatorImage}
        source={{ uri: item.photoUrl || 'https://www.revistadiabetes.org/wp-content/uploads/Manejo-del-paciente-psiquiatrico-con-diabetes3.jpg' }}
      />
      <Text>{`${item.firstName} ${item.lastName}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      {/* <Text>OperadoresScreen</Text> */}
      <FlatList
        data={users.filter(user => user.role === 'operator')}
        renderItem={renderOperatorItem}
        keyExtractor={(item) => `${item.id}_${item.username}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  operatorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  operatorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default OperadoresScreen;