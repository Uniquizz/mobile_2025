import React, { useEffect, useState } from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';
import * as Icon from 'react-native-feather';
import PrimaryButton from '../components/PrimaryButton';
import useQuizStore from '../store/useQuizStore';
import { questionCountOptions } from '../data/constants';
import { MatterCode } from '../interfaces/quiz.interface';
const subjects = Object.keys(MatterCode);

const QuizConfigScreen = () => {

  const { quiz: { university }, ui: { fadeAnim, scaleAnim }, fadeIn, fadeOut, resetAnimations } = useQuizStore()
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(5);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleStartQuiz = () => {
    fadeOut(() => {
      // navigation.navigate('QuizConfig')
    })
  };

  useEffect(() => {
    resetAnimations()
    fadeIn()
  }, [])

  return (
    <Animated.ScrollView
      contentContainerStyle={[
        styles.quizConfigContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header con universidad */}
      <View style={styles.quizConfigHeader}>
        {university && (
          <View
            style={[
              styles.universityBadge,
              { backgroundColor: university.color },
            ]}
          >
            <View style={styles.universityBadgeIcon}>
              {Icon[university.iconName] &&
                React.createElement(Icon[university.iconName], {
                  width: 16,
                  height: 16,
                  color: '#FFFFFF',
                })}
            </View>
            <Text style={styles.universityBadgeText}>
              {university.name}
            </Text>
          </View>
        )}
        <Text style={styles.quizConfigTitle}>Configurar Quiz</Text>
        <Text style={styles.quizConfigSubtitle}>Personaliza tu experiencia</Text>
      </View>

      {/* Preguntas */}
      <View style={styles.configSection}>
        <Text style={styles.configSectionTitle}>Número de Preguntas</Text>
        <View style={styles.questionCountContainer}>
          {questionCountOptions.map((count) => (
            <TouchableOpacity
              key={count}
              style={[
                styles.questionCountButton,
                selectedQuestionCount === count && styles.questionCountButtonSelected,
              ]}
              onPress={() => setSelectedQuestionCount(count)}
            >
              <Text
                style={[
                  styles.questionCountText,
                  selectedQuestionCount === count && styles.questionCountTextSelected,
                ]}
              >
                {count}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Materias */}
      <View style={styles.configSection}>
        <Text style={styles.configSectionTitle}>Materia</Text>
        <Text style={styles.configSectionSubtitle}>
          {selectedSubject
            ? `Seleccionado: ${selectedSubject}`
            : 'Todas las materias'}
        </Text>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectScroll}
        >
          <TouchableOpacity
            style={[
              styles.subjectButton,
              !selectedSubject && { backgroundColor: colors.primary },
            ]}
            onPress={() => setSelectedSubject(null)}
          >
            <Text
              style={[
                styles.subjectButtonText,
                !selectedSubject && styles.subjectButtonTextSelected,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>

          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject}
              style={[
                styles.subjectButton,
                { backgroundColor: colors[subject.toLowerCase()] || colors.accent },
                selectedSubject === subject && styles.subjectButtonSelected,
              ]}
              onPress={() => setSelectedSubject(subject)}
            >
              <Text
                style={[
                  styles.subjectButtonText,
                  selectedSubject === subject && styles.subjectButtonTextSelected,
                ]}
              >
                {subject}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>

      {/* Botón de comenzar */}
      <View style={styles.startButtonContainer}>
        <PrimaryButton label="Comenzar Quiz" onPress={handleStartQuiz} />
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  quizConfigContainer: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  quizConfigHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  universityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
  },
  universityBadgeIcon: {
    marginRight: 5,
  },
  universityBadgeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  quizConfigTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
    textAlign: 'center',
  },
  quizConfigSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  configSection: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  configSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  configSectionSubtitle: {
    fontSize: 14,
    color: colors.textTertiary,
    marginBottom: 10,
  },
  questionCountContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
  },
  questionCountButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: colors.surface,
    marginBottom: 10,
  },
  questionCountButtonSelected: {
    backgroundColor: colors.primary,
  },
  questionCountText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  questionCountTextSelected: {
    color: '#FFF',
  },
  subjectScroll: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  subjectButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
  },
  subjectButtonSelected: {
    borderWidth: 2,
    borderColor: '#FFF',
  },
  subjectButtonText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  subjectButtonTextSelected: {
    color: '#FFF',
  },
  startButtonContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default QuizConfigScreen;
