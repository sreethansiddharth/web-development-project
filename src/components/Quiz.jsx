import React, { useState, useEffect } from 'react';
function decodeHtml(input) {
  if (!input) return '';
  const txt = document.createElement('textarea');
  txt.innerHTML = input;
  return txt.value;
}
function Quiz({ 
  questions, 
  currentQuestionIndex, 
  setCurrentQuestionIndex, 
  userAnswers, 
  setUserAnswers, 
  score, 
  setScore, 
  setQuizCompleted 
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  useEffect(() => {
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
  }, [currentQuestionIndex]);
  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-card">
        <div className="loading-spinner"></div>
        <p className="text-center" style={{color:'#4b5563',fontSize:'18px'}}>Loading questions...</p>
      </div>
    );
  }
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const handleAnswer = (selectedOption) => {
    if (answerSubmitted) return; 
    setSelectedAnswer(selectedOption);
    setAnswerSubmitted(true);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newUserAnswers);
    if (selectedOption === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1200);
  };
  const getOptionClass = (option) => {
    if (!answerSubmitted) return "quiz-option";
    if (option === currentQuestion.correct_answer) return "quiz-option correct";
    if (option === selectedAnswer && option !== currentQuestion.correct_answer) return "quiz-option incorrect";
    return "quiz-option disabled";
  };
  return (
    <div className="quiz-card">
      <h1 style={{textAlign:'center',color:'#111827',fontWeight:800,fontSize:'34px',marginBottom:'16px',marginTop:'8px'}}>📝 Quiz in Progress...</h1>
      <div style={{marginBottom:'20px'}}>
        <p className="quiz-question">
          {decodeHtml(currentQuestion.question)}
        </p>
      </div>
      
      <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'24px'}}>
        {currentQuestion.shuffledAnswers.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={answerSubmitted}
            className={getOptionClass(option)}
          >
            <span style={{lineHeight:1.4}}>{decodeHtml(option)}</span>
          </button>
        ))}
      </div>
      <div style={{textAlign:'center',color:'#4b5563',fontSize:'18px'}}>
        <div className="score-display" style={{display:'inline-block'}}>
          <div className="score-number">{score}/{totalQuestions}</div>
          <div className="score-label">Current Score</div>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
        <p style={{marginTop:'6px',fontSize:'14px',color:'#6b7280'}}>Question {currentQuestionIndex + 1} of {totalQuestions}</p>
      </div>
    </div>
  );
}
export default Quiz;
