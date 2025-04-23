import { QuizState } from "./useQuizStore";

export const quizStoreInitialState = {
  auth: {
    email: '',
    token: '',
    name: 'Isra',
    lastName: '',
    phone: '',
  },
  quiz: {
    answeredQuestions: [],
    quiz: undefined,
    score: 0,
    streak: 10,
  },
  ui: {
    modalVisible: false,
    profileMenuVisible: false,
    streakModalVisible: false,
  }
}