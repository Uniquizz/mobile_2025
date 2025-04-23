import { QuizState } from "./useQuizStore";

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
  },
  ui: {
    modalVisible: false,
    profileMenuVisible: false,
    streakModalVisible: false,
  }
}