import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/QuizSummary.css'; 

const QuizSummary = ({ questions, userAnswers, resetQuiz1 }) => {
    const [expandedAnswers, setExpandedAnswers] = useState({}); 

    const calculateScore = () => {
        let score = 0;
        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];

            switch (question.type) {
                case "single-choice":
                    if (userAnswer === question.poprawnaOdpowiedz) {
                        score++;
                    }
                    break;

                case "multiple-choice":
                    const isMultipleChoiceCorrect = userAnswer.every(ans => question.poprawneOdpowiedzi.includes(ans)) &&
                        question.poprawneOdpowiedzi.every(ans => userAnswer.includes(ans));

                    if (isMultipleChoiceCorrect) {
                        score++;
                    }
                    break;

                case "matching":
                    let userPairsSet = new Set(userAnswer.map(pair => `${pair.left}-${pair.right}`));
                    let correctPairsSet = new Set(question.poprawnePary.map(pair => `${pair[0]}-${pair[1]}`));
                
                    if (userPairsSet.size === correctPairsSet.size && 
                        [...userPairsSet].every(pair => correctPairsSet.has(pair))) {
                        score++;
                    }
                    
                    break;

                default:
                    break;
            }
        });
        return score;
    };
    
    const score = calculateScore();

    const displayAnswer = (question, userAnswer) => {
        const isCorrectAnswer = (type, answer) => {
            switch (type) {
                case "single-choice":
                    return question.poprawnaOdpowiedz === answer;
                case "multiple-choice":
                    return question.poprawneOdpowiedzi.includes(answer);
                case "matching":
                    return question.poprawnePary.some(pair => pair[0] === answer.left && pair[1] === answer.right);
                default:
                    return false;
            }
        };


        const isQuestionCorrect = (type, userAnswer) => {
            switch (type) {
                case "single-choice":
                    return userAnswer === question.poprawnaOdpowiedz;
                case "multiple-choice":
                    return userAnswer.every(ans => question.poprawneOdpowiedzi.includes(ans)) &&
                           question.poprawneOdpowiedzi.every(ans => userAnswer.includes(ans));
                case "matching":
                    // Logika porównywania par dla pytań matching
                    return userAnswer.length === question.poprawnePary.length &&
                           userAnswer.every(userPair => 
                               question.poprawnePary.some(correctPair => 
                                   correctPair[0] === userPair.left && correctPair[1] === userPair.right));
                default:
                    return false;
            }
        };
    
        switch (question.type) {
            case "single-choice":
            case "multiple-choice":
                return question.odpowiedzi.map(odpowiedz => {
                    const isSelected = userAnswer.includes(odpowiedz);
                    const answerClass = isSelected
                        ? isCorrectAnswer(question.type, odpowiedz)
                            ? 'correct'
                            : isQuestionCorrect(question.type, userAnswer)
                                ? 'neutral'
                                : 'incorrect'
                        : 'neutral';
                    
                    return (
                        <div key={odpowiedz} className={`answer-box ${answerClass}`}>
                            {odpowiedz}
                        </div>
                    );
                });
        
case "matching":
    return question.pary.map((pair, index) => {
        // Znajdź wszystkie odpowiedzi użytkownika dla lewej strony bieżącej pary
        const userPairsForLeft = userAnswer.filter(p => p.left === pair[0]);
        const isPairCorrect = userPairsForLeft.some(userPair => pair[1] === userPair.right);
        const isPairSelected = userPairsForLeft.length > 0;

        // Jeśli para nie została wybrana, użyj "N/A", w przeciwnym razie pokaż wybrane wartości
        const displayedRight = isPairSelected 
            ? userPairsForLeft.map(userPair => userPair.right).join(", ") 
            : "N/A";

        const answerClass = isPairCorrect ? 'correct' : (isPairSelected ? 'incorrect' : 'neutral');

        return (
            <div key={index} className={`answer-box matching ${answerClass}`}>
                {pair[0]} dla {displayedRight}
            </div>
        );
    });
            default:
                return <div>Brak odpowiedzi</div>;
        }
    };
    
    const toggleAnswerVisibility = (questionId) => {
        setExpandedAnswers(prevState => ({
            ...prevState,
            [questionId]: !prevState[questionId] // Przełącza widoczność dla danego pytania
        }));
    };

    const renderCorrectAnswer = (question) => {
        switch (question.type) {
            case "single-choice":
                return <div className="correct-answer">{question.poprawnaOdpowiedz}</div>;
            case "multiple-choice":
                return question.poprawneOdpowiedzi.map((answer, index) => (
                    <div key={index} className="correct-answer">{answer}</div>
                ));
            case "matching":
                return question.poprawnePary.map((pair, index) => (
                    <div key={index} className="correct-answer">{pair[0]} dla {pair[1]}</div>
                ));
        }
    };

    return (
        <div className="quiz-summary-container">
          <div className="quiz-summary-actions">
            <button onClick={resetQuiz1} className="quiz-summary-button">Rozwiąż ponownie</button>
            <Link to="/" className="quiz-summary-link">Powrót do wyboru quizów</Link>
          </div>
      
          <h2 className="quiz-summary-header">Podsumowanie Quizu</h2>
          <p className="quiz-summary-text">Twój wynik: {score} z {questions.length}</p>
      
          {questions.map((question, index) => (
            <div key={index} className="question-answer-container">
              <h3 className="question-header">{question.text}</h3>
              <div className="quiz-summary-text">
                {displayAnswer(question, userAnswers[index])}
                <button onClick={() => toggleAnswerVisibility(question.id)} className="toggle-correct-answers">
                  {expandedAnswers[question.id] ? 'Ukryj poprawne odpowiedzi' : 'Pokaż poprawne odpowiedzi'}
                </button>
              </div>
              {expandedAnswers[question.id] && (
                <div className="correct-answers-container">
                  {renderCorrectAnswer(question)}
                </div>
              )}
            </div>
          ))}
        </div>
      );      
};

export default QuizSummary;
