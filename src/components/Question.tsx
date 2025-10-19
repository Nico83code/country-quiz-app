'use client';

import React, { useState } from 'react';

const MOCK_QUESTION = {
  id: '1',
  question: 'Which country is this: United States?',
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

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{MOCK_QUESTION.question}</h2>

      <div>
        {MOCK_QUESTION.options.map((option, index) => (
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
                isAnswered && option === MOCK_QUESTION.correctAnswer
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
          {selectedAnswer === MOCK_QUESTION.correctAnswer
            ? '✓ Correct!'
            : `✗ Wrong! Answer: ${MOCK_QUESTION.correctAnswer}`}
        </p>
      )}
    </div>
  );
}
