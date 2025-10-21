
import React from 'react';
function decodeHtml(input) {
  if (!input) return '';
  const txt = document.createElement('textarea');
  txt.innerHTML = input;
  return txt.value;
}

const QuizResult = ({
  questions = [],
  userAnswers = [],
  score,
  questionCount,
  coins,
  reward,
  onPlayAgain,
  onBack
}) => {
  const percentage = Math.round((score / questionCount) * 100);
  const isPerfect = score === questionCount;

  // Mascot selection based on score
  const getMascot = () => {
    if (percentage >= 90) return '🎉'; // Celebrating
    if (percentage >= 70) return '😊'; // Happy
    if (percentage >= 50) return '👍'; // Encouraging
    return '💪'; // Motivating
  };

  const getMascotMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a quiz master! 🌟";
    if (percentage >= 70) return "Excellent work! You know your stuff! 🎯";
    if (percentage >= 50) return "Good job! Keep up the great work! 📚";
    return "Nice effort! Every quiz makes you smarter! 💡";
  };

  const getMascotColor = () => {
    if (percentage >= 90) return 'linear-gradient(135deg, #FFD700, #FF6B6B)'; // Gold/Red
    if (percentage >= 70) return 'linear-gradient(135deg, #4ECDC4, #44A08D)'; // Teal
    if (percentage >= 50) return 'linear-gradient(135deg, #45B7D1, #96C93D)'; // Blue/Green
    return 'linear-gradient(135deg, #EC265F, #26ECB4)'; // Brand colors
  };

  return (
    <div className="quiz-container" role="main" aria-label="Quiz Results">
      <div className="quiz-card">
        {/* MASCOT DISPLAY */}
        <div 
          style={{ 
            background: getMascotColor(),
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            fontSize: '48px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
          }}
          className="animate-bounce"
          role="img"
          aria-label={getMascotMessage()}
        >
          {getMascot()}
        </div>
        
        <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
          {isPerfect ? 'Perfect Score! 🎯' : 'Quiz Completed!'}
        </h1>
        
        <p 
          className="text-xl text-gray-600 text-center mb-8" 
          style={{ fontStyle: 'italic', fontWeight: '500' }}
          aria-live="polite"
        >
          {getMascotMessage()}
        </p>
        
        {/* Score Summary */}
        <div className="score-display mb-10" role="status" aria-live="polite">
          <div className="score-number">
            Your Score: {score}/{questionCount}
          </div>
          <div className="score-label">
            Percentage: {percentage}%
          </div>
          <div className="score-label mt-2">
            Coins Earned: {coins}
          </div>
          {reward && (
            <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
              <p className="text-yellow-800 font-bold text-xl">
                🎁 {reward}
              </p>
            </div>
          )}
        </div>

        <div 
          className="progress-bar mb-8"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`Score percentage: ${percentage}%`}
        >
          <div 
            className="progress-fill" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {/* QUESTION REVIEW SECTION */}
        {questions && questions.length > 0 && (
          <div 
            style={{
              background: '#f8fafc',
              borderRadius: '16px',
              padding: '24px',
              margin: '20px 0',
              border: '2px solid #e5e7eb'
            }}
            role="region"
            aria-label="Question Review"
          >
            <h2 
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#1f2937',
                textAlign: 'center',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <span style={{ fontSize: '32px' }}>📋</span>
              Detailed Question Review
            </h2>
            
            <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
              {questions.map((question, index) => {
                if (!question) return null;
                
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.correct_answer;
                
                return (
                  <div 
                    key={index}
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '16px',
                      marginBottom: '16px',
                      border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                    role="article"
                    aria-label={`Question ${index + 1} review`}
                  >
                    {/* Question */}
                    <div 
                      style={{
                        fontWeight: '600',
                        marginBottom: '12px',
                        color: '#1f2937',
                        fontSize: '16px',
                        lineHeight: '1.5'
                      }}
                    >
                      <span 
                        style={{
                          background: isCorrect ? '#10b981' : '#ef4444',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          marginRight: '8px'
                        }}
                      >
                        Q{index + 1}
                      </span>
                      {decodeHtml(question.question)}
                    </div>
                    
                    {/* User's Answer */}
                    <div 
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        marginBottom: '8px',
                        backgroundColor: isCorrect ? '#d1fae5' : '#fee2e2',
                        color: isCorrect ? '#065f46' : '#991b1b',
                        border: `1px solid ${isCorrect ? '#10b981' : '#ef4444'}`
                      }}
                      aria-label={`Your answer: ${decodeHtml(userAnswer || 'Not answered')}. ${isCorrect ? 'Correct' : 'Incorrect'}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 'bold' }}>Your answer:</span>
                        <span>{decodeHtml(userAnswer || 'Not answered')}</span>
                        <span style={{ fontSize: '18px' }}>
                          {isCorrect ? '✅' : '❌'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Correct Answer */}
                    <div 
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        border: '1px solid #3b82f6'
                      }}
                      aria-label={`Correct answer: ${decodeHtml(question.correct_answer)}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 'bold' }}>Correct answer:</span>
                        <span>{decodeHtml(question.correct_answer)}</span>
                        <span style={{ fontSize: '18px' }}>✅</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center" role="navigation" aria-label="Quiz actions">
          <button 
            onClick={onPlayAgain} 
            className="btn-primary text-2xl py-6 px-12"
            aria-label="Play the quiz again"
          >
            🔄 Play Again
          </button>
          <button 
            onClick={onBack} 
            className="btn-secondary text-2xl py-6 px-12"
            aria-label="Go back to home page"
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
