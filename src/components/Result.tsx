'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/context/QuizContext';
import content from '@/content/content.json';

export default function Result() {
  const router = useRouter();
  const { questions, score, quizCompleted, resetQuiz } = useQuiz();

  useEffect(() => {
    if (!quizCompleted) {
      router.push('/');
    }
  }, [quizCompleted, router]);

  if (!quizCompleted) {
    return (
      <main className='min-h-screen flex items-center justify-center'>
        <div
          className='card-light text-center max-w-md mx-4'
          role='status'
          aria-live='polite'
        >
          <div
            className='animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto'
            aria-hidden='true'
          ></div>
          <p className='mt-4 text-gray-600 font-medium'>
            {content.result.loadingResults}
          </p>
        </div>
      </main>
    );
  }

  const percentage = Math.round((score / questions.length) * 100);

  const getGrade = () => {
    if (percentage >= 90)
      return {
        grade: content.result.grades.excellent,
        emoji: '🎉',
        color: 'text-green-600',
      };
    if (percentage >= 70)
      return {
        grade: content.result.grades.greatJob,
        emoji: '👏',
        color: 'text-blue-600',
      };
    if (percentage >= 50)
      return {
        grade: content.result.grades.goodEffort,
        emoji: '👍',
        color: 'text-yellow-600',
      };
    return {
      grade: content.result.grades.keepPracticing,
      emoji: '💪',
      color: 'text-orange-600',
    };
  };

  const { grade, emoji, color } = getGrade();

  const handlePlayAgain = () => {
    resetQuiz();
    router.push('/');
  };

  return (
    <main className='min-h-screen flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-2xl'>
        <article className='card-light text-center'>
          <div className='text-6xl mb-6' aria-hidden='true'>
            {emoji}
          </div>

          <h1 className={`text-4xl font-bold mb-6 ${color}`}>{grade}</h1>

          <section className='mb-8' aria-label='Quiz score'>
            <div
              className='text-6xl font-bold mb-2 text-gray-800'
              aria-label={`You scored ${score} out of ${questions.length}`}
            >
              {score}/{questions.length}
            </div>
            <p className='text-2xl text-gray-600'>
              {percentage}
              {content.result.percentCorrect}
            </p>
          </section>

          <section
            className='bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 mb-8 border-2 border-gray-100'
            aria-labelledby='summary-heading'
          >
            <h2
              id='summary-heading'
              className='text-lg font-semibold mb-4 text-gray-800'
            >
              {content.result.quizSummary}
            </h2>
            <dl className='grid grid-cols-3 gap-4 text-center'>
              <div className='bg-white rounded-xl p-4 border-2 border-green-100'>
                <dt className='text-sm font-medium text-gray-600 sr-only'>
                  {content.result.correct}
                </dt>
                <dd
                  className='text-3xl font-bold text-green-600 mb-1'
                  aria-label={`${score} correct answers`}
                >
                  {score}
                </dd>
                <dd
                  className='text-sm font-medium text-gray-600'
                  aria-hidden='true'
                >
                  {content.result.correct}
                </dd>
              </div>
              <div className='bg-white rounded-xl p-4 border-2 border-red-100'>
                <dt className='text-sm font-medium text-gray-600 sr-only'>
                  {content.result.wrong}
                </dt>
                <dd
                  className='text-3xl font-bold text-red-600 mb-1'
                  aria-label={`${questions.length - score} wrong answers`}
                >
                  {questions.length - score}
                </dd>
                <dd
                  className='text-sm font-medium text-gray-600'
                  aria-hidden='true'
                >
                  {content.result.wrong}
                </dd>
              </div>
              <div className='bg-white rounded-xl p-4 border-2 border-blue-100'>
                <dt className='text-sm font-medium text-gray-600 sr-only'>
                  {content.result.total}
                </dt>
                <dd
                  className='text-3xl font-bold text-blue-600 mb-1'
                  aria-label={`${questions.length} total questions`}
                >
                  {questions.length}
                </dd>
                <dd
                  className='text-sm font-medium text-gray-600'
                  aria-hidden='true'
                >
                  {content.result.total}
                </dd>
              </div>
            </dl>
          </section>

          <button
            onClick={handlePlayAgain}
            className='btn-primary'
            aria-label='Start a new quiz'
          >
            {content.result.playAgain}
          </button>
        </article>
      </div>
    </main>
  );
}
