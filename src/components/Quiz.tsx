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
      <main className='min-h-screen flex items-center justify-center'>
        <div className='card-light text-center max-w-md mx-4'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto'></div>
          <p className='mt-4 text-gray-600 font-medium'>
            {content.quiz.loadingQuiz}
          </p>
        </div>
      </main>
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
    <main className='min-h-screen py-6 px-4'>
      <section
        className='w-full max-w-2xl mx-auto mb-4'
        aria-label='Quiz progress'
      >
        <div className='card-light'>
          <div className='flex justify-between text-sm font-medium text-gray-600 mb-2'>
            <span>
              {content.quiz.questionLabel} {currentQuestionIndex + 1}{' '}
              {content.quiz.of} {questions.length}
            </span>
            <span className='text-blue-600'>
              {content.quiz.scoreLabel} {score}/
              {currentQuestionIndex + (isAnswered ? 1 : 0)}
            </span>
          </div>
          <div className='w-full bg-gray-100 rounded-full h-3 overflow-hidden'>
            <div
              className='bg-blue-500 h-full transition-all duration-300 ease-out'
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      <Question
        question={currentQuestion}
        onAnswer={handleAnswer}
        isAnswered={isAnswered}
      />

      {isAnswered && (
        <div className='w-full max-w-2xl mx-auto mt-4 mb-6 flex justify-center px-5'>
          <button onClick={handleNext} className='btn-primary w-full sm:w-auto'>
            {currentQuestionIndex < questions.length - 1
              ? content.quiz.nextQuestion
              : content.quiz.seeResults}
          </button>
        </div>
      )}
    </main>
  );
}
