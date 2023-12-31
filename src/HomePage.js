import React from 'react';
import { Link } from 'react-router-dom';
import './css/HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="home-header">Wybierz quiz</h1>
      <Link to="/Quiz" className="quiz-link">Quiz 1</Link>
      <p className="home-paragraph">
        Witaj na stronie wyboru quizów. Tutaj możesz wybrać quiz do rozwiązania.
      </p>
    </div>
  );
}

export default HomePage;
