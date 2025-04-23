export interface Quiz {
  quizId:    string;
  questions: Question[];
}

export interface Question {
  id:         number;
  question:   string;
  type:       string;
  matterCode: string;
  area:       string;
  source:     string;
  school:     string;
  answers:    Answer[];
}

export interface Answer {
  id:         number;
  isCorrect:  boolean;
  answerText: string;
}

