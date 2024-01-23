import React, { useEffect, useState } from 'react';
import { View, FlatList, Pressable, Text, StyleSheet, Image, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useGetViviendaQuery } from '../services/ecApi';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import CardAdmin from './CardAdmin';
import { useNavigation } from '@react-navigation/native';

const SelectHouseScreen = ({ route }) => {
  const { data: vivienda, isLoading } = useGetViviendaQuery();
  const [userRole, setUserRole] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          const fetchedUserData = userDoc.data();

          // Assuming your user data has a 'userRole' field
          const role = fetchedUserData?.userRole; // Use optional chaining to handle undefined
          setUserRole(role);
          console.log("Rol del usuario:", role);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleHouseSelection = (house) => {
    navigation.navigate('SelectPatients', { house });
  };

  const renderHouseButton = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      key={item.id}
      onPress={() => handleHouseSelection(item.nombre)}
    >
      <FontAwesome5 name="house-user" size={24} color="black" />
      <Text style={styles.houseName}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      ) : (
        <>
          <Image
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///9hvcCCyMtZur33+/tRuLu33+G74OF6xchkvsHj8/Pb7+9bu75vwsX7/f3K5+if1des2tyNztDg8fLG5ufw+PjU7O2h1tiw3N6U0NN/yMt1w8by+PnB4uNItrmLy86B2OwKAAAFiElEQVR4nO2d6XriOhBERxEOMQjCEkiAYfL+b3mdkMUGy+6W1Fq4df7HX5e3srpa5M8fAAAAAAAAAAAAAABAiSwfU1cgzaF6Tl2CLNNK6V3qIiTZaqXMYpm6DDkmtWrQh9R1yHE0HwpV9Za6ECnWWl3Q89SlyPBcqR8mqYuRYKZ/BZqn1NUIsFyYX4VKr1LXE55NW2DztnlJXVBoHivVpZqlLiks82uBjfHf1dtmV18LbCRuUlcVkidzq1DpOzL+le4R2DyK+9SFheLl5iH8vlHvZJkx67tFLwrvw/iXtVXhnSwz3u0Cm0fxnLo8f26s/uoqFm/8+2GBStWFG/9u6Bb9xDykrtGP06hCpdepi/TBYvVdSjb+89hD+HUVizX+GeUKNphT6kodGbL6q4tYqPE/UAU2j+I0dbEurIn36EXiNnW5fEatvkt5xj9u9V3MMXXFXBZMhUq/pi6Zx4HzEF4oK1ic8h7CCyWt+LcuAksKFicu+lRJ/UWG1Xcpxfhf+W+ZH4lFBIvPTg/hNwW8bXbuV1CV0V9kW32X/I1/4ycw/2Dx0ese/cRk3V+c+wvM2/gnvrfoRWLG/cVjEIUZTxR5WP2VxEz7i9aYkE+ey4xZOIHN2ya1mh6WnlbfJceJIm+r75JfsPgW8B79RGfWX2T2Dink1V/k9g4p5GX8hJiQT5VRsEiKCR0kZmP8xJiQTy7GH9LqrxTmYfyTnrnDUOQRLAa2+i459BdZMaHRVYNmnJP0xs+xeq0O5/lsNj+vFhVZpEls/Ayr1/X5tz2x3VAvZOpgkW711arbftlS1yJpJ4roMWHPWmFD/OOUwSI9JtR9XVDq+Uk3UUSPCS13GvEeT2b8dKu3DT1Rh6ZSGT+9d2gNzVbEQ1RJ9kfTe4f2uTXqRUyyY5Fh9dr+6dW71aT3LEU3fvLZV4Oz3GuywtjBIq93aD/OM/lExQ4WqW79ycDL/nZPm5W4weLIFoMuQzcYZ/Ucc8ci48x/MDACzJktihgs9u0mHKK2H2rPWl1Gmygiv+K/K/trPdSU1aWLFSyye4fa3hVktkDi9Bf5MaGxflayu1gx+oscq/+msn2QvHAPFsH46VsM2nXZ3JrfiJRfZrj1Di0dM1af7gvpYJFl9S16ozK3SE7W+J1jwj63ZnlhC8lgceeo70NifX2jOg+ISQaLXjGhfm2f++2De54j11/0jAmNXu0vInfnI73p3YOU8fvHhEZX6vR00qzkog+Z/qKL1fepDBFVmZPAMsPJ6sWQMP5Ac4ehCB8sunx+iBJ6x6LARJAvYY1fYiLIl7DBYtC5w1CE7C867CaMQbhgUWwiyJdQK/4QWwxkCNRflJwI8iVMfzEzq+8SwviDbTGQwX/Hot9uwgjU9nYziRytvouv8Wdp9V38Ni4c8hfoFyy69g4j475jMV+r7+Js/GF2E14VY7TWQRoZnaM69hdDW73RZnFYP07fVsfaq9V2i1uwuPqnh+CWaKrT+edDebI/aHYKOcQ/h/7icj8fYvvKzDaPVx8fkzXvJFXz2QBbgTCDlU8b05MY/X3nvKqr6PufObGDWfQv5DjHsKasYjCqs0/uMb56c1Y49JN6dIk5Kxz8vRJyHzZjhSP9Iuq3fb4KzfvwcaifhvkqHI3dB39JuQCF45+MxMAgW4V6vGtL6+Vlq1CNt1Fo33+5KqRMadEmobNVSGii7EgPYq4KSf/DomyFlJ406VVTtMLT3SskTVVDYXigEApbQCEUCgGFUNgCCqFQCCiEwhZQCIVCQCEUtoBCKBQCCqGwBRRCoRBQCIUtoBAKhYBCKGwBhVAoBBRCYQsohEIhoPCLmgDpQNkqDAYUQiEUQuFdKqxMVOIrfHl6iMopq38WCAAAAAAAAAAAAADA/5D/AKvVa8lSXIjhAAAAAElFTkSuQmCC' }}
            style={styles.logo}
          />

          {/* Render based on userRole */}
          {userRole === 'admin' ? (
            <>
              <Text style={styles.welcomeText}>{`vivienda asistida`}</Text>
              <CardAdmin userRole={userRole} />
            </>
          ) : (
            <>
              <Text style={styles.welcomeText}>{`Bienvenido selecciona una vivienda para comenzar la jornada laboral`}</Text>
              <FlatList
                data={vivienda}
                renderItem={renderHouseButton}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
              />
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5fbcc0',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '44%',
    height: 200,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: "#5fbcc0",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 25,
  },
  houseName: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectHouseScreen;