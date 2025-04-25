import React, { useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet, Image } from 'react-native';
import colors from '../styles/colors';
import ProgressBar from '../components/ProgressBar';
import SubjectPill from '../components/SubjectPill';
import OptionCard from '../components/OptionCard';
import PrimaryButton from '../components/PrimaryButton';
import useQuizStore from '../store/useQuizStore';
import { Answer, MatterColor, MatterIcons } from '../interfaces/quiz.interface';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../router/stack.interface';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const QuizScreen = () => {
  const { quiz: { currentQuestion, quiz }, ui: {fadeAnim, scaleAnim}, auth: {token} , resetAnimations, fadeIn, fadeOut, answerQuestion, nextQuestion } = useQuizStore()
  if(!quiz) return <></>
  
  const navigation = useNavigation<NavigationProp>()
  const [question, setQuestion] = useState(quiz.questions[currentQuestion])
  const [selectedOption, setSelectedOption] = useState<Answer>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const progress = quiz && (Array.isArray(quiz.questions) && quiz.questions.length > 0)
  ? ((currentQuestion + 1) / quiz.questions.length) * 100
  : 0;

  const handleAnswerOption = (option: Answer) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    answerQuestion(question, option.isCorrect)
  };

  const handleNextQuestion = () => {
    fadeOut(() => {
      const next = currentQuestion + 1;
      if (next < quiz.questions.length) {
        nextQuestion();
        setSelectedOption(null);
        setIsAnswered(false);
      }
      else {
        if (!token) {
          navigation.navigate('Login')
        } else {
          navigation.navigate('Score')
        }
      }

      resetAnimations()
      fadeIn()
    }) 
  };

  useEffect(() => {
    resetAnimations()
    fadeIn()
    setQuestion(question)
  }, [currentQuestion]);

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={Number(progress)}
        currentQuestion={currentQuestion}
        totalQuestions={quiz.questions.length || 1}
      />

      {question.matterCode && (
        <View style={styles.subjectContainer}>
          <SubjectPill
            subject={question.matterCode}
            color={MatterColor[question.matterCode] || colors.primary}
            icon={MatterIcons[question.matterCode]}
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

        {/* {false && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: question.imageUrl }} style={styles.image} resizeMode="contain" />
          </View>
        )} */}

        <View style={styles.optionsContainer}>
          {question.answers.map((option, index) => (
            <OptionCard
              key={index}
              option={option}
              index={index}
              isSelected={selectedOption.id === option.id}
              isAnswered={isAnswered}
              isCorrect={selectedOption.id === option.id}
              isCorrectAnswer={selectedOption.isCorrect}
              onSelect={() => handleAnswerOption(option)}
            />
          ))}
        </View>

        {isAnswered && (
          <PrimaryButton
            label={currentQuestion < quiz.questions.length - 1 ? 'Siguiente' : 'Ver Resultados'}
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
