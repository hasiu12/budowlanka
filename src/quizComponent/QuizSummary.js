import React from 'react';
import { Link } from 'react-router-dom';
import '../css/QuizSummary.css'; 

const QuizSummary = ({ questions, userAnswers, resetQuiz1 }) => {
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
        switch (question.type) {
            case "single-choice":
                return userAnswer || 'Brak odpowiedzi';
            case "multiple-choice":
                return userAnswer ? userAnswer.join(", ") : 'Brak odpowiedzi';
            case "matching":
                return userAnswer ? userAnswer.map(pair => `${pair.left} -> ${pair.right}`).join(", ") : 'Brak odpowiedzi';
            default:
                return 'Brak odpowiedzi';
        }
    };

    const displayCorrectAnswer = (question) => {
        switch (question.type) {
            case "single-choice":
                return question.poprawnaOdpowiedz;
            case "multiple-choice":
                return question.poprawneOdpowiedzi ? question.poprawneOdpowiedzi.join(", ") : 'Brak poprawnej odpowiedzi';
            case "matching":
                return question.poprawnePary ? question.poprawnePary.map(pair => `${pair[0]} -> ${pair[1]}`).join(", ") : 'Brak poprawnej odpowiedzi';
            default:
                return 'Brak poprawnej odpowiedzi';
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
                    <p className="quiz-summary-text">Twoja odpowiedź: {displayAnswer(question, userAnswers[index])}</p>
                    <p className="quiz-summary-text">Poprawna odpowiedź: {displayCorrectAnswer(question)}</p>
                </div>
            ))}
        </div>
    );
};

export default QuizSummary;
