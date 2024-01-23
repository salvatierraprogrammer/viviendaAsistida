import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ButtonUsusuarios from '../components/ButtonUsusuarios';
import ButtonOperadores from '../components/ButtonOperadores';


const CardAdmin = (userRole) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
     <View style={styles.CardContainer}>

        <View style={styles.contenedorTexto}>    
            <Text  style={styles.title}>
                <AntDesign name="home" size={24} margin={10} color="#5fbcc0" />
                Bienvenido
            </Text>
            <Text  style={styles.description}>
                <AntDesign name="infocirlce" size={15} color="#5fbcc0" />
                Estas listo para llevar acabo el seguimiento de registro de vivienda.
            </Text>
            {/* Boton usurios */}
            <ButtonUsusuarios/>
            {/* Boton Operadores */}
            <ButtonOperadores/>
            
        </View>

        <Image 
            style={styles.imagen}
            source={{uri: 'https://cdn-icons-png.flaticon.com/128/1870/1870201.png'}}
        />
      
    </View>
    </View>
  );
};

export default CardAdmin

const styles = StyleSheet.create({
    CardContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '94%',
        height: 200,
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderColor: "#5fbcc0",
        borderWidth: 2,

    },
    imagen:{
        width: 200,
        height: 200,
        marginLeft: '57%',
        // marginTop: 1,
        marginBottom: 3,
    },
    contenedorTexto: {
        marginTop: 120,
    },
    title: {
        fontSize: 25,
        marginTop: 40,
        // marginBottom: 2,
        // fontWeight: 'bold',
    },
    description: {
        marginTop: 10,
        margin:1,
    

    },
});