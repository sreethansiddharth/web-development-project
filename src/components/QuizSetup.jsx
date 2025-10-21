import React from 'react';
function QuizSetup({ onStartQuiz }) {
  const [numQuestions, setNumQuestions] = React.useState(10);
  const [difficulty, setDifficulty] = React.useState('medium');
  const handleStart = () => {
    onStartQuiz({ numQuestions, difficulty });
  };
  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2 className="text-5xl font-bold text-gray-800 mb-12 text-center">🎯 Quiz Setup</h2>
        
        <div className="mb-10">
          <label htmlFor="num-questions" className="block text-gray-800 font-semibold mb-6 text-2xl">
            📊 Number of Questions:
          </label>
          <select 
            id="num-questions"
            value={numQuestions} 
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            className="input-professional"
          >
            <option value={5}>5 Questions</option>
            <option value={10}>10 Questions</option>
            <option value={15}>15 Questions</option>
            <option value={20}>20 Questions</option>
          </select>
        </div>        
        <div className="mb-12">
          <label htmlFor="difficulty" className="block text-gray-800 font-semibold mb-6 text-2xl">
            🎯 Difficulty Level:
          </label>
          <select 
            id="difficulty"
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className="input-professional"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="text-center">
          <button 
            onClick={handleStart}
            className="btn-primary text-2xl py-6 px-12 animate-bounce"
          >
            🚀 Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
export default QuizSetup;
