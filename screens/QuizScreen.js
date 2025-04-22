import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, Image } from 'react-native';
import colors from '../styles/colors';
import ProgressBar from '../components/ProgressBar';
import SubjectPill from '../components/SubjectPill';
import OptionCard from '../components/OptionCard';
import PrimaryButton from '../components/PrimaryButton';

const QuizScreen = ({
  currentQuestion,
  quizData,
  selectedOption,
  isAnswered,
  handleAnswerOption,
  handleNextQuestion,
}) => {
  const question = quizData[currentQuestion];
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const progress = (Array.isArray(quizData) && quizData.length > 0)
  ? ((currentQuestion + 1) / quizData.length) * 100
  : 0;
  const isCorrectAnswer = (option) => option === question.correctAnswer;
  const isCorrect = (option) => selectedOption === option && isCorrectAnswer(option);

  useEffect(() => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.95);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentQuestion]);

  return (
    <View style={styles.container}>
   <ProgressBar
  progress={Number(progress)}
  currentQuestion={currentQuestion}
  totalQuestions={quizData.length || 1}
/>


      {question.subject && (
        <View style={styles.subjectContainer}>
          <SubjectPill
            subject={question.subject}
            color={colors[question.subject.toLowerCase()] || colors.primary}
            icon={question.subjectIcon}
          />
        </View>
      )}

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {question.hasImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: question.imageUrl }} style={styles.image} resizeMode="contain" />
          </View>
        )}

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <OptionCard
              key={index}
              option={option}
              index={index}
              isSelected={selectedOption === option}
              isAnswered={isAnswered}
              isCorrect={isCorrect(option)}
              isCorrectAnswer={isCorrectAnswer(option)}
              onSelect={() => handleAnswerOption(option)}
            />
          ))}
        </View>

        {isAnswered && (
          <PrimaryButton
            label={currentQuestion < quizData.length - 1 ? 'Siguiente' : 'Ver Resultados'}
            onPress={handleNextQuestion}
            iconName="ArrowRight"
          />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  subjectContainer: {
    marginBottom: 10,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    lineHeight: 30,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: colors.surfaceHighlight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

export default QuizScreen;
