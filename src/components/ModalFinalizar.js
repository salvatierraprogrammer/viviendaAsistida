import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';

const ModalFinalizar = ({ visible, onConfirm, onCancel }) => {
  return (
    <View>
      <Modal
        visible={visible}
        onDismiss={onCancel}
        animationType="slide"
        modalStyle={{
          borderRadius: 10,
        }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Estás listo para finalizar tu turno?
          </Text>
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={onCancel}
              style={styles.cancelButton}
              labelStyle={styles.buttonLabel}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={onConfirm}
              style={styles.confirmButton}
              labelStyle={styles.buttonLabel}
            >
              Confirmar
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 30,
    height: 250,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#ff79c6',
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: '#4caf50',
  },
  buttonLabel: {
    color: 'white',
  },
});

export default ModalFinalizar;