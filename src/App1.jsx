import React, { useState, useEffect } from 'react';


function App() {
  // State variables for application logic
  const [authMode, setAuthMode] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [isQuizSetupComplete, setIsQuizSetupComplete] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [coins, setCoins] = useState(0);
  const [reward, setReward] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [userData, setUserData] = useState({ email: '', username: '', age: '', gender: '', mobile: '', password: '' });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ ...userData });
  const [authMessage, setAuthMessage] = useState('');

  // Function to handle authentication selection (Sign In or Sign Up)
  const handleAuthSelection = (mode) => {
    setAuthMode(mode);
    setAuthMessage(''); // Clear any previous messages
  };

  // Function to handle user login
  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setUserData(user);
    localStorage.setItem('userData', JSON.stringify(user));
  };

  // Function to handle category selection and reset quiz state
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsQuizSetupComplete(false);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setQuizCompleted(false);
    setScore(0);
    setUserAnswers([]);
    setShowProfile(false);
    setReward(null);
  };

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUserData({ email: '', username: '', age: '', gender: '', mobile: '', password: '' });
    setCoins(0);
    setAuthMode(null);
    setSelectedCategory(null);
  };

  // Utility function to validate mobile number input
  const isValidMobile = (value) => {
    const onlyDigits = /^[0-9]{0,10}$/;
    return onlyDigits.test(value);
  };

  // Load user data from local storage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData(user);
      setIsAuthenticated(true);
      // Fetch coins for the logged-in user if available in local storage
      const allUsers = JSON.parse(localStorage.getItem('allUsers')) || {};
      const userWithCoins = allUsers[user.email];
      if (userWithCoins && userWithCoins.coins) {
        setCoins(userWithCoins.coins);
      }
    }
  }, []);

  // Fetch questions when quiz setup is complete
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!questionCount || isNaN(questionCount) || Number(questionCount) <= 0) {
        return;
      }
      try {
        let url = '';
        const categoryMap = {
          'Music': 12, 'Math': 19, 'Movies': 11, 'Science': 17, 'Computer Science': 18,
          'Geography': 22, 'History': 23, 'Mythology': 20, 'Sports': 21
        };

        const categoryId = categoryMap[selectedCategory];
        if (categoryId) {
          url = `https://opentdb.com/api.php?amount=${questionCount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
        } else if (selectedCategory === 'Miscellaneous') {
          url = `https://opentdb.com/api.php?amount=${questionCount}&difficulty=${difficulty}&type=multiple`;
        }

        if (url) {
          const res = await fetch(url);
          const data = await res.json();
          const shuffledData = data.results.map((q) => {
            const answers = [...q.incorrect_answers, q.correct_answer];
            const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
            return { ...q, shuffledAnswers };
          });
          setQuestions(shuffledData);
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    if (isQuizSetupComplete && !quizCompleted && questions.length === 0) {
      fetchQuestions();
    }
  }, [isQuizSetupComplete, quizCompleted, questionCount, difficulty, selectedCategory]);

  // Handle coins and rewards after the quiz is completed
  useEffect(() => {
    if (quizCompleted && score === parseInt(questionCount)) {
      const earnedCoins = 3;
      const updatedCoins = coins + earnedCoins;
      setCoins(updatedCoins);
      const allUsers = JSON.parse(localStorage.getItem('allUsers')) || {};
      const updatedUser = { ...userData, coins: updatedCoins };
      allUsers[userData.email] = updatedUser;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
      localStorage.setItem('userData', JSON.stringify(updatedUser));

      if (updatedCoins >= 250) {
        setReward("🎁 Congratulations! You've earned a gift voucher!");
      }
    }
  }, [quizCompleted, score, questionCount]);

  // Navbar component for navigation
  const NavBar = () => (
    <div className="navbar">
      <div className="nav-links">
        <span onClick={handleHomeClick}>🏠 Home</span>
        <div className="dropdown-container">
          <span onClick={() => setShowSubjectDropdown(prev => !prev)}>
            📚 Subjects ▾
          </span>
          {showSubjectDropdown && (
            <div className="dropdown-menu">
              {['Music', 'Movies', 'Math', 'Science', 'Computer Science', 'Geography', 'History', 'Mythology', 'Sports', 'Miscellaneous'].map(subject => (
                <div key={subject} onClick={() => { handleCategoryClick(subject); setShowSubjectDropdown(false); }}>
                  {subject}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="user-profile">
        <span onClick={() => setShowDropdown(!showDropdown)}>
          👤 {userData.username} ▾
        </span>
        {showDropdown && (
          <div className="dropdown-menu user-dropdown">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Coins:</strong> {coins}</p>
            <button onClick={() => { setShowProfile(true); setShowDropdown(false); }}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );

  // Function to go back to the home screen
  const handleHomeClick = () => {
    setSelectedCategory(null);
    setIsQuizSetupComplete(false);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setQuizCompleted(false);
    setScore(0);
    setUserAnswers([]);
    setShowProfile(false);
    setReward(null);
  };
  
  // Renders the main application based on state
  // This is a single, clean return with clear conditional logic.
  if (!isAuthenticated) {
    return (
      <div className="container">
        <h2 className="title">🔐 Welcome to the Quiz App</h2>
        <p>Select an option to continue:</p>
        <div className="button-group">
          <button onClick={() => handleAuthSelection('signin')}>Sign In</button>
          <button onClick={() => handleAuthSelection('signup')}>Sign Up</button>
        </div>
        {authMessage && <p className="auth-message">{authMessage}</p>}
        {authMode === 'signin' && (
          <div className="auth-form">
            <h3>Sign In</h3>
            <input placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} /><br />
            <input placeholder="Password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} /><br />
            <button onClick={() => {
              const users = JSON.parse(localStorage.getItem('allUsers')) || {};
              const user = users[loginEmail];
              if (user && user.password === loginPassword) {
                handleLogin(user);
              } else {
                setAuthMessage("Invalid email or password. Please try again or sign up.");
              }
            }}>Login</button>
          </div>
        )}
        {authMode === 'signup' && (
          <div className="auth-form">
            <h3>Sign Up</h3>
            <input placeholder="Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} /><br />
            <input placeholder="Username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} /><br />
            <input placeholder="Age" onChange={(e) => setUserData({ ...userData, age: e.target.value })} /><br />
            <div className="form-field">
              <label>Gender:</label>
              <select defaultValue="" onChange={(e) => setUserData({ ...userData, gender: e.target.value })}>
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <input placeholder="Mobile Number" value={userData.mobile} onChange={(e) => {
              const value = e.target.value;
              if (isValidMobile(value)) {
                setUserData({ ...userData, mobile: value });
              }
            }} maxLength={10} /><br />
            <input placeholder="Password" type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} /><br />
            <button onClick={() => {
              const users = JSON.parse(localStorage.getItem('allUsers')) || {};
              if (users[userData.email]) {
                setAuthMessage("User already exists. Please sign in.");
                return;
              }
              const newUser = { ...userData, coins: 0 };
              users[userData.email] = newUser;
              localStorage.setItem('allUsers', JSON.stringify(users));
              handleLogin(newUser);
            }}>Register</button>
          </div>
        )}
      </div>
    );
  }

  // Profile page render logic
  if (showProfile) {
    const handleSaveChanges = () => {
      const users = JSON.parse(localStorage.getItem('allUsers')) || {};
      const updatedUser = { ...editedUserData, coins: userData.coins };
      users[updatedUser.email] = updatedUser;
      localStorage.setItem('allUsers', JSON.stringify(users));
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setEditMode(false);
    };

    return (
      <div className="container">
        <NavBar />
        <h2 className="title">👤 Your Profile</h2>
        {editMode ? (
          <div className="profile-edit">
            <p><strong>Username:</strong><br /><input value={editedUserData.username} onChange={(e) => setEditedUserData({ ...editedUserData, username: e.target.value })} /></p>
            <p><strong>Age:</strong><br /><input value={editedUserData.age} onChange={(e) => setEditedUserData({ ...editedUserData, age: e.target.value })} /></p>
            <p><strong>Gender:</strong><br />
              <select value={editedUserData.gender} onChange={(e) => setEditedUserData({ ...editedUserData, gender: e.target.value })}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </p>
            <p><strong>Mobile:</strong><br /><input value={editedUserData.mobile} onChange={(e) => { const value = e.target.value; if (/^[0-9]{0,10}$/.test(value)) { setEditedUserData({ ...editedUserData, mobile: value }); } }} /></p>
            <button onClick={handleSaveChanges}>💾 Save Changes</button>
            <button onClick={() => { setEditMode(false); setEditedUserData(userData); }}>❌ Cancel</button>
          </div>
        ) : (
          <div className="profile-view">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Age:</strong> {userData.age}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>Mobile:</strong> {userData.mobile}</p>
            <p><strong>Coins:</strong> {coins}</p>
            {reward && <p className="reward-message">{reward}</p>}
            <button onClick={() => { setEditMode(true); setEditedUserData(userData); }}>✏️ Edit Profile</button>
          </div>
        )}
      </div>
    );
  }

  // Quiz completion page render logic
  if (quizCompleted) {
    return (
      <div className="container">
        <NavBar />
        <h2 className="title">🎉 Quiz Completed!</h2>
        <p>Your Score: {score}/{questionCount}</p>
        <p>Coins Earned: {score === parseInt(questionCount) ? 3 : 0}</p>
        {reward && <p className="reward-message">{reward}</p>}
        <div className="button-group">
          <button onClick={() => {
            setQuestions([]);
            setCurrentQuestionIndex(0);
            setUserAnswers([]);
            setScore(0);
            setQuizCompleted(false);
            setReward(null);
            setIsQuizSetupComplete(false); // Reset first
            // No need for timeout, useEffect will handle it
          }}>🔄 Play Again</button>
          <button onClick={handleHomeClick}>🔙 Back</button>
        </div>
      </div>
    );
  }

  // Quiz setup and question page render logic
  return (
    <div className="container">
      <NavBar />
      {!selectedCategory ? (
        <div className="category-selection">
          <h2 className="title">📚 Quiz Categories</h2>
          <p className="subtitle">Please select a category to begin.</p>
          <div className="category-grid">
            {[{ name: 'Music', icon: '🎵' }, { name: 'Movies', icon: '🎬' }, { name: 'Math', icon: '➗' }, { name: 'Science', icon: '⚛️' }, { name: 'Computer Science', icon: '💻' }, { name: 'Geography', icon: '🗺️' }, { name: 'History', icon: '📜' }, { name: 'Mythology', icon: '🏛️' }, { name: 'Sports', icon: '🏆' }, { name: 'Miscellaneous', icon: '❓' }].map(({ name, icon }) => (
              <button key={name} className="category-button" onClick={() => handleCategoryClick(name)}>
                {icon} {name}
              </button>
            ))}
          </div>
        </div>
      ) : !isQuizSetupComplete ? (
        <div className="quiz-setup">
          <h2 className="title">🛠️ Quiz Setup</h2>
          <div className="setup-form">
            <label>Number of Questions:
              <select value={questionCount} onChange={(e) => setQuestionCount(e.target.value)}>
                <option value="">Select</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
          <div className="setup-form">
            <label>Difficulty:
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
          </div>
          <button className="start-button" onClick={() => setIsQuizSetupComplete(true)}>Start Quiz</button>
        </div>
      ) : (
        <div className="quiz-in-progress">
          <h2 className="title">📝 Quiz in Progress...</h2>
          <p className="question" dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex]?.question }} />
          <div className="answer-buttons">
            {questions[currentQuestionIndex]?.shuffledAnswers.map((answer, index) => {
              const correctAnswer = questions[currentQuestionIndex].correct_answer;
              const isSelected = userAnswers[currentQuestionIndex]?.selectedAnswer === answer;
              const isCorrect = answer === correctAnswer;
              let backgroundColor = 'rgb(224, 247, 250)';
              if (userAnswers[currentQuestionIndex]) {
                if (isCorrect) backgroundColor = 'rgb(200, 230, 201)';
                else if (isSelected && !isCorrect) backgroundColor = 'rgb(255, 205, 209)';
              }
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (userAnswers[currentQuestionIndex]) return;
                    const selectedAnswer = answer;
                    const isCorrect = selectedAnswer === correctAnswer;
                    const updatedAnswers = [...userAnswers];
                    updatedAnswers[currentQuestionIndex] = { question: questions[currentQuestionIndex].question, selectedAnswer, isCorrect };
                    setUserAnswers(updatedAnswers);
                    if (isCorrect) setScore(score + 1);
                    if (currentQuestionIndex + 1 === questions.length) {
                      setTimeout(() => setQuizCompleted(true), 800);
                    } else {
                      setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 800);
                    }
                  }}
                  disabled={!!userAnswers[currentQuestionIndex]}
                  style={{ backgroundColor }}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
          {/* Correctly placed "Back" button for quiz navigation */}
          <div className="quiz-nav-buttons">
            {currentQuestionIndex > 0 && (
              <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                🔙 Back
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
