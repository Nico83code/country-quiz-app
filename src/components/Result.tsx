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
      <div className='min-h-screen flex items-center justify-center'>
        <div className='card-light text-center max-w-md mx-4'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto'></div>
          <p className='mt-4 text-gray-600 font-medium'>
            {content.result.loadingResults}
          </p>
        </div>
      </div>
    );
  }

  const percentage = Math.round((score / questions.length) * 100);

  const getGrade = () => {
    if (percentage >= 90)
      return {
        grade: content.result.grades.excellent,
        emoji: '🎉',
        color: 'text-green-500',
      };
    if (percentage >= 70)
      return {
        grade: content.result.grades.greatJob,
        emoji: '👏',
        color: 'text-blue-500',
      };
    if (percentage >= 50)
      return {
        grade: content.result.grades.goodEffort,
        emoji: '👍',
        color: 'text-yellow-500',
      };
    return {
      grade: content.result.grades.keepPracticing,
      emoji: '💪',
      color: 'text-orange-500',
    };
  };

  const { grade, emoji, color } = getGrade();

  const handlePlayAgain = () => {
    resetQuiz();
    router.push('/');
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-2xl'>
        <div className='card-light text-center'>
          <div className='text-6xl mb-6'>{emoji}</div>

          <h1 className={`text-4xl font-bold mb-6 ${color}`}>{grade}</h1>

          <div className='mb-8'>
            <div className='text-6xl font-bold mb-2 text-gray-800'>
              {score}/{questions.length}
            </div>
            <p className='text-2xl text-gray-600'>
              {percentage}
              {content.result.percentCorrect}
            </p>
          </div>

          <div className='bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 mb-8 border-2 border-gray-100'>
            <h3 className='text-lg font-semibold mb-4 text-gray-800'>
              {content.result.quizSummary}
            </h3>
            <div className='grid grid-cols-3 gap-4 text-center'>
              <div className='bg-white rounded-xl p-4 border-2 border-green-100'>
                <div className='text-3xl font-bold text-green-500 mb-1'>
                  {score}
                </div>
                <div className='text-sm font-medium text-gray-600'>
                  {content.result.correct}
                </div>
              </div>
              <div className='bg-white rounded-xl p-4 border-2 border-red-100'>
                <div className='text-3xl font-bold text-red-500 mb-1'>
                  {questions.length - score}
                </div>
                <div className='text-sm font-medium text-gray-600'>
                  {content.result.wrong}
                </div>
              </div>
              <div className='bg-white rounded-xl p-4 border-2 border-blue-100'>
                <div className='text-3xl font-bold text-blue-500 mb-1'>
                  {questions.length}
                </div>
                <div className='text-sm font-medium text-gray-600'>
                  {content.result.total}
                </div>
              </div>
            </div>
          </div>

          <button onClick={handlePlayAgain} className='btn-primary'>
            {content.result.playAgain}
          </button>
        </div>
      </div>
    </div>
  );
}
