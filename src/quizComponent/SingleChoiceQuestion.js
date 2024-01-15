import React, { useState, useEffect } from 'react';
import '../css/SingleChoiceQuestion.css';

const shuffleArray = (array) => {
  const shuffledArray = [...array]; // Create a copy of the array to shuffle
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
};

const SingleChoiceQuestion = ({ pytanie, externalSelectedAnswer, onOptionSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(externalSelectedAnswer || '');
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    setSelectedAnswer(externalSelectedAnswer);
    // Shuffle the answers when the component mounts or when pytanie.odpowiedzi changes
    setShuffledAnswers(shuffleArray(pytanie.odpowiedzi));
  }, [externalSelectedAnswer, pytanie.odpowiedzi]);

  const handleAnswerSelect = (odpowiedz) => {
    setSelectedAnswer(odpowiedz);
    onOptionSelect(odpowiedz); // Informuje komponent nadrzędny, że opcja została wybrana
  };

  return (
    <div className="single-choice-container">
      <h2 className="question-header">{pytanie.text}</h2>
      <div>
        {shuffledAnswers.map((odpowiedz) => (
          <button
            key={odpowiedz}
            onClick={() => handleAnswerSelect(odpowiedz)}
            className={`answer-button ${selectedAnswer === odpowiedz ? 'selected' : ''}`}
          >
            {odpowiedz}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SingleChoiceQuestion;
