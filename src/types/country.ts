export interface Country {
  code: string;
  name: string;
  flagUrl: string;
}

export interface Question {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  imageUrl: string;
}

export interface QuizState {
  countries: Country[];
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: { [questionId: string]: string };
  score: number;
  quizStarted: boolean;
  quizCompleted: boolean;
}
