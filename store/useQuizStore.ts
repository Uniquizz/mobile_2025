import { create } from 'zustand';
import { Question, Quiz } from '../interfaces/quiz.interface';
import { quizStoreInitialState } from './constant';
import { LoginDataResponse, ProfileResponse } from '../services/interfaces/user.interface';

interface UIData {
  profileMenuVisible: boolean;
  streakModalVisible: boolean;
  modalVisible: boolean;
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
  quiz: Quiz;
  score: number;
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

  setAuth: (auth: LoginDataResponse) => void;
  setProfile: (profile: ProfileResponse) => void;

  setQuiz: (quiz: Quiz) => void;
  answerQuestion: (question: Question, correct: boolean) => void;

  setStreak: (streak: number) => void;
}

const useQuizStore = create<QuizState>()((set) => ({
  ...quizStoreInitialState,
  toggleMenuProfile: () => set((state) => ({ ui: { ...state.ui, profileMenuVisible: !state.ui.profileMenuVisible }})),
  toggleModal: () => set((state) => ({ ui: { ...state.ui, modalVisible: !state.ui.modalVisible }})),
  toggleStreakModal: () => set((state) => ({ ui: { ...state.ui, streakModalVisible: !state.ui.streakModalVisible }})),

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

  setStreak: (streak) => set((state) => ({ quiz: { ...state.quiz, streak }}))
}))

export default useQuizStore;
