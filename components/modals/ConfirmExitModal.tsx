import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BaseModal from './BaseModal';
import colors from '../../styles/colors';
import useQuizStore from '../../store/useQuizStore';

const ConfirmExitModal = () => {
  
  const { ui: {modalVisible}, toggleModal, fadeOut } = useQuizStore()

  const handleConfirmExit = () => {
      toggleModal();
      fadeOut(() => {
        // navigator.navigate('Score')
      })
    };

  return (
    <BaseModal visible={modalVisible} onClose={toggleModal}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>¿Seguro que quieres salir?</Text>
        <Text style={styles.modalText}>Si sales, tu progreso se perderá.</Text>

        <View style={styles.modalButtons}>
          <TouchableOpacity style={[styles.modalButton, styles.modalConfirmButton]} onPress={handleConfirmExit}>
            <Text style={styles.modalButtonText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.modalButton, styles.modalCancelButton]} onPress={toggleModal}>
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: colors.textSecondary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '40%',
  },
  modalConfirmButton: {
    backgroundColor: colors.primary,
  },
  modalCancelButton: {
    backgroundColor: colors.border,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ConfirmExitModal;
