import React, { useState, useEffect } from 'react';
import '../css/SingleChoiceQuestion.css'; 

const SingleChoiceQuestion = ({ pytanie, externalSelectedAnswer, onOptionSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(externalSelectedAnswer || '');

  useEffect(() => {
    setSelectedAnswer(externalSelectedAnswer);
  }, [externalSelectedAnswer]);

  const handleAnswerSelect = (odpowiedz) => {
    setSelectedAnswer(odpowiedz);
    onOptionSelect(odpowiedz); // Informuje komponent nadrzędny, że opcja została wybrana
  };

  return (
    <div className="single-choice-container"> 
      <h2 className="question-header">{pytanie.text}</h2> 
      <div>
        {pytanie.odpowiedzi.map((odpowiedz) => (
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
