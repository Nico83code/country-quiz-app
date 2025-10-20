'use client';

import React, { useState } from 'react';
import { Question as QuestionType } from '@/types/country';
import Image from 'next/image';
import content from '@/content/content.json';

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
      <div className='bg-white rounded-xl shadow-lg p-8 mb-6'>
        {question.imageUrl && (
          <div className='mb-6 flex justify-center'>
            <div className='relative w-80 h-48 rounded-lg overflow-hidden shadow-md'>
              <Image
                src={question.imageUrl}
                alt={content.question.imageAlt}
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>
        )}

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
              ? content.question.correct
              : `${content.question.wrongPrefix} ${question.correctAnswer}`}
          </p>
        )}
      </div>
    </div>
  );
}
