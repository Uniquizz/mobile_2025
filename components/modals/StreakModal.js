import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BaseModal from './BaseModal';
import colors from '../../styles/colors';

const StreakModal = ({ visible, onClose, streak }) => {
  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={styles.streakModal}>
        <Text style={styles.streakModalTitle}>¡Racha de {streak} días!</Text>
        <View style={styles.streakModalIcon}>
          <Text style={styles.streakModalEmoji}>🔥</Text>
          <Text style={styles.streakModalCount}>{streak}</Text>
        </View>
        <Text style={styles.streakModalText}>
          Mantén tu racha diaria respondiendo preguntas correctamente.
        </Text>
        <TouchableOpacity
          style={styles.streakModalButton}
          onPress={onClose}
        >
          <Text style={styles.streakModalButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  streakModal: {
    width: '80%',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  streakModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  streakModalIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  streakModalEmoji: {
    fontSize: 40,
    marginRight: 10,
  },
  streakModalCount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
  },
  streakModalText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  streakModalButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  streakModalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default StreakModal;
