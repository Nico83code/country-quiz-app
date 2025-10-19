'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/context/QuizContext';

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
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto'></div>
          <p className='mt-4 text-gray-600 dark:text-gray-400'>
            Loading results...
          </p>
        </div>
      </div>
    );
  }

  const percentage = Math.round((score / questions.length) * 100);

  const getGrade = () => {
    if (percentage >= 90)
      return { grade: 'Excellent!', emoji: '🎉', color: 'text-green-500' };
    if (percentage >= 70)
      return { grade: 'Great Job!', emoji: '👏', color: 'text-blue-500' };
    if (percentage >= 50)
      return { grade: 'Good Effort!', emoji: '👍', color: 'text-yellow-500' };
    return { grade: 'Keep Practicing!', emoji: '💪', color: 'text-orange-500' };
  };

  const { grade, emoji, color } = getGrade();

  const handlePlayAgain = () => {
    resetQuiz();
    router.push('/');
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-2xl'>
        <div className='bg-white dark:bg-gray-600 rounded-2xl shadow-xl p-8 sm:p-12 text-center'>
          <div className='text-6xl mb-6'>{emoji}</div>

          <h1 className={`text-4xl font-bold mb-4 ${color}`}>{grade}</h1>

          <div className='mb-8'>
            <div className='text-6xl font-bold mb-2'>
              {score}/{questions.length}
            </div>
            <p className='text-2xl text-gray-600 dark:text-gray-400'>
              {percentage}% Correct
            </p>
          </div>

          <div className='bg-white rounded-lg p-6 mb-8'>
            <h3 className='text-lg font-semibold mb-4'>Quiz Summary</h3>
            <div className='grid grid-cols-3 gap-4 text-center'>
              <div>
                <div className='text-2xl font-bold text-green-500'>{score}</div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Correct
                </div>
              </div>
              <div>
                <div className='text-2xl font-bold text-red-500'>
                  {questions.length - score}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Wrong
                </div>
              </div>
              <div>
                <div className='text-2xl font-bold text-blue-500'>
                  {questions.length}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Total
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handlePlayAgain}
            className='px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200'
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
