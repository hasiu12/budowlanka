import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import RandomQuiz from './quizComponent/RandomQuiz';
import SeriesQuiz from './quizComponent/SeriesQuiz';
import questions from './questions.json';
import questions_history from './questions_historia.json';
import QuizSummary from './quizComponent/QuizSummary';
import HistoryQuiz from './quizComponent/HistoryQuiz';

function App() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [questionsReady, setQuestionsReady] = useState(false);
  const [isRandomized, setIsRandomized] = useState(false);

  const [randomizedHistoryQuestions, setRandomizedHistoryQuestions] = useState([]);
  const [historyQuestionsReady, setHistoryQuestionsReady] = useState(false);

  const randomizeQuestions = (inputQuestions) => {
    // Oddziel pytania typu "matching" od innych
    const matchingQuestions = inputQuestions.filter(q => q.type === 'matching');
    const otherQuestions = inputQuestions.filter(q => q.type !== 'matching');

    // Mieszanie każdej grupy osobno
    const shuffle = (array) => {
      let currentIndex = array.length, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }
  
    const shuffledMatchingQuestions = shuffle([...matchingQuestions]);
    const shuffledOtherQuestions = shuffle([...otherQuestions]);
  
    // Łączenie pytań w ostatecznej kolejności
    let shuffledQuestions = [];
    while (shuffledMatchingQuestions.length || shuffledOtherQuestions.length) {
      if (shuffledOtherQuestions.length) {
        shuffledQuestions.push(shuffledOtherQuestions.shift());
      }
      if (shuffledMatchingQuestions.length) {
        shuffledQuestions.push(shuffledMatchingQuestions.shift());
      }
    }


    
    setRandomizedQuestions(shuffledQuestions);
    setQuestionsReady(true);
    return shuffledQuestions;
  };

  const shuffleQuestions = (questions) => {
    // Copy the questions array to avoid modifying the original array
    let shuffledQuestions = [...questions];
  
    // Shuffle the array using the Fisher-Yates (Durstenfeld) shuffle algorithm
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
  
    return shuffledQuestions;
  };
  
  useEffect(() => {
    const shuffledHistory = shuffleQuestions(questions_history);
    setRandomizedHistoryQuestions(shuffledHistory);
    setHistoryQuestionsReady(true);
  }, [questions_history]);

  useEffect(() => {
    if (!isRandomized) {
      randomizeQuestions(questions);
      setIsRandomized(true);
    }
  }, [questions, isRandomized]);

  const handleAnswerUpdate = (index, answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleQuizCompletion = (completed) => {
    setQuizCompleted(completed);
  };

  const resetQuiz = () => {
    setUserAnswers([]);
    setQuizCompleted(false);
    if (questions && questions.length > 0) {
      randomizeQuestions(questions);
    }
  };

  return (
    <Router basename="/budowlanka">
      <Routes>
      <Route path="/" element={<HomePage questions={questions} historyQuestions={questions_history}/>} />
        <Route path="/random-quiz" element={
           questionsReady ? (
            <RandomQuiz 
              questions={questions} 
              randomizeQuestions={randomizeQuestions}
              handleAnswerUpdate={handleAnswerUpdate} 
              handleQuizCompletion={handleQuizCompletion} 
              userAnswers={userAnswers} 
              resetQuiz={resetQuiz} 
            />
            ) : (
              <div>Ładowanie pytań...</div> // Możesz tu umieścić jakieś grafiki ładowania itp.
            )
          } />
          <Route path="/series-quiz/:seriesIndex" element={
            questionsReady ? (
            <SeriesQuiz 
              questions={questions} 
              randomizeQuestions={randomizeQuestions}
              handleAnswerUpdate={handleAnswerUpdate} 
              handleQuizCompletion={handleQuizCompletion} 
              userAnswers={userAnswers} 
              resetQuiz={resetQuiz} 
            />
            ) : (
              <div>Ładowanie pytań...</div> // Możesz tu umieścić jakieś grafiki ładowania itp.
            )
          } />
        <Route path="/quiz-summary" element={<QuizSummary questions={randomizedQuestions} userAnswers={userAnswers} resetQuiz={resetQuiz} />} />
        <Route path="/history-quiz/random" element={
          historyQuestionsReady ? (
            <RandomQuiz 
              questions={randomizedHistoryQuestions}
              randomizeQuestions={shuffleQuestions} // Use shuffleQuestions for random history quiz
              handleAnswerUpdate={handleAnswerUpdate}
              handleQuizCompletion={handleQuizCompletion}
              userAnswers={userAnswers}
              resetQuiz={resetQuiz}
            />
          ) : (
            <div>Ładowanie pytań...</div>
          )
        } />
        <Route path="/history-quiz/series/:seriesIndex" element={
          historyQuestionsReady ? (
            <SeriesQuiz 
              questions={questions_history}
              randomizeQuestions={randomizeQuestions} // Use randomizeQuestions for series history quiz
              handleAnswerUpdate={handleAnswerUpdate}
              handleQuizCompletion={handleQuizCompletion}
              userAnswers={userAnswers}
              resetQuiz={resetQuiz}
            />
          ) : (
            <div>Ładowanie pytań...</div>
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;
