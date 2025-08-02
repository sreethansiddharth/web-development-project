import React, { useState, useEffect } from 'react';
import './App.css'
function App() {
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
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [coins, setCoins] = useState(0);
  const [reward, setReward] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [userData, setUserData] = useState({ email: '', username: '', age: '', gender: '', mobile: '',password: '' });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleAuthSelection = (mode) => {
    setAuthMode(mode);
  };
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
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
  const handleLogout = () => {
  localStorage.removeItem('userData');
  setCoinsUpdated(false);
  window.location.reload();
};

const isValidMobile = (value) => {
  const onlyDigits = /^[0-9]{0,10}$/;  // max 10 digits, only numbers
  return onlyDigits.test(value);
};

  useEffect(() => {
  const savedUser = localStorage.getItem('userData');
  if (savedUser) {
    setUserData(JSON.parse(savedUser));
    setIsAuthenticated(true);
  }
  }, []);

  useEffect(() => {
  const savedUser = localStorage.getItem('userData');
  if (savedUser) {
    setUserData(JSON.parse(savedUser));
    setIsAuthenticated(true);
  }
}, []);
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!questionCount || isNaN(questionCount) || Number(questionCount) <= 0) {
        console.warn("Invalid question count. Skipping fetch.");
        return;
      }
      try {
        let url = '';
        if (selectedCategory === 'Music') {
          url = `https://opentdb.com/api.php?amount=${questionCount}&category=12&difficulty=${difficulty}&type=multiple`;
        }
        else if(selectedCategory === 'Math'){
          url =`https://opentdb.com/api.php?amount=${questionCount}&category=19&difficulty=${difficulty}&type=multiple`;
        }
        else if( selectedCategory === 'Movies') {
          url = `https://opentdb.com/api.php?amount=${questionCount}&category=11&difficulty=${difficulty}&type=multiple`;
        }
        else if(selectedCategory === 'Science'){
          url = `https://opentdb.com/api.php?amount=${questionCount}&category=17&difficulty=${difficulty}&type=multiple`;
        }
        else if(selectedCategory === 'Computer Science'){
          url = `https://opentdb.com/api.php?amount=${questionCount}&category=18&difficulty=${difficulty}&type=multiple`;
        }
        else if (selectedCategory === 'Geography') {
          url = `https://opentdb.com/api.php?amount=${questionCount}&category=22&difficulty=${difficulty}&type=multiple`;
        }
        else if(selectedCategory === 'History'){
          url = `https://opentdb.com/api.php?amount=${questionCount}&category=23&difficulty=${difficulty}&type=multiple`;
        }
        else if(selectedCategory === 'Mythology'){
          url = `https://opentdb.com/api.php?amount=${questionCount}&category=20&difficulty=${difficulty}&type=multiple`;
        }
        else if(selectedCategory === 'Sports'){
          url = `https://opentdb.com/api.php?amount=${questionCount}&category=21&difficulty=${difficulty}&type=multiple`;
        }
        else if (selectedCategory === 'Miscellaneous') {
          url = `https://opentdb.com/api.php?amount=${questionCount}&difficulty=${difficulty}&type=multiple`;
        }
        if (url) {
          const res = await fetch(url);
          const data = await res.json();
          const shuffledData = data.results.map((q) => {
            const answers = [...q.incorrect_answers, q.correct_answer];
            const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
            return {
              ...q,
              shuffledAnswers,
            };
          });

          setQuestions(shuffledData);
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, [isQuizSetupComplete]);
      const [coinsUpdated, setCoinsUpdated] = useState(false);
  useEffect(() => {
    if (quizCompleted && !coinsUpdated && score === parseInt(questionCount)) {
    const earnedCoins = 3;
    const updatedCoins = coins + earnedCoins;
    setCoins(updatedCoins);
    setCoinsUpdated(true); 

    if (updatedCoins >= 250) {
      setReward("🎁 Congratulations! You've earned a gift voucher!");
    } 
  }
}, [quizCompleted, score, questionCount, coinsUpdated, coins]);
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
  const NavBar = () => {
  return (
    <div className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <span onClick={handleHomeClick} style={{ cursor: 'pointer' }}>🏠 Home</span>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <span onClick={() => setShowSubjectDropdown(prev => !prev)}>📚 Subjects ▾</span>
          {showSubjectDropdown && (
            <div className="dropdown-menu" style={{ left: 0 }}>
              {[
                'Music', 'Movies', 'Math', 'Science', 'Computer Science',
                'Geography', 'History', 'Mythology', 'Sports', 'Miscellaneous'
              ].map(subject => (
                <div
                  key={subject}
                  onClick={() => {
                    handleCategoryClick(subject);
                    setShowSubjectDropdown(false);
                  }}
                  style={{ padding: '5px 10px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  className="dropdown-item"
                >
                  {subject}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        <span onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }}>
          👤 {userData.username} ▾
        </span>
        {showDropdown && (
  <div className="dropdown-menu">
    <p><strong>Email:</strong> {userData.email}</p>

    <button
      onClick={() => {
        setShowProfile(true);
        setShowDropdown(false);
      }}
      className="dropdown-button"
    >
      👤 Profile
    </button>

    <button
      onClick={() => {
        alert(`💰 Coins: ${coins}\n${reward ? `🎁 Reward: ${reward}` : "🚫 No rewards yet"}`);
        setShowDropdown(false);
      }}
      className="dropdown-button"
    >
      🎁 Rewards
    </button>

    <button
      onClick={handleLogout}
      className="dropdown-button"
    >
      🚪 Logout
    </button>
  </div>
)}

      </div>
    </div>
  );
};
      <div style={{ position: 'relative' }}>
        <span onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }}>
          👤 {userData.username} ▾
        </span>
        {showDropdown && (
          <div style={{ position: 'absolute', right: 0, backgroundColor: 'white', color: 'black', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <p><strong>Email:</strong> {userData.email}</p>
            <button onClick={() => setShowProfile(true)} style={{ display: 'block', width: '100%', marginTop: '5px' }}>Profile</button>
            <button onClick={handleLogout} style={{ display: 'block', width: '100%', marginTop: '5px' }}>Logout</button>
          </div>
        )}
      </div>
  if (showProfile) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <NavBar />
        <h2>👤 Your Profile</h2>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Age:</strong> {userData.age}</p>
        <p><strong>Gender:</strong> {userData.gender}</p>
        <p><strong>Mobile:</strong> {userData.mobile}</p>
        <p><strong>Coins:</strong> {coins}</p>
        {reward && <p style={{ color: 'green', fontWeight: 'bold' }}>{reward}</p>}
      </div>
    );
  }
  if (showProfile) {
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ ...userData });

  const handleSaveChanges = () => {
    const users = JSON.parse(localStorage.getItem('allUsers')) || {};
    users[editedUserData.email] = editedUserData;
    localStorage.setItem('allUsers', JSON.stringify(users));
    setUserData(editedUserData);
    setEditMode(false);
  };
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <NavBar />
      <h2>👤 Your Profile</h2>
      {editMode ? (
        <>
          <p>
            <strong>Username:</strong><br />
            <input
              value={editedUserData.username}
              onChange={(e) =>
                setEditedUserData({ ...editedUserData, username: e.target.value })
              }
            />
          </p>
          <p>
            <strong>Age:</strong><br />
            <input
              value={editedUserData.age}
              onChange={(e) =>
                setEditedUserData({ ...editedUserData, age: e.target.value })
              }
            />
          </p>
          <p>
            <strong>Gender:</strong><br />
            <select
              value={editedUserData.gender}
              onChange={(e) =>
                setEditedUserData({ ...editedUserData, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </p>
          <p>
            <strong>Mobile:</strong><br />
            <input
              value={editedUserData.mobile}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[0-9]{0,10}$/.test(value)) {
                  setEditedUserData({ ...editedUserData, mobile: value });
                }
              }}
            />
          </p>
          <button onClick={handleSaveChanges}>💾 Save Changes</button>
          <button onClick={() => setEditMode(false)} style={{ marginLeft: '10px' }}>
            ❌ Cancel
          </button>
        </>
      ) : (
        <>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Gender:</strong> {userData.gender}</p>
          <p><strong>Mobile:</strong> {userData.mobile}</p>
          <p><strong>Coins:</strong> {coins}</p>
          {reward && <p style={{ color: 'green', fontWeight: 'bold' }}>{reward}</p>}
          <button onClick={() => setEditMode(true)}>✏️ Edit Profile</button>
        </>
      )}
    </div>
  );
}
  if (quizCompleted) {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <NavBar />
      <h2>🎉 Quiz Completed!</h2>
      <p>Your Score: {score}/{questionCount}</p>
      <p>Coins Earned: {coins}</p>
      {reward && <p style={{ color: 'green', fontWeight: 'bold' }}>{reward}</p>}
      <div style={{ marginTop: '1.5rem' }}>
      <button
        onClick={() => {
            setQuestions([]);
            setCurrentQuestionIndex(0);
            setUserAnswers([]);
            setScore(0);
            setQuizCompleted(false);
            setCoinsUpdated(false);
            setReward(null);
            setIsQuizSetupComplete(false); // Reset first
        setTimeout(() => {
      setIsQuizSetupComplete(true); // Trigger re-fetch
    }, 0);
  }}
>
  🔄 Play Again
</button>
        <button
          onClick={() => {
            // Go back to category selection
            setQuizCompleted(false);
            setIsQuizSetupComplete(false);
            setSelectedCategory(null);
            setQuestions([]);
            setScore(0);
            setCurrentQuestionIndex(0);
            setUserAnswers([]);
            setCoinsUpdated(false);
            setReward(null);
          }}
        >
          🔙 Back
        </button>
      </div>
    </div>
  );
}
  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>🔐 Welcome to the Quizly</h2>
        <p>Select an option to continue:</p>
        <div style={{ marginTop: '1rem' }}>
          <button onClick={() => handleAuthSelection('signin')} style={{ marginRight: '1rem' }}>Sign In</button>
          <button onClick={() => handleAuthSelection('signup')}>Sign Up</button>
        </div>
{authMode === 'signin' && (
  <div className="signin-container">
    <h3>Sign In</h3>
    <input
      placeholder="Email"
      value={loginEmail}
      onChange={(e) => setLoginEmail(e.target.value)}
      className="auth-input"
    />
    <input
      placeholder="Password"
      type="password"
      value={loginPassword}
      onChange={(e) => setLoginPassword(e.target.value)}
      className="auth-input"
    />
    <button
      onClick={() => {
        const users = JSON.parse(localStorage.getItem('allUsers')) || {};
        const user = users[loginEmail];
        if (user && user.password === loginPassword) {
          setUserData(user);
          handleLogin();
        } else {
          alert("Invalid email or password. Please try again or sign up.");
        }
      }}
      className="auth-button"
    >
      Login
    </button>
  </div>
)}
        {authMode === 'signup' && (
          <div style={{ marginTop: '2rem' }}>
            <h3>Sign Up</h3>
            <input placeholder="Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} /><br />
            <input placeholder="Username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} /><br />
            <input placeholder="Age" onChange={(e) => setUserData({ ...userData, age: e.target.value })} /><br />
            <div style={{ margin: '0.5rem 0' }}>
              <label>Gender: </label>
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
              }}
              maxLength={10}
            />
