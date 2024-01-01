import React, { useState , useEffect } from 'react';
import MatchingQuestion from './quizComponent/MatchingQuestion';
import SingleChoiceQuestion from './quizComponent/SingleChoiceQuestion';
import MultipleChoiceQuestion from './quizComponent/MultipleChoiceQuestion';
import QuizSummary from './quizComponent/QuizSummary';
import './css/Quiz.css'; 

const Quiz = ({ questions, handleAnswerUpdate, handleQuizCompletion, userAnswers, resetQuiz }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [isOptionSelected, setIsOptionSelected] = useState(false);


    const [temporaryAnswer, setTemporaryAnswer] = useState(null);
    const [currentAnswer, setCurrentAnswer] = useState(null);

    useEffect(() => {
      setIsOptionSelected(userAnswers[currentQuestionIndex] != null);
  }, [currentQuestionIndex, userAnswers]);

  const handleAnswer = (answer) => {
    handleAnswerUpdate(currentQuestionIndex, answer);
    setIsOptionSelected(true);
  };
  
    const onOptionSelect = (isSelected, answers = null) => {
      switch (currentQuestion.type) {
        case "matching":
          setIsOptionSelected(isSelected);
          if (isSelected) {
            setCurrentAnswer(answers);
          }
          break;
          case "single-choice":
            setIsOptionSelected(isSelected);
            if (isSelected) {
                setCurrentAnswer(isSelected);
            }
            break;
        case "multiple-choice":
          setIsOptionSelected(isSelected);
          break;
        default:
          break;
      }
    };
    
    const goToNextQuestion = () => {
      if (isOptionSelected) {
        if (currentQuestion.type === "matching" && currentAnswer != null) {
          handleAnswerUpdate(currentQuestionIndex, currentAnswer);
        }
        if (currentQuestion.type === "multiple-choice" &&temporaryAnswer != null) {
          handleAnswerUpdate(currentQuestionIndex, temporaryAnswer);
        }

        if (currentQuestion.type === "single-choice") {
          handleAnswerUpdate(currentQuestionIndex, currentAnswer);
        }

        if (currentQuestionIndex === questions.length - 1) {
          handleQuizCompletion(true);
          setQuizCompleted(true);
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setIsOptionSelected(false);
          setCurrentAnswer(null); 
        }
      }
    };
      
    const goToPreviousQuestion = () => {
      if (currentQuestionIndex > 0) {
        const previousAnswer = userAnswers[currentQuestionIndex - 1];
        setCurrentAnswer(previousAnswer);
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setIsOptionSelected(previousAnswer != null);
      }
    };

      

      const resetQuiz1 = () => {
        setCurrentQuestionIndex(0);
        setCurrentAnswer(null);
        setIsOptionSelected(false); 
        setTemporaryAnswer(null);
        setQuizCompleted(false);
        resetQuiz();
    };
    
    



    const renderQuestion = () => {
      switch (currentQuestion.type) {
        case "single-choice":
          return (
            <SingleChoiceQuestion 
              pytanie={currentQuestion} 
              externalSelectedAnswer={userAnswers[currentQuestionIndex]}
              onAnswer={handleAnswer} 
              onOptionSelect={onOptionSelect}
            />
          );
          case "multiple-choice":
            
            return (
              <MultipleChoiceQuestion 
                pytanie={currentQuestion} 
                onOptionSelect={onOptionSelect} 
                setTemporaryAnswer={setTemporaryAnswer}
                externalSelectedAnswer={userAnswers[currentQuestionIndex]}
              />
            );
            case "matching":
              return (
                <MatchingQuestion 
                    pytanie={currentQuestion} 
                    selectedPairs1={userAnswers[currentQuestionIndex]}
                    onOptionSelect={(allPairsSelected, pairs) => onOptionSelect(allPairsSelected, pairs)}
                />
            );
        default:
          return <p>Nieznany typ pytania</p>;
      }
    };
  
    // Renderowanie pytania i przycisków nawigacyjnych
    return (
      <div className="quiz-container">
          {!quizCompleted ? (
              <div>
                  {renderQuestion()}
                  <div className="nav-buttons-container">
                      <button 
                          className="nav-button" 
                          onClick={goToPreviousQuestion}
                          disabled={currentQuestionIndex === 0}
                      >
                          Poprzednie
                      </button>
                      <button 
                          className="nav-button" 
                          onClick={goToNextQuestion}
                          disabled={!isOptionSelected}
                      >
                          Następne
                      </button>
                  </div>
              </div>
          ) : (
              <QuizSummary questions={questions} userAnswers={userAnswers} resetQuiz1={resetQuiz1}/>
          )}
      </div>
  );
};

export default Quiz;