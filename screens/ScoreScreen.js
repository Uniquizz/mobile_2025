// Pantalla de resultados (ScoreScreen) componetizada con diseño original
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../styles/colors';
import PrimaryButton from '../components/PrimaryButton';

import * as Icon from 'react-native-feather';

const ScoreScreen = ({
  score,
  streak,
  answeredQuestions,
  selectedUniversity,
  onRestart,
  onNewQuiz,
}) => {
  const percentage = answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resultados</Text>

        {selectedUniversity && (
          <View style={[styles.universityBadge, { backgroundColor: selectedUniversity.color }]}>
            {Icon[selectedUniversity.iconName] && (
              <View style={styles.universityBadgeIcon}>
                {React.createElement(Icon[selectedUniversity.iconName], {
                  width: 16,
                  height: 16,
                  color: '#FFF',
                })}
              </View>
            )}
            <Text style={styles.universityBadgeText}>{selectedUniversity.name}</Text>
          </View>
        )}
      </View>

      <View style={styles.scoreCircleContainer}>
        <View style={styles.scoreCircleWrapper}>
          <View style={styles.scoreCircle}>  
            <Text style={styles.scoreValue}>{score}</Text>
            <Text style={styles.scoreTotal}>/{answeredQuestions.length}</Text>
          </View>
        </View>
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Correctas</Text>
          <Text style={[styles.statValue, { color: colors.success }]}> {score} </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Incorrectas</Text>
          <Text style={[styles.statValue, { color: colors.error }]}> {answeredQuestions.length - score} </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Racha</Text>
          <Text style={styles.statValue}>{streak}</Text>
        </View>
      </View>

      <View style={styles.reviewContainer}>
        <Text style={styles.reviewTitle}>Revisión de Respuestas</Text>
        {answeredQuestions.map((item, index) => (
          <View key={`review-${index}`} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <View
                style={[styles.reviewStatus, {
                  backgroundColor: item.isCorrect ? colors.success : colors.error,
                }]}
              >
                {item.isCorrect ? (
                  <Icon.Check width={16} height={16} color="#FFF" />
                ) : (
                  <Icon.X width={16} height={16} color="#FFF" />
                )}
              </View>
              <Text style={styles.reviewQuestion}>{item.question}</Text>
            </View>
            <View style={styles.reviewAnswers}>
              <Text style={styles.reviewAnswerLabel}>Tu respuesta:</Text>
              <Text style={{ color: item.isCorrect ? colors.success : colors.error }}>
                {item.selectedAnswer}
              </Text>
              {!item.isCorrect && (
                <Text style={{ color: colors.success }}>
                  Respuesta correcta: {item.correctAnswer}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.buttonsContainerHorizontal}>
        <PrimaryButton label="Volver al inicio" onPress={onRestart} />
        <PrimaryButton label="Nuevo Quiz" onPress={onNewQuiz} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  universityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  universityBadgeIcon: {
    marginRight: 5,
  },
  universityBadgeText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  scoreCircleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  scoreCircleWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  scoreCircle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: 60,
    fontWeight: 'bold',
    color: colors.primary,
  },
  scoreTotal: {
    fontSize: 24,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  reviewContainer: {
    marginBottom: 30,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  reviewItem: {
    backgroundColor: colors.surface,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reviewStatus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  reviewQuestion: {
    fontSize: 16,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 22,
  },
  reviewAnswers: {
    marginLeft: 34,
  },
  reviewAnswerLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  buttonsContainerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
});

export default ScoreScreen;
