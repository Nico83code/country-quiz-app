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
    <main className='min-h-screen flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-2xl'>
        <section className='card-light text-center'>
          <header className='mb-6'>
            <div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br rounded-2xl flex items-center justify-center text-4xl'>
              🌍
            </div>
          </header>

          <h1 className='text-4xl font-bold mb-4 text-gray-800'>
            {content.home.title}
          </h1>

          <p className='text-lg text-gray-600 mb-3'>
            {content.home.description}
          </p>

          <p className='text-base text-gray-500 mb-8'>
            {content.home.questionsInfo}
          </p>

          <button
            onClick={handleStartQuiz}
            className='btn-primary text-lg px-8 py-4'
            aria-label='Start the flag quiz'
          >
            {content.home.startButton}
          </button>
        </section>
      </div>
    </main>
  );
}
