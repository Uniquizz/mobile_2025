// src/components/atoms/ProgressBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';          // ⬅️ importa tu paleta centralizada

const ProgressBar = ({ progress, currentQuestion, totalQuestions }) => (
  <View style={styles.progressContainer}>
    <View style={styles.progressBarBackground}>
      <View
        style={[
          styles.progressBarFill,
          { width: `${progress}%` }            // mismo cálculo dinámico
        ]}
      />
    </View>
    <Text style={styles.progressText}>
      {currentQuestion + 1}/{totalQuestions}
    </Text>
  </View>
);

const styles = StyleSheet.create({

  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    width: 40,
    textAlign: 'right',
  },
});

export default ProgressBar;
