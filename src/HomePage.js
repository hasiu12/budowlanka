import React from 'react';
import { Link } from 'react-router-dom';
import './css/HomePage.css';

function HomePage({ questions, historyQuestions }) {
  const seriesSize = 10;
  const totalQuestions = questions.length;
  const numberOfSeries = Math.ceil(totalQuestions / seriesSize);

  const totalHistoryQuestions = historyQuestions.length;
  const numberOfHistorySeries = Math.ceil(totalHistoryQuestions / seriesSize);

  return (
    <div className="home-container">
      <h1 className="home-header">Wybierz quiz</h1>
      <p className="home-paragraph">
        Tutaj możesz wybrać, który quiz chcesz rozwiązać. Wybierz jeden z dostępnych quizów lub spróbuj losowego zestawu pytań.
      </p>
      
      {/* Sekcja dla losowego quizu */}
      <div className="random-quiz-section">
      <h2 className="history-header">Quizy z systemów wbudowanych</h2>
        <Link to="/random-quiz" className="quiz-link">Losowy Quiz</Link>
      </div>

      {/* Sekcja dla serii quizów */}
      <div className="series-quiz-section">
        <div className="quiz-grid">
          {Array.from({ length: numberOfSeries }, (_, i) => (
            <Link
              key={i}
              to={`/series-quiz/${i}`}
              className="quiz-link"
            >
              Serie {i + 1}
            </Link>
          ))}
        </div>
      </div>

      {/* Sekcja dla quizów z historii */}
      <div className="history-quiz-section">
        <h2 className="history-header">Quizy z Historii</h2>
        <p className="home-paragraph">
        Quiz został wygenerowany na bazie pytań znalezionych na studocu 
      </p>

        {/* Losowy quiz z historii */}
        <Link to="/history-quiz/random" className="quiz-link">Losowy Quiz z Historii</Link>
        {/* Seria quizów z historii */}
        <div className="quiz-grid">
          {Array.from({ length: numberOfHistorySeries }, (_, i) => (
            <Link
              key={i}
              to={`/history-quiz/series/${i}`}
              className="quiz-link"
            >
              Quiz z Historii nr {i + 1}
            </Link>
          ))}
        </div>
      </div>
      <p className="home-paragraph">
      ChatGPT can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}

export default HomePage;
