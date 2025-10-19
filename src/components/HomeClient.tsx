'use client';

export default function HomeClient() {
  const handleStartQuiz = () => {
    alert('Quiz would start here!');
  };

  return (
    <div className='p-5 text-center'>
      <h1 className='text-3xl font-bold mb-4'>Country Quiz</h1>
      <p className='text-lg mb-2'>Test your knowledge of country names!</p>
      <p className='text-base mb-6'>
        10 questions - Let's see how many you can get right!
      </p>

      <button
        onClick={handleStartQuiz}
        className='mt-5 px-5 py-2.5 text-base cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
      >
        Start Quiz
      </button>
    </div>
  );
}
