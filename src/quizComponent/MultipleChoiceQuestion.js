import React, { useState, useEffect } from 'react';
import '../css/MultipleChoiceQuestion.css'; 

const MultipleChoiceQuestion = ({ pytanie, onOptionSelect, setTemporaryAnswer }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerToggle = (answer) => {
    setSelectedAnswers(currentAnswers => {
      return currentAnswers.includes(answer)
        ? currentAnswers.filter(ans => ans !== answer)
        : [...currentAnswers, answer];
    });
  };

  useEffect(() => {
    onOptionSelect(selectedAnswers.length > 0);
    setTemporaryAnswer(selectedAnswers); 
  }, [selectedAnswers, onOptionSelect, setTemporaryAnswer]);

  return (
    <div className="multiple-choice-container">
      <h2>{pytanie.text}</h2>
      <div>
        {pytanie.odpowiedzi.map((odpowiedz, index) => {
          const isSelected = selectedAnswers.includes(odpowiedz);
          const buttonClass = isSelected ? 'answer-button selected' : 'answer-button';
          return (
            <button key={`${odpowiedz}-${index}`} className={buttonClass} onClick={() => handleAnswerToggle(odpowiedz)}>
              {odpowiedz}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
