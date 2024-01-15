import React, { useState, useEffect } from 'react';
import Quiz from '../Quiz';

function RandomQuiz({ questions, handleAnswerUpdate, handleQuizCompletion, userAnswers, resetQuiz, randomizeQuestions}) {
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [isRandomized, setIsRandomized] = useState(false);

  useEffect(() => {
    // Wybierz 10 losowych pytań, a następnie użyj funkcji randomizeQuestions
    const selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    if(!isRandomized){
        const randomizedSelectedQuestions = randomizeQuestions(selectedQuestions);
        setRandomQuestions(randomizedSelectedQuestions);
        setIsRandomized(true);
    }
  }, [questions, randomizeQuestions, isRandomized ]);

   // Przykład dla 10 losowych pytań


  return (
    <Quiz
      questions={randomQuestions}
      handleAnswerUpdate={handleAnswerUpdate}
      handleQuizCompletion={handleQuizCompletion}
      userAnswers={userAnswers}
      resetQuiz={resetQuiz}
    />
  );
}

export default RandomQuiz;
