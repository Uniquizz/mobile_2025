import { create } from 'zustand';

const useQuizStore = create((set) => ({
  // UI states
  showHomeScreen: true,
  showUniversitySelection: false,
  showQuizConfig: false,
  showQuiz: false,
  showScore: false,
  showLogin: false,
  profileMenuVisible: false,
  streakModalVisible: false,
  modalVisible: false,

  // User and quiz states
  isAuthenticated: false,
  userName: '',
  email: '',
  password: '',
  showPassword: false,
  activeTab: 'login',
  selectedCategory: 'all',
  selectedUniversity: null,
  selectedSubject: null,
  selectedQuestionCount: 5,
  quizData: [],
  currentQuestion: 0,
  selectedOption: null,
  isAnswered: false,
  score: 0,
  answeredQuestions: [],
  streak: 7,

  // Generic setter
  setField: (key, value) => set({ [key]: value }),

  // Optional: reset function
  resetAll: () =>
    set({
      showHomeScreen: true,
      showUniversitySelection: false,
      showQuizConfig: false,
      showQuiz: false,
      showScore: false,
      showLogin: false,
      profileMenuVisible: false,
      streakModalVisible: false,
      modalVisible: false,
      isAuthenticated: false,
      userName: '',
      email: '',
      password: '',
      showPassword: false,
      activeTab: 'login',
      selectedCategory: 'all',
      selectedUniversity: null,
      selectedSubject: null,
      selectedQuestionCount: 5,
      quizData: [],
      currentQuestion: 0,
      selectedOption: null,
      isAnswered: false,
      score: 0,
      answeredQuestions: [],
      streak: 7,
    }),
}));

export default useQuizStore;
