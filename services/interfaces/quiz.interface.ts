export interface CreateQuizData {
  questionCount: number;
  customMatters: string[];
}

export interface FinishQuizData {
  correctAnswers: number
}

export interface FinishQuizResponse {
  status:  string;
  message: string;
  quizId:  string;
}