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

export enum MatterCode {
  'Matemáticas' = 'math',
  'Historia Universal' = 'hstu',
  'Historia de México' = 'hstm',
  'Geografía' = 'geo',
  'Lengua española' = 'esp',
  'Física' = 'phis',
  'Biología' = 'bio',
  'Química' = 'chem',
  'Filosofía' = 'phil',
  'Literatura' = 'lit',
}

export enum MatterName {
  'math' = 'Matemáticas',
  'hstu' = 'Historia Universal',
  'hstm' = 'Historia de México',
  'geo' = 'Geografía',
  'esp' = 'Lengua española',
  'phis' = 'Física',
  'bio' = 'Biología',
  'chem' = 'Química',
  'phil' = 'Filosofía',
  'lit' = 'Literatura',
}

export enum MatterColor {
  'math' = '#2196F3',
  'hstu' = '#FF5722',
  'hstm' = '#FF5722',
  'geo' = '#4CAF50',
  'lit' = '#9C27B0',
  'phis' = '#FFC107',
  'esp' = '#E91E63',
  'bio' = '#8BC34A',
  'chem' = '#00BCD4',
}


export enum MatterIcons {
  'math' = 'hash',
  'hstu' = 'hash',
  'phis' = 'zap',
  'lit' = 'book',
  'geo' = 'globe',
  'esp' = 'image',
  'bio' = 'heart',
  'chem' = 'droplet'
};

