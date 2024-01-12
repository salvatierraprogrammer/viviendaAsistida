import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Modal, TouchableOpacity } from 'react-native';
import { ImageViewer } from 'react-native-image-zoom-viewer';

const DetailsUltimaMEd = ({ route }) => {
  const { selectedPatient } = route.params;
  console.log("List", selectedPatient);
  const [selectedImage, setSelectedImage] = useState(null);

  // Filtrar los registros de medicación del paciente seleccionado
  const medicationRecords = selectedPatient?.registroMedicacion || [];

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    console.log('Close Image Modal');
    setSelectedImage(null);
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity onPress={() => openImageModal(item.imagen)}>
      <Image
        source={{ uri: item.imagen }}
        style={styles.image}
        resizeMode="cover"
        onError={(error) => console.error('Error loading image:', error)}
      />
    </TouchableOpacity>
  );

  const CustomHeader = () => (
    <TouchableOpacity onPress={closeImageModal} style={[styles.closeButton, { padding: 20 }]}>
      <Text style={styles.closeButtonText}>Cerrar</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {medicationRecords.length > 0 ? (
        <FlatList
          data={medicationRecords}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>Medicación:</Text>
                  <Text style={styles.patientInfoText}>{`Hora: ${item.hora}`}</Text>
                  <Text style={styles.patientInfoText}>{`Responsable: ${item.responsable}`}</Text>
                </View>
                <View style={styles.imageContainer}>{renderImageItem({ item })}</View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No hay registros de medicación para este paciente.</Text>
      )}

      <Modal visible={selectedImage !== null} transparent={true}>
        <ImageViewer
          imageUrls={[{ url: selectedImage }]}
          enableSwipeDown={true}
          onSwipeDown={closeImageModal}
          renderHeader={() => <CustomHeader />}
        />
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2', // Background color
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  patientInfoText: {
    marginBottom: 8,
  },
  imageContainer: {
    marginLeft: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 10,
    zIndex: 1, // Add this line
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DetailsUltimaMEd;