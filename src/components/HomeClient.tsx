'use client';

import { useRouter } from 'next/navigation';
import { useQuiz } from '@/context/QuizContext';
import content from '@/content/content.json';

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
            {content.home.title}
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            {content.home.description}
          </p>
          <p className='text-base mb-6'>{content.home.questionsInfo}</p>

          <button
            onClick={handleStartQuiz}
            className='mt-5 px-5 py-2.5 text-base cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
          >
            {content.home.startButton}
          </button>
        </div>
      </div>
    </div>
  );
}
