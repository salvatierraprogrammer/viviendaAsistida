import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { usePutImageMutation } from "../services/ecApi";
import { useGetImageQuery } from "../services/ecApi";
import { Avatar, IconButton } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { cleareUser } from "../redux/slice/authSlice";
import { getFirestore, doc, getDoc, updateDoc, } from 'firebase/firestore';
import { app } from '../firebase/firebase_auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PerfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [putImage, result] = usePutImageMutation();
  const { data, isLoading, error, isError, refetch } = useGetImageQuery();
  const dispatch = useDispatch();
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          const fetchedUserData = userDoc.data();
          const photo = fetchedUserData?.photoUrl;
          setPhotoUrl(photo);
          // console.log("Foto:", photo);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // console.log("Foto url:", photoUrl);

  const defaultImage =
    "https://www.revistadiabetes.org/wp-content/uploads/Manejo-del-paciente-psiquiatrico-con-diabetes3.jpg";

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        base64: true,
      });
  
      if (!result.canceled) {
        handleImageUpload(result.assets[0].base64);
      }
    };
  
    const openCamera = async () => {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("No le has dado permiso a la Aplicación para acceder a tu cámara!");
        return;
      } else {
        const result = await ImagePicker.launchCameraAsync({
          base64: true,
        });
  
        // console.log(result);
  
        if (!result.canceled) {
          handleImageUpload(result.assets[0].base64);
        }
      }
    };

    const handleImageUpload = async (base64Image) => {
      try {
        await putImage({
          image: `data:image/jpeg;base64,${base64Image}`,
        });
        refetch();
        setPhotoUrl(`data:image/jpeg;base64,${base64Image}`);
    
        // Actualizar la URL de la foto en Firestore
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (user) {
          const db = getFirestore();
          const userRef = doc(db, 'usuarios', user.uid);
          await updateDoc(userRef, { photoUrl: `data:image/jpeg;base64,${base64Image}` });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

  const handleLogout = async () => {
    try {
      dispatch(cleareUser());
      await AsyncStorage.removeItem("userEmail");
    } catch (error) {
      console.log(error);
    }
  }

  const onLogout = () =>
    Alert.alert('Cerrar session?', '¿Estas seguro que deseas cerrar sesiòn?', [
      {
        text: 'NO',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'SI', onPress: () => handleLogout() },
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
              uri: photoUrl ? photoUrl : defaultImage,
            }}
          />
        //   <Image
        //   style={styles.operatorImage}
        //   source={{ uri: item.photoUrl || 'https://www.revistadiabetes.org/wp-content/uploads/Manejo-del-paciente-psiquiatrico-con-diabetes3.jpg' }}
        // />
        )}
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













// import {
//   Image,
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   ActivityIndicator,
//   ScrollView, Alert,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { Entypo } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";
// import { Feather } from "@expo/vector-icons";
// // import { colors } from "../theme/colors";
// import * as ImagePicker from "expo-image-picker";
// import { usePutImageMutation } from "../services/ecApi";
// import { useGetImageQuery } from "../services/ecApi";
// import { Avatar, Card, IconButton } from 'react-native-paper';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useDispatch } from "react-redux";
// import { clearUser, cleareUser } from "../redux/slice/authSlice";
// // import * as Location from "expo-location";
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import {  app } from '../firebase/firebase_auth';

// const PerfileScreen = ({ navigation }) => {
//   const [image, setImage] = useState(null);
//   // // const [location, setLocation] = useState(null);

//   const [putImage, result] = usePutImageMutation();

//   const { data, isLoading, error, isError, refetch } = useGetImageQuery();

//   const dispatch = useDispatch();
//   // const [fetchedUserData, setFetchedUserData] = useState(null);

 

//   // const { image } = fetchedUserData || {};
//   const defaultImage =
//     "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.vecteezy.com%2Farte-vectorial%2F21548095-defecto-perfil-imagen-avatar-usuario-avatar-icono-persona-icono-cabeza-icono-perfil-imagen-iconos-defecto-anonimo-usuario-masculino-y-hembra-empresario-foto-marcador-de-posicion-social-red-avatar-retrato&psig=AOvVaw0SoWqcgivlaJWe-o7dR6Z-&ust=1705122856686000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCICT1uuL14MDFQAAAAAdAAAAABAt";

//     const pickImage = async () => {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 4],
//         quality: 1,
//         base64: true,
//       });
  
//       if (!result.canceled) {
//         await putImage({
//           image: `data:image/jpeg;base64,${result.assets[0].base64}`,
//         });
  
//         refetch();
//       }
//     };
//     const openCamera = async () => {
//       const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
//       if (permissionResult.granted === false) {
//         alert("No le has dado permiso a la Aplicación para acceder a tu cámara!");
//         return;
//       } else {
//         const result = await ImagePicker.launchCameraAsync({
//           base64: true,
//         });
  
//         console.log(result);
  
//         if (!result.canceled) {
//           await putImage({
//             image: `data:image/jpeg;base64,${result.assets[0].base64}`,
//           });
//           refetch();
//         }
//       }
//     };

  
//     const handleLogout = async () => {
//       try {
//         dispatch(cleareUser());
//         await AsyncStorage.removeItem("userEmail");
//         //  navigation.navigate("login");
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     const onLogout = () =>
//       Alert.alert('Cerrar session?', '¿Estas seguro que deseas cerrar sesiòn?', [
//         {
//           text: 'NO',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {text: 'SI', onPress: () => handleLogout()},
//       ]);
      

//   return (
//     <ScrollView>
     

//       <View style={{ alignItems: "center", marginTop: 15 }}>
//         {isLoading ? (
//           <View
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               alignContent: "center",
//             }}
//           >
      
//             <ActivityIndicator
//               style={{ flex: 1 }}
//               size="large"
//               color="#0000ff"
//             />
//           </View>
//         ) : (
//           <Image
//             style={styles.image}
//             source={{
//               uri: data ? data.image : defaultImage,
//             }}
//           />
//         )}
//               {/* <Card.Title
//     title="Card Title"
//     subtitle="Card Subtitle"
//     left={(props) => <Avatar.Icon {...props} icon="folder" />}
//     right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
//   /> */}
//         <View style={styles.buttonContainer}>
//           <View style={styles.containerButton}>
//             <Pressable
//               style={styles.containerIcon}
//               onPress={() => openCamera()}
//             >
//               <Entypo name="camera" size={24} color="black" />
//             </Pressable>
//             <Text style={styles.textButton}>Abrir Cámara</Text>
//           </View>
//           <View style={styles.containerButton}>
//             <Pressable style={styles.containerIcon} onPress={() => pickImage()}>
//               <FontAwesome name="photo" size={24} color="black" />
//             </Pressable>
//             <Text style={styles.textButton}>Abrir Galería de fotos</Text>
//           </View>
          
//           <View style={styles.containerButton}>
//             <Pressable style={styles.containerIcon} onPress={onLogout}>
//             <Entypo name="log-out" size={24} color="black" />
//             </Pressable>
//             <Text style={styles.textButton}>Cerrar Session</Text>
//           </View>
//           {/* <View style={styles.containerButton}>
//             <Pressable
//               style={styles.containerIcon}
//               onPress={() =>
//                 // navigation.navigate("mapaLoc")
//                 getCoords()
//               }
//             >
//               <Feather name="map" size={24} color="black" />
//             </Pressable>
//             <Text style={styles.textButton}>Abrir Mapa</Text>
//           </View> */}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     marginTop: 10,
//   },
//   containerButton: {
//     marginVertical: 20,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   containerIcon: {
//     borderWidth: 2,
//     padding: 5,
//     borderRadius: 8,
    
//   },
//   textButton: {
//     marginLeft: 15,
//     fontSize: 20,
//   },
// });


// export default PerfileScreen;
