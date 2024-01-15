import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Quiz from '../Quiz';

function HistoryQuiz({ questions, handleAnswerUpdate, handleQuizCompletion, userAnswers, resetQuiz, randomizeQuestions }) {
  const [randomizedHistoryQuestions, setRandomizedHistoryQuestions] = useState([]);
  const { seriesIndex } = useParams();
  const isSeriesQuiz = seriesIndex != null;
  const seriesSize = 10;
  const [isRandomized, setIsRandomized] = useState(false);

  useEffect(() => {
    let selectedQuestions = [];

    if (isSeriesQuiz) {
      // For series quiz, select a specific series of questions and shuffle them
      const currentSeries = parseInt(seriesIndex, 10);
      const seriesQuestions = questions.slice(currentSeries * seriesSize, (currentSeries + 1) * seriesSize);
      selectedQuestions = randomizeQuestions(seriesQuestions);
    } else {
      // For random quiz, select 10 random questions
      selectedQuestions = randomizeQuestions(questions).slice(0, seriesSize);
    }

    setRandomizedHistoryQuestions(selectedQuestions);
    setIsRandomized(true);
  }, [isSeriesQuiz, seriesIndex, questions, randomizeQuestions]);

  return (
    <div>
      <Quiz
        questions={randomizedHistoryQuestions}
        handleAnswerUpdate={handleAnswerUpdate}
        handleQuizCompletion={handleQuizCompletion}
        userAnswers={userAnswers}
        resetQuiz={resetQuiz}
      />
    </div>
  );
}

export default HistoryQuiz;
