import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Quiz from '../Quiz';

function SeriesQuiz({ questions, handleAnswerUpdate, handleQuizCompletion, userAnswers, resetQuiz, randomizeQuestions }) {
    const [randomizedSeriesQuestions, setRandomizedSeriesQuestions] = useState([]);
    const { seriesIndex } = useParams();
  const currentSeries = parseInt(seriesIndex, 10);
  const seriesSize = 10;
  const [isRandomized, setIsRandomized] = useState(false);
 
  useEffect(() => {
    // Wybierz serię pytań i zrandomizuj je
    if(!isRandomized){
        const selectedSeriesQuestions = randomizeQuestions(
            questions.slice(currentSeries * seriesSize, (currentSeries + 1) * seriesSize)
          );
          setRandomizedSeriesQuestions(selectedSeriesQuestions);
        setIsRandomized(true);
    }
  }, [currentSeries, questions, randomizeQuestions,isRandomized]);
  
  return (
    <div>
      {/* Wyświetlanie wybranej serii pytań */}
      <Quiz
        questions={randomizedSeriesQuestions}
        handleAnswerUpdate={handleAnswerUpdate}
        handleQuizCompletion={handleQuizCompletion}
        userAnswers={userAnswers}
        resetQuiz={resetQuiz}
      />
    </div>
  );
}

export default SeriesQuiz;
