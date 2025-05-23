import { Animated } from "react-native";

export const quizStoreInitialState = {
  auth: {
    email: '',
    token: '',
    name: '',
    lastName: '',
    phone: '',
  },
  quiz: {
    answeredQuestions: [],
    quiz: undefined,
    score: 0,
    streak: 0,
    university: undefined,
    currentQuestion: 0,
  },
  ui: {
    modalVisible: false,
    profileMenuVisible: false,
    streakModalVisible: false,
    fadeAnim: new Animated.Value(0),
    scaleAnim: new Animated.Value(0.95),
  }
}