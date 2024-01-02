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
                        // Przekształć odpowiedzi użytkownika na zestaw unikalnych par w formacie "lewyPrawy"
                        let userPairsSet = new Set(Object.entries(userAnswer).map(([left, right]) => `${left}-${right}`));
                    
                        // Przekształć poprawne odpowiedzi na zestaw unikalnych par w formacie "lewyPrawy"
                        let correctPairsSet = new Set(question.poprawnePary.map(([left, right]) => `${left}-${right}`));
                    
                        // Porównaj zestawy, aby stwierdzić, czy wszystkie odpowiedzi użytkownika są poprawne
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
                        return question.lewaStrona.map((leftItem, index) => {
                            const rightItem = userAnswer[leftItem]; // Pobierz dopasowanie z odpowiedzi użytkownika
                            const isCorrect = question.poprawnePary.some(pair => pair[0] === leftItem && pair[1] === rightItem);
                            const rightAnswerClass = isCorrect ? 'correct' : 'incorrect';
                            
                            return (
                                <div key={index} className="answer-pair-container">
                                    <div className="answer-box left-item">
                                        {leftItem}
                                    </div>
                                    <div className={`answer-box right-item ${rightAnswerClass}`}>
                                        {rightItem || "N/A"}
                                    </div>
                                </div>
                            );
                        });
                    
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
                    return question.lewaStrona.map((leftItem, index) => {
                        // Znajdź dopasowaną odpowiedź użytkownika dla danego elementu z lewej strony
                        const rightItem = userAnswer[leftItem];
                    
                        // Sprawdź, czy para jest poprawna
                        const isPairCorrect = question.poprawnePary.some(pair => pair[0] === leftItem && pair[1] === rightItem);
                    
                        // Ustal klasę odpowiedzi na podstawie tego, czy para jest poprawna
                        const leftAnswerClass = 'left-answer'; // Klasa dla lewej strony (zawsze szara)
                        const rightAnswerClass = isPairCorrect ? 'right-answer correct' : (rightItem ? 'right-answer incorrect' : 'right-answer neutral');
                    
                        // Wyświetl dopasowaną odpowiedź lub "N/A", jeśli żadna nie została wybrana
                        const displayedRight = rightItem || "N/A";
                    
                        return (
                            <div key={index} className="matching-pair-container">
                                <div className={`answer-box ${leftAnswerClass}`}>
                                    {leftItem}
                                </div>
                                <div className={`answer-box ${rightAnswerClass}`}>
                                    {displayedRight}
                                </div>
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
                        <div key={index} className="answer-pair-container">
                            <div className="answer-box left-answer">{pair[0]}</div>
                            <div className="answer-box right-answer">{pair[1]}</div>
                        </div>
                    ));
        }
    };

    return (
        <div className="quiz-summary-container">
            <div className="quiz-summary-actions">
                <button onClick={resetQuiz1} className="quiz-summary-button">
                    Rozwiąż ponownie
                </button>
                <Link to="/" className="quiz-summary-link" onClick={resetQuiz1}>
                    Powrót do wyboru quizów
                </Link>
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
