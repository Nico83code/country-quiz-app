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

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{question.question}</h2>

      <div>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectAnswer(option)}
            disabled={isAnswered}
            style={{
              display: 'block',
              margin: '10px 0',
              padding: '10px',
              width: '100%',
              textAlign: 'left',
              border: '1px solid #ccc',
              backgroundColor:
                isAnswered && option === question.correctAnswer
                  ? 'lightgreen'
                  : isAnswered && option === selectedAnswer
                  ? 'lightcoral'
                  : 'white',
              cursor: isAnswered ? 'default' : 'pointer',
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        <p style={{ marginTop: '20px' }}>
          {selectedAnswer === question.correctAnswer
            ? '✓ Correct!'
            : `✗ Wrong! Answer: ${question.correctAnswer}`}
        </p>
      )}
    </div>
  );
}
