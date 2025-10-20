'use client';

import { useRouter } from 'next/navigation';
import { useQuiz } from '@/context/QuizContext';

export default function HomeClient() {
  const router = useRouter();
  const { startQuiz } = useQuiz();

  const handleStartQuiz = () => {
    startQuiz();
    router.push('/quiz');
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-4xl'>
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
            Country Quiz
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            Test your knowledge of country names!
          </p>
          <p className='text-base mb-6'>
            10 questions - Let&apos;s see how many you can get right!
          </p>

          <button
            onClick={handleStartQuiz}
            className='mt-5 px-5 py-2.5 text-base cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
