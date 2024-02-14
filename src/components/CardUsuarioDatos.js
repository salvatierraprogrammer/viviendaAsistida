import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const CardUsuarioDatos = ({ selectedPatient }) => {
    // Desestructura las propiedades del objeto selectedPatient
    console.log("CardUsuairoDatos: ", selectedPatient)
    if (!selectedPatient) {
        return (
            <View style={styles.container}>
                <Text>No hay datos de usuario disponibles</Text>
            </View>
        );
    }
    const { nombre, edad, diagnostico } = selectedPatient;

    return (
        <View style={styles.container}>
        <FlatList
            data={[selectedPatient]}
            keyExtractor={(item) => (item && item.id ? item.id.toString() : null)}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Datos del usuario:</Text>
                    <View style={styles.patientInfo}>
                        <Text style={styles.patientInfoText}>{`Nombre: ${nombre || 'Nombre no disponible'}`}</Text>
                        <Text style={styles.patientInfoText}>{`Edad: ${edad || 'Edad no disponible'}`}</Text>
                        <Text style={styles.patientInfoText}>{`Diagnóstico: ${diagnostico || 'Diagnóstico no disponible'}`}</Text>
                    </View>
                </View>
            )}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // padding: 20,
        // marginTop: 20,
        // height: 700,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        width: '100%',
        borderWidth: 2,
        borderColor: "#5fbcc0",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    patientInfo: {
        marginBottom: 15,
    },
    patientInfoText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default CardUsuarioDatos;