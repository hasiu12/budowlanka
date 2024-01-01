import React, { useState, useEffect } from 'react';
import '../css/MultipleChoiceQuestion.css'; 

const MultipleChoiceQuestion = ({ pytanie, onOptionSelect, setTemporaryAnswer, externalSelectedAnswer }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(externalSelectedAnswer || []);

  useEffect(() => {
    setSelectedAnswers(externalSelectedAnswer || []);
  }, [externalSelectedAnswer]);

  const handleAnswerToggle = (answer) => {
    setSelectedAnswers(currentAnswers => {
      const isAlreadySelected = currentAnswers.includes(answer);
      return isAlreadySelected
        ? currentAnswers.filter(ans => ans !== answer)
        : [...currentAnswers, answer];
    });
  };

  useEffect(() => {
    onOptionSelect(selectedAnswers.length > 0);
    // Aktualizacja stanu nadrzędnego komponentu z opóźnieniem
    setTemporaryAnswer(selectedAnswers); 
  }, [selectedAnswers, onOptionSelect, setTemporaryAnswer]);


  useEffect(() => {
    if (externalSelectedAnswer) {
      setSelectedAnswers(externalSelectedAnswer);
    }
  }, [externalSelectedAnswer]);

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