<br />
            <input
                placeholder="Password"
                type="password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
/><br />
            <button onClick={() => {
  const users = JSON.parse(localStorage.getItem('allUsers')) || {};

  if (users[userData.email]) {
    alert("User already exists. Please sign in.");
    return;
  }

  users[userData.email] = { ...userData };
  localStorage.setItem('allUsers', JSON.stringify(users));

  setUserData(userData); // already updated from input
  handleLogin();
}}>Register</button>


          </div>
        )}
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      {!selectedCategory ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>📚 Quiz Categories</h2>
          <p style={{ fontSize: '14px', color: '#555' }}>
            Please select a category to begin.
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '2rem'
          }}>
            {[
              { name: 'Music', icon: '🎵' },
              { name: 'Movies', icon: '🎬' },
              { name: 'Math', icon: '➗' },
              { name: 'Science', icon: '⚛️' },
              { name: 'Computer Science', icon: '💻' },
              { name: 'Geography', icon: '🗺️' },
              { name: 'History', icon: '📜' },
              { name: 'Mythology', icon: '🏛️' },
              { name: 'Sports', icon: '🏆' },
              { name: 'Miscellaneous', icon: '❓' }
            ].map(({ name, icon }) => (
              <button
                key={name}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                  fontSize: '16px',
                  backgroundColor: '#f0f0f0'
                }}
                onClick={() => handleCategoryClick(name)}
              >
                {icon} {name}
              </button>
            ))}
          </div>
        </div>
      ) : !isQuizSetupComplete ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>🛠️ Quiz Setup</h2>
          <div style={{ marginTop: '1rem' }}>
            <label>
              Number of Questions:
              <select value={questionCount} onChange={(e) => {
                setQuestionCount(e.target.value);}}>
                <option value="">Select</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label>
              Difficulty:
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
          </div>
          <button
            onClick={() => setIsQuizSetupComplete(true)}
            style={{ marginTop: '1.5rem', padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>📝 Quiz in Progress...</h2>
          <p dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex]?.question}}/>
          <div style={{ marginTop: '1rem' }}>
          {questions[currentQuestionIndex]?.shuffledAnswers.map((answer, index) => {
  const correctAnswer = questions[currentQuestionIndex].correct_answer;
  const isSelected = userAnswers[currentQuestionIndex]?.selectedAnswer === answer;
  const isCorrect = answer === correctAnswer;
  let backgroundColor = '#e0f7fa';
  if (userAnswers[currentQuestionIndex]) {
    if (isCorrect) backgroundColor = '#1dec24ff'; // green
    else if (isSelected && !isCorrect) backgroundColor = '#e71126ff'; // red
  }
  return (
    <button
      key={index}
      onClick={() => {
        if (userAnswers[currentQuestionIndex]) return; // prevent multiple answers

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
      style={{
        display: 'block',
        margin: '10px auto',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        cursor: userAnswers[currentQuestionIndex] ? 'default' : 'pointer',
        backgroundColor,
        transition: 'background-color 0.3s ease'
      }}
      dangerouslySetInnerHTML={{ __html: answer }}
    />
  );
})}
</div>
        </div>
      )}
    </div>
  );
}
export default App;
