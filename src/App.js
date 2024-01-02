import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Quiz from './Quiz';
import questions from './questions.json';
import QuizSummary from './quizComponent/QuizSummary'

function App() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [questionsReady, setQuestionsReady] = useState(false);

  useEffect(() => {
    randomizeQuestions();
  }, []);

  const randomizeQuestions = () => {
    // Mieszanie pytań
    let shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    setRandomizedQuestions(shuffledQuestions);
    setQuestionsReady(true);
  };

  useEffect(() => {
    randomizeQuestions();
  }, []);

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
    randomizeQuestions(); // Ponownie losuj pytania przy resecie
  };

  return (
    <Router basename="/budowlanka">
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/Quiz" element={
            questionsReady ? ( // Renderuj Quiz tylko gdy pytania są gotowe
              <Quiz 
                questions={randomizedQuestions} 
                handleAnswerUpdate={handleAnswerUpdate} 
                handleQuizCompletion={handleQuizCompletion} 
                userAnswers={userAnswers} 
                resetQuiz={resetQuiz} 
              />
            ) : (
              <div>Ładowanie pytań...</div> // Możesz tu umieścić jakieś grafiki ładowania itp.
            )
          } 
          />
        <Route path="/quiz-summary" element={<QuizSummary questions={randomizedQuestions} userAnswers={userAnswers} resetQuiz={resetQuiz} />} />
      </Routes>
    </Router>
  );
}

export default App;
