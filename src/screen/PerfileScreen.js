import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  ScrollView, Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
// import { colors } from "../theme/colors";
import * as ImagePicker from "expo-image-picker";
import { usePutImageMutation } from "../services/ecApi";
import { useGetImageQuery } from "../services/ecApi";
import { Avatar, Card, IconButton } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slice/authSlice";
// import * as Location from "expo-location";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import {  app } from '../firebase/firebase_auth';

const PerfileScreen = ({ navigation }) => {
  // const [image, setImage] = useState(null);
  // // const [location, setLocation] = useState(null);

  const [putImage, result] = usePutImageMutation();

  const { data, isLoading, error, isError, refetch } = useGetImageQuery();

  const dispatch = useDispatch();
  const [fetchedUserData, setFetchedUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('fetchedUserData');
        const parsedUserData = JSON.parse(storedUserData);
        setFetchedUserData(parsedUserData);
  
        // Obtener la información del usuario de Firestore
        const db = getFirestore(app);
        const userDoc = doc(db, 'usuarios', parsedUserData.uid);
        const userSnapshot = await getDoc(userDoc);
  
        if (userSnapshot.exists()) {
          const userDataFromFirestore = userSnapshot.data();
          
          // Almacena los detalles del usuario en AsyncStorage
          await AsyncStorage.setItem('userDetails', JSON.stringify(userDataFromFirestore));
  
          // También podrías setear los detalles del usuario en el estado si es necesario
          setUserDetails(userDataFromFirestore);
        } else {
          console.warn('User does not exist in Firestore');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    fetchUserData();
  }, []);

  const { image } = fetchedUserData || {};
  const defaultImage =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.vecteezy.com%2Farte-vectorial%2F21548095-defecto-perfil-imagen-avatar-usuario-avatar-icono-persona-icono-cabeza-icono-perfil-imagen-iconos-defecto-anonimo-usuario-masculino-y-hembra-empresario-foto-marcador-de-posicion-social-red-avatar-retrato&psig=AOvVaw0SoWqcgivlaJWe-o7dR6Z-&ust=1705122856686000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCICT1uuL14MDFQAAAAAdAAAAABAt";

    const pickImage = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
          base64: true,
        });
  
        if (!result.cancelled) {
          await putImage({
            image: `data:image/jpeg;base64,${result.base64}`,
          });
  
          refetch();
        }
      } catch (error) {
        console.error('Error picking image:', error);
      }
    };
  
    const openCamera = async () => {
      try {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
        if (permissionResult.granted === false) {
          alert("No le has dado permiso a la Aplicación para acceder a tu cámara!");
          return;
        }
  
        const result = await ImagePicker.launchCameraAsync({
          base64: true,
        });
  
        if (!result.cancelled) {
          await putImage({
            image: `data:image/jpeg;base64,${result.base64}`,
          });
          refetch();
        }
      } catch (error) {
        console.error('Error opening camera:', error);
      }
    };
  
    const handleLogout = async () => {
      try {
        dispatch(clearUser());
        await AsyncStorage.removeItem("userEmail");
        navigation.navigate("rootNavigation");
      } catch (error) {
        console.log(error);
      }
    };
  const onLogout = () =>
    Alert.alert('Cerrar session?', '¿Estas seguro que deseas cerrar sesiòn?', [
      {
        text: 'NO',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'SI', onPress: () => handleLogout()},
    ]);

  return (
    <ScrollView>
     

      <View style={{ alignItems: "center", marginTop: 15 }}>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
      
            <ActivityIndicator
              style={{ flex: 1 }}
              size="large"
              color="#0000ff"
            />
          </View>
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: data ? data.image : defaultImage,
            }}
          />
        )}
              {/* <Card.Title
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
  /> */}
        <View style={styles.buttonContainer}>
          <View style={styles.containerButton}>
            <Pressable
              style={styles.containerIcon}
              onPress={() => openCamera()}
            >
              <Entypo name="camera" size={24} color="black" />
            </Pressable>
            <Text style={styles.textButton}>Abrir Cámara</Text>
          </View>
          <View style={styles.containerButton}>
            <Pressable style={styles.containerIcon} onPress={() => pickImage()}>
              <FontAwesome name="photo" size={24} color="black" />
            </Pressable>
            <Text style={styles.textButton}>Abrir Galería de fotos</Text>
          </View>
          
          <View style={styles.containerButton}>
            <Pressable style={styles.containerIcon} onPress={onLogout}>
            <Entypo name="log-out" size={24} color="black" />
            </Pressable>
            <Text style={styles.textButton}>Cerrar Session</Text>
          </View>
          {/* <View style={styles.containerButton}>
            <Pressable
              style={styles.containerIcon}
              onPress={() =>
                // navigation.navigate("mapaLoc")
                getCoords()
              }
            >
              <Feather name="map" size={24} color="black" />
            </Pressable>
            <Text style={styles.textButton}>Abrir Mapa</Text>
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 10,
  },
  containerButton: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  containerIcon: {
    borderWidth: 2,
    padding: 5,
    borderRadius: 8,
    
  },
  textButton: {
    marginLeft: 15,
    fontSize: 20,
  },
});


export default PerfileScreen;