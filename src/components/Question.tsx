'use client';

import React, { useState } from 'react';
import { Question as QuestionType } from '@/types/country';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: string) => void;
  isAnswered: boolean;
}

export default function Question({
  question,
  onAnswer,
  isAnswered,
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  const getButtonClassName = (option: string) => {
    const baseClasses =
      'block my-2.5 p-2.5 w-full text-left border border-gray-300 rounded-lg transition-colors';

    if (isAnswered && option === question.correctAnswer) {
      return `${baseClasses} bg-green-200 cursor-default`;
    }
    if (isAnswered && option === selectedAnswer) {
      return `${baseClasses} bg-red-200 cursor-default`;
    }
    return `${baseClasses} bg-white hover:bg-gray-50 cursor-pointer`;
  };

  return (
    <div className='p-5 max-w-2xl mx-auto'>
      <h2 className='text-2xl font-semibold mb-4'>{question.question}</h2>

      <div>
        {question.options.map((option, index) => (
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
          {selectedAnswer === question.correctAnswer
            ? '✓ Correct!'
            : `✗ Wrong! Answer: ${question.correctAnswer}`}
        </p>
      )}
    </div>
  );
}
