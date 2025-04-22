// src/utils/subjectUtils.js
import { BookOpen, Calculator, FlaskConical, Languages } from 'lucide-react-native'; // O el paquete que estés usando

export function getSubjectColor(subject) {
  switch (subject) {
    case 'Matemáticas':
      return '#6C63FF'; // morado
    case 'Física':
      return '#FF6584'; // rosa
    case 'Química':
      return '#00BFA6'; // verde azulado
    case 'Español':
      return '#FFB800'; // amarillo
    default:
      return '#CCCCCC'; // gris neutro
  }
}

export function getSubjectIcon(subject) {
  switch (subject) {
    case 'Matemáticas':
      return Calculator;
    case 'Física':
      return FlaskConical;
    case 'Química':
      return FlaskConical;
    case 'Español':
      return Languages;
    default:
      return BookOpen;
  }
}
export function renderIcon(IconComponent, props) {
    return <IconComponent {...props} />;
  }
  
