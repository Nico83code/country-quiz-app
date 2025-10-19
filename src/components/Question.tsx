'use client';

import React, { useState } from 'react';

const MOCK_QUESTION = {
  id: '1',
  question: `Which country is this: code 'US'?`,
  correctAnswer: 'United States',
  options: ['United States', 'Canada', 'Mexico', 'Brazil'],
};

export default function Question() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
  };

  const getButtonClassName = (option: string) => {
    const baseClasses =
      'block my-2.5 p-2.5 w-full text-left border border-gray-300 rounded-lg transition-colors';

    if (isAnswered && option === MOCK_QUESTION.correctAnswer) {
      return `${baseClasses} bg-green-200 cursor-default`;
    }
    if (isAnswered && option === selectedAnswer) {
      return `${baseClasses} bg-red-200 cursor-default`;
    }
    return `${baseClasses} bg-white hover:bg-gray-50 cursor-pointer`;
  };

  return (
    <div className='p-5 max-w-2xl mx-auto'>
      <h2 className='text-2xl font-semibold mb-4'>{MOCK_QUESTION.question}</h2>

      <div>
        {MOCK_QUESTION.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectAnswer(option)}
            disabled={isAnswered}
            className={getButtonClassName(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        <p className='mt-5 text-lg font-medium'>
          {selectedAnswer === MOCK_QUESTION.correctAnswer
            ? '✓ Correct!'
            : `✗ Wrong! Answer: ${MOCK_QUESTION.correctAnswer}`}
        </p>
      )}
    </div>
  );
}
