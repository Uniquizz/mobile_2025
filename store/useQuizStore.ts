import { create } from 'zustand';
import { Question, Quiz, University } from '../interfaces/quiz.interface';
import { quizStoreInitialState } from './constant';
import { LoginDataResponse, ProfileResponse } from '../services/interfaces/user.interface';
import { Animated } from 'react-native';

interface UIData {
  profileMenuVisible: boolean;
  streakModalVisible: boolean;
  modalVisible: boolean;
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
}

interface AuthData {
  token: string;
  email: string;
  name: string;
  lastName: string;
  birthDate?: Date;
  phone: string;
}

interface QuizData {
  quiz?: Quiz;
  university?: University;
  score: number;
  currentQuestion: number;
  answeredQuestions: Question[];
  streak: number;
}

export interface QuizState {
  ui: UIData;
  auth: AuthData;
  quiz: QuizData;

  toggleMenuProfile: () => void;
  toggleStreakModal: () => void;
  toggleModal: () => void;

  resetAnimations: () => void;
  fadeOut: (onFinish?: () => void) => void;
  fadeIn: (onFinish?: () => void) => void;

  setAuth: (auth: LoginDataResponse) => void;
  setProfile: (profile: ProfileResponse) => void;

  setQuiz: (quiz: Quiz) => void;
  setUniversity: (university: University) => void;
  answerQuestion: (question: Question, correct: boolean) => void;
  nextQuestion: () => void;

  setStreak: (streak: number) => void;

  resetQuiz: () => void;
  closeSession: () => void;
}

const useQuizStore = create<QuizState>()((set, get) => ({
  ...quizStoreInitialState,
  toggleMenuProfile: () => set((state) => ({ ui: { ...state.ui, profileMenuVisible: !state.ui.profileMenuVisible }})),
  toggleModal: () => set((state) => ({ ui: { ...state.ui, modalVisible: !state.ui.modalVisible }})),
  toggleStreakModal: () => set((state) => ({ ui: { ...state.ui, streakModalVisible: !state.ui.streakModalVisible }})),

  resetAnimations: () => {
    set((state) => {
      state.ui.fadeAnim.setValue(0);
      state.ui.scaleAnim.setValue(0.95);
      return state;
    });
  },
  fadeOut: (onFinish?: () => void) => {
    Animated.parallel([
      Animated.timing(get().ui.fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(get().ui.scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      if (onFinish) onFinish();
    });
  },
  fadeIn: (onFinish?: () => void) => {
    Animated.parallel([
      Animated.timing(get().ui.fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(get().ui.scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start(() => {
      if (onFinish) onFinish();
    });
  },

  setAuth: (auth) => set((state) => ({ auth: { ...state.auth, ...auth }})),
  setProfile: (profile) => set((state) => ({ auth: { ...state.auth, ...profile }})),

  setQuiz: (quiz) => set((state) => ({ quiz: {...state.quiz, quiz}})),
  answerQuestion: (question, correct) => set((state) => ({
    quiz: {
      ...state.quiz,
      score: correct ? (state.quiz.score + 1) : state.quiz.score,
      answeredQuestions: [...state.quiz.answeredQuestions, question],
    }
  })),
  nextQuestion: () => set((state) => ({
    quiz: {
      ...state.quiz,
      currentQuestion: state.quiz.currentQuestion < state.quiz.quiz.questions.length ? (state.quiz.currentQuestion + 1) : state.quiz.currentQuestion
    }
  })),
  setUniversity: (university) => set((state) => ({ quiz: {...state.quiz, university}})),

  setStreak: (streak) => set((state) => ({ quiz: { ...state.quiz, streak }})),
  resetQuiz: () => set(() => ({quiz: quizStoreInitialState.quiz})),
  closeSession: () => set(() => ({auth: quizStoreInitialState.auth}))
}))

export default useQuizStore;
