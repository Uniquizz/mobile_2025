import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../../styles/colors';          // Paleta centralizada

/**
 * Muestra la pregunta y, si existe, la imagen asociada.
 * Props:
 *  • question        → string  (texto de la pregunta)
 *  • hasImage        → boolean (¿hay imagen?)
 *  • imageUrl        → string  (URL de la imagen)
 */
const QuestionBlock = ({ question, hasImage, imageUrl }) => (
  <>
    {/* Pregunta */}
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question}</Text>
    </View>

    {/* Imagen (opcional) */}
    {hasImage && (
      <View style={styles.questionImageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.questionImage}
          resizeMode="contain"
        />
      </View>
    )}
  </>
);

const styles = StyleSheet.create({

  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    lineHeight: 30,
  },
  questionImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: colors.surfaceHighlight,
  },
  questionImage: {
    width: '100%',
    height: '100%',
  },
});

export default QuestionBlock;
