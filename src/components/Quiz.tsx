'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/context/QuizContext';
import Question from './Question';
import content from '@/content/content.json';

export default function Quiz() {
  const router = useRouter();
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    score,
    quizStarted,
    quizCompleted,
    answerQuestion,
    nextQuestion,
  } = useQuiz();

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered =
    currentQuestion && userAnswers[currentQuestion.id] !== undefined;

  useEffect(() => {
    if (!quizStarted) {
      router.push('/');
    }
  }, [quizStarted, router]);

  useEffect(() => {
    if (quizCompleted) {
      router.push('/result');
    }
  }, [quizCompleted, router]);

  if (!currentQuestion || !quizStarted) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto'></div>
          <p className='mt-4 text-gray-600 dark:text-gray-400'>
            {content.quiz.loadingQuiz}
          </p>
        </div>
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    answerQuestion(currentQuestion.id, answer);
  };

  const handleNext = () => {
    nextQuestion();
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className='min-h-screen py-12 px-4'>
      <div className='w-full max-w-2xl mx-auto mb-8'>
        <div className='flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2'>
          <span>
            {content.quiz.questionLabel} {currentQuestionIndex + 1}{' '}
            {content.quiz.of} {questions.length}
          </span>
          <span>
            {content.quiz.scoreLabel} {score}/
            {currentQuestionIndex + (isAnswered ? 1 : 0)}
          </span>
        </div>
        <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden'>
          <div
            className='bg-blue-500 h-full transition-all duration-300 ease-out'
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Question
        question={currentQuestion}
        onAnswer={handleAnswer}
        isAnswered={isAnswered}
      />

      {isAnswered && (
        <div className='w-full max-w-2xl mx-auto mt-6 flex justify-center'>
          <button
            onClick={handleNext}
            className='px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200'
          >
            {currentQuestionIndex < questions.length - 1
              ? content.quiz.nextQuestion
              : content.quiz.seeResults}
          </button>
        </div>
      )}
    </div>
  );
}
