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
    if (isAnswered && option === question.correctAnswer) {
      return 'btn-answer-correct';
    }
    if (isAnswered && option === selectedAnswer) {
      return 'btn-answer-incorrect';
    }
    return 'btn-answer';
  };

  return (
    <section className='px-5 max-w-2xl mx-auto'>
      <article className='card-light'>
        {question.imageUrl && (
          <figure className='mb-4 flex justify-center'>
            <div className='relative w-full max-w-sm aspect-[3/2] rounded-xl overflow-hidden border-2 border-gray-100 bg-gray-50'>
              <Image
                src={question.imageUrl}
                alt={content.question.imageAlt}
                fill
                className='object-contain'
                priority
              />
            </div>
          </figure>
        )}

        <h2 className='text-xl font-semibold mb-4 text-gray-800'>
          {question.question}
        </h2>

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
          <div
            className={`mt-4 p-3 rounded-xl text-center font-medium ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-50 text-green-700 border-2 border-green-200'
                : 'bg-red-50 text-red-700 border-2 border-red-200'
            }`}
          >
            {selectedAnswer === question.correctAnswer
              ? content.question.correct
              : `${content.question.wrongPrefix} ${question.correctAnswer}`}
          </div>
        )}
      </article>
    </section>
  );
}
