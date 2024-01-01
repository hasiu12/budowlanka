import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; // Zaimportuj komponent HomePage
import Quiz from './Quiz';
import questions from './questions.json';
import QuizSummary from './quizComponent/QuizSummary'

function App() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

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
};

  return (
    <Router basename="/budowlanka">
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/Quiz" element={
      <Quiz 
          questions={questions} 
          handleAnswerUpdate={handleAnswerUpdate} 
          handleQuizCompletion={handleQuizCompletion} 
          userAnswers={userAnswers} 
          resetQuiz={resetQuiz} 
      />} 
    />
      <Route path="/quiz-summary" element={<QuizSummary questions={questions} userAnswers={userAnswers} />} />
      </Routes>
    </Router>
  );
}

export default App;
