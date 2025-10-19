export interface Country {
  code: string;
  name: string;
}

export interface Question {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
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
