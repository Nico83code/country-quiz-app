'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Country, QuizState } from '@/types/country';
import { generateQuestions } from '@/utils/quizGenerator';

interface QuizContextType extends QuizState {
  setCountries: (countries: Country[]) => void;
  startQuiz: () => void;
  answerQuestion: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizState>({
    countries: [],
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    score: 0,
    quizStarted: false,
    quizCompleted: false,
  });

  const setCountries = (countries: Country[]) => {
    setState((prev) => ({ ...prev, countries }));
  };

  const startQuiz = () => {
    // Generate 10 flag questions
    const questions = generateQuestions(state.countries, 10);

    if (questions.length === 0) {
      alert('Unable to generate quiz. Please try again.');
      return;
    }

    setState((prev) => ({
      ...prev,
      questions,
      currentQuestionIndex: 0,
      userAnswers: {},
      score: 0,
      quizStarted: true,
      quizCompleted: false,
    }));
  };

  const answerQuestion = (questionId: string, answer: string) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setState((prev) => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [questionId]: answer,
      },
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const nextQuestion = () => {
    setState((prev) => {
      const isLastQuestion =
        prev.currentQuestionIndex >= prev.questions.length - 1;

      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        quizCompleted: isLastQuestion,
      };
    });
  };

  const resetQuiz = () => {
    setState((prev) => ({
      ...prev,
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: {},
      score: 0,
      quizStarted: false,
      quizCompleted: false,
    }));
  };

  return (
    <QuizContext.Provider
      value={{
        ...state,
        setCountries,
        startQuiz,
        answerQuestion,
        nextQuestion,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
