'use client';

export default function Result() {
  // Mock data
  const score = 7;
  const total = 10;
  const percentage = Math.round((score / total) * 100);

  const handlePlayAgain = () => {
    alert('Would restart quiz!');
  };

  return (
    <div className='p-5 text-center mt-12'>
      <h1 className='text-3xl font-bold mb-6'>Quiz Complete!</h1>

      <div className='text-6xl my-5'>{percentage >= 70 ? '🎉' : '💪'}</div>

      <div className='text-5xl my-5 font-bold'>
        {score}/{total}
      </div>

      <p className='text-2xl mb-8'>{percentage}% Correct</p>

      <button
        onClick={handlePlayAgain}
        className='mt-8 px-5 py-2.5 text-base cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
      >
        Play Again
      </button>
    </div>
  );
}
