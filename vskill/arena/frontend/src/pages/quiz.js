import React, { useState } from 'react';

function Quiz({ quizQuestions }) {
  // We'll track user answers in local state
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(null));
  const [score, setScore] = useState(null);

  const handleOptionChange = (qIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[qIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  return (
    <div>
      {quizQuestions.map((q, qIndex) => (
        <div key={qIndex} style={{ marginBottom: '15px' }}>
          <p><strong>Question {qIndex + 1}:</strong> {q.question}</p>
          {q.options.map((opt, optIndex) => (
            <label key={optIndex} style={{ display: 'block' }}>
              <input
                type="radio"
                name={`question-${qIndex}`}
                value={optIndex}
                checked={answers[qIndex] === optIndex}
                onChange={() => handleOptionChange(qIndex, optIndex)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      {score === null ? (
        <button onClick={handleSubmitQuiz}>Submit Quiz</button>
      ) : (
        <p>Your score: {score} / {quizQuestions.length}</p>
      )}
    </div>
  );
}

export default Quiz;
