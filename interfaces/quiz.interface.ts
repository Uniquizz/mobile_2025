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


export enum UniversityKeys {
  unam = 'unam',
  poli = 'poli',
  uam = 'uam',
  unam2 = 'unam2'
}
export interface University {
  id: UniversityKeys,
  name: 'UNAM' | 'POLI' | 'UAM' | 'UNAM 2',
  color: string,
  iconName: 'award'
}

