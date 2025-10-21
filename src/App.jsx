// import React, { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import Auth from './components/Auth';
// import QuizSetup from './components/QuizSetup';
// import QuizResult from './components/QuizResult';
// import Profile from './components/Profile';
// import Quiz from './components/Quiz';
// function App() {
//   const [authMode, setAuthMode] = useState(null);
//   const [score, setScore] = useState(0);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentPage, setCurrentPage] = useState("auth");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [questionCount, setQuestionCount] = useState(10);
//   const [difficulty, setDifficulty] = useState('easy');
//   const [isQuizSetupComplete, setIsQuizSetupComplete] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [coins, setCoins] = useState(0);
//   const [reward, setReward] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
//   const [userData, setUserData] = useState({ 
//     email: '', 
//     username: '', 
//     age: '', 
//     gender: '', 
//     mobile: '', 
//     password: '' 
//   });
//   const [loginEmail, setLoginEmail] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');
//   const [coinsUpdated, setCoinsUpdated] = useState(false);
//   const handleAuthSelection = (mode) => {
//     setAuthMode(mode);
//   };
//   const handleLogin = () => {
//     setIsAuthenticated(true);
//     setCurrentPage('home');
//   };
//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setIsQuizSetupComplete(false);
//     setCurrentQuestionIndex(0);
//     setQuestions([]);
//     setQuizCompleted(false);
//     setScore(0);
//     setUserAnswers([]);
//     setReward(null);
//     setCoinsUpdated(false);
//     setCurrentPage('quiz-setup');
//   };
//   const handleLogout = () => {
//     localStorage.removeItem('userData');
//     localStorage.removeItem('allUsers');
//     setIsAuthenticated(false);
//     setCurrentPage('auth');
//     setSelectedCategory(null);
//     setIsQuizSetupComplete(false);
//     setQuestions([]);
//     setUserAnswers([]);
//     setScore(0);
//     setCoins(0);
//     setReward(null);
//     setShowDropdown(false);
//     setShowSubjectDropdown(false);
//     setCoinsUpdated(false);
//     setUserData({ 
//       email: '', 
//       username: '', 
//       age: '', 
//       gender: '', 
//       mobile: '', 
//       password: '' 
//     });
//     setLoginEmail('');
//     setLoginPassword('');
//     setAuthMode(null);
//   };
//   const handleHomeClick = () => {
//     setSelectedCategory(null);
//     setIsQuizSetupComplete(false);
//     setCurrentQuestionIndex(0);
//     setQuestions([]);
//     setQuizCompleted(false);
//     setScore(0);
//     setUserAnswers([]);
//     setReward(null);
//     setCoinsUpdated(false);
//     setCurrentPage('home');
//   };
//   const handleQuizSetup = (setupData) => {
//     setQuestionCount(setupData.numQuestions);
//     setDifficulty(setupData.difficulty);
//     setIsQuizSetupComplete(true);
//     setCurrentPage('quiz');
//   };
//   const isValidMobile = (value) => {
//     const onlyDigits = /^[0-9]{0,10}$/;
//     return onlyDigits.test(value);
//   };
//   useEffect(() => {
//     const savedUser = localStorage.getItem('userData');
//     if (savedUser) {
//       const user = JSON.parse(savedUser);
//       setUserData(user);
//       setIsAuthenticated(true);
//       setCurrentPage('home');
//     }
//   }, []);
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       if (!selectedCategory || !isQuizSetupComplete) {
//         return;
//       }
//       try {
//         let url = '';
//         if (selectedCategory === 'Music') {
//           url = `https://opentdb.com/api.php?amount=${questionCount}&category=12&difficulty=${difficulty}&type=multiple`;
//         } else if (selectedCategory === 'Math') {
//           url = `https://opentdb.com/api.php?amount=${questionCount}&category=19&difficulty=${difficulty}&type=multiple`;
//         } else if (selectedCategory === 'Movies') {
//           url = `https://opentdb.com/api.php?amount=${questionCount}&category=11&difficulty=${difficulty}&type=multiple`;
//         } else if (selectedCategory === 'Science') {
//           url = `https://opentdb.com/api.php?amount=${questionCount}&category=17&difficulty=${difficulty}&type=multiple`;
//         } else if (selectedCategory === 'Computer Science') {
//           url = `https://opentdb.com/api.php?amount=${questionCount}&category=18&difficulty=${difficulty}&type=multiple`;
//         } else if (selectedCategory === 'Geography') {
//           url = `https://opentdb.com/api.php?amount=${questionCount}&category=22&difficulty=${difficulty}&type=multiple`;
//         } else if (selectedCategory === 'History') {
//           url = `https://opentdb.com/api.php?amount=${questionCount}&category=23&difficulty=${difficulty}&type=multiple`;
//         } else if (selectedCategory === 'Mythology') {
//           url = `https://opentdb.com/api.php?amount=${questionCount}&category=20&difficulty=${difficulty}&type=multiple`;
//         } else if (selectedCategory === 'Sports') {
//           url = `https://opentdb.com/api.php?amount=${questionCount}&category=21&difficulty=${difficulty}&type=multiple`;
//         } else if (selectedCategory === 'Miscellaneous') {
//           url = `https://opentdb.com/api.php?amount=${questionCount}&difficulty=${difficulty}&type=multiple`;
//         }
//         if (url) {
//           const res = await fetch(url);
//           const data = await res.json();
          
//           if (data.results && data.results.length > 0) {
//             const shuffledData = data.results.map((q) => {
//               const answers = [...q.incorrect_answers, q.correct_answer];
//               const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
//               return {
//                 ...q,
//                 shuffledAnswers,
//               };
//             });
//             setQuestions(shuffledData);
//           } else {
//             console.error("No questions received from API");
//             setQuestions([]);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching questions:", err);
//         setQuestions([]);
//       }
//     };
//     fetchQuestions();
//   }, [isQuizSetupComplete, selectedCategory, questionCount, difficulty]);
//   useEffect(() => {
//     if (quizCompleted && !coinsUpdated && score === parseInt(questionCount)) {
//       const earnedCoins = 3;
//       const updatedCoins = coins + earnedCoins;
//       setCoins(updatedCoins);
//       setCoinsUpdated(true);
//       if (updatedCoins >= 250) {
//         setReward("🎁 Congratulations! You've earned a gift voucher!");
//       }
//     }
//   }, [quizCompleted, score, questionCount, coinsUpdated, coins]);
//   if (currentPage === "auth") {
//     return (
//       <div className="quiz-container" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',padding:'1rem'}}>
//         <Auth
//           authMode={authMode}
//           setAuthMode={setAuthMode}
//           loginEmail={loginEmail}
//           setLoginEmail={setLoginEmail}
//           loginPassword={loginPassword}
//           setLoginPassword={setLoginPassword}
//           userData={userData}
//           setUserData={setUserData}
//           handleLogin={handleLogin}
//           isValidMobile={isValidMobile}
//         />
//       </div>
//     );
//   }
//   if (currentPage === "profile") {
//     return (
//       <div className="quiz-container" style={{padding:'1rem', paddingTop:'120px'}}>
//         <Navbar
//           handleHomeClick={handleHomeClick}
//           handleCategoryClick={handleCategoryClick}
//           setShowDropdown={setShowDropdown}
//           setShowProfile={(flag) => setCurrentPage(flag ? 'profile' : 'home')}
//           setShowSubjectDropdown={setShowSubjectDropdown}
//           handleLogout={handleLogout}
//           showDropdown={showDropdown}
//           showSubjectDropdown={showSubjectDropdown}
//           userData={userData}
//           coins={coins}
//           reward={reward}
//         />
//         <Profile
//           userData={userData}
//           coins={coins}
//           reward={reward}
//           onBack={() => setCurrentPage('home')}
//           onUpdateUser={(updatedData) => setUserData(updatedData)}
//         />
//       </div>
//     );
//   }
//   if (currentPage === "quiz-setup") {
//     return (
//       <div className="quiz-container" style={{padding:'1rem', paddingTop:'120px'}}>
//         <Navbar
//           handleHomeClick={handleHomeClick}
//           handleCategoryClick={handleCategoryClick}
//           setShowDropdown={setShowDropdown}
//           setShowProfile={(flag) => setCurrentPage(flag ? 'profile' : 'home')}
//           setShowSubjectDropdown={setShowSubjectDropdown}
//           handleLogout={handleLogout}
//           showDropdown={showDropdown}
//           showSubjectDropdown={showSubjectDropdown}
//           userData={userData}
//           coins={coins}
//           reward={reward}
//         />
//         <div className="text-center mb-8" style={{marginTop:'12px', maxWidth:'300px',margin:'0 auto',lineHeight:1.6,color:'white'}}>
//           <h1 className="text-4xl font-bold text-white mb-4">
//             📚 {selectedCategory} Quiz
//           </h1>
//           <p className="text-xl text-gray-100 mb-4 "style={{maxWidth:'400px',margin:'0 auto',lineHeight:1.6, color:'white'}}>
//             Set up your quiz preferences and get ready to test your knowledge!
//           </p>
//         </div>
//         <QuizSetup onStartQuiz={handleQuizSetup} />
//       </div>
//     );
//   }
//   if (currentPage === "quiz") {
//     if (quizCompleted) {
//       return (
//         <div className="quiz-container" style={{padding:'1rem', paddingTop:'120px'}}>
//           <Navbar
//             handleHomeClick={handleHomeClick}
//             handleCategoryClick={handleCategoryClick}
//             setShowDropdown={setShowDropdown}
//             setShowProfile={(flag) => setCurrentPage(flag ? 'profile' : 'home')}
//             setShowSubjectDropdown={setShowSubjectDropdown}
//             handleLogout={handleLogout}
//             showDropdown={showDropdown}
//             showSubjectDropdown={showSubjectDropdown}
//             userData={userData}
//             coins={coins}
//             reward={reward}
//           />
//           {/* <QuizResult
//             score={score}
//             questionCount={questionCount}
//             coins={score === parseInt(questionCount) ? 3 : 0}
//             reward={reward}
//             onPlayAgain={() => {
//               setQuestions([]);
//               setCurrentQuestionIndex(0);
//               setUserAnswers([]);
//               setScore(0);
//               setQuizCompleted(false);
//               setReward(null);
//               setIsQuizSetupComplete(false);
//               setCoinsUpdated(false);
//               setCurrentPage('quiz-setup');
//             }}
//             onBack={handleHomeClick}
//           /> */}
//           <QuizResult
//   questions={questions}           // ADD THIS
//   userAnswers={userAnswers}       // ADD THIS
//   score={score}
//   questionCount={questionCount}
//   coins={score === parseInt(questionCount) ? 3 : 0}
//   reward={reward}
//   onPlayAgain={() => {
//     setQuestions([]);
//     setCurrentQuestionIndex(0);
//     setUserAnswers([]);
//     setScore(0);
//     setQuizCompleted(false);
//     setReward(null);
//     setIsQuizSetupComplete(false);
//     setCoinsUpdated(false);
//     setCurrentPage('quiz-setup');
//   }}
//   onBack={handleHomeClick}
// />
//         </div>
//       );
//     }
//     return (
//       <div className="quiz-container" style={{padding:'1rem', paddingTop:'120px'}}>
//         <Navbar
//           handleHomeClick={handleHomeClick}
//           handleCategoryClick={handleCategoryClick}
//           setShowDropdown={setShowDropdown}
//           setShowProfile={(flag) => setCurrentPage(flag ? 'profile' : 'home')}
//           setShowSubjectDropdown={setShowSubjectDropdown}
//           handleLogout={handleLogout}
//           showDropdown={showDropdown}
//           showSubjectDropdown={showSubjectDropdown}
//           userData={userData}
//           coins={coins}
//           reward={reward}
//         />
//         <Quiz
//           questions={questions}
//           currentQuestionIndex={currentQuestionIndex}
//           setCurrentQuestionIndex={setCurrentQuestionIndex}
//           userAnswers={userAnswers}
//           setUserAnswers={setUserAnswers}
//           score={score}
//           setScore={setScore}
//           setQuizCompleted={setQuizCompleted}
//         />
//       </div>
//     );
//   }
//   return (
//     <div className="quiz-container" style={{padding:'1rem', paddingTop:'120px'}}>
//       <Navbar
//         handleHomeClick={handleHomeClick}
//         handleCategoryClick={handleCategoryClick}
//         setShowDropdown={setShowDropdown}
//         setShowProfile={(flag) => setCurrentPage(flag ? 'profile' : 'home')}
//         setShowSubjectDropdown={setShowSubjectDropdown}
//         handleLogout={handleLogout}
//         showDropdown={showDropdown}
//         showSubjectDropdown={showSubjectDropdown}
//         userData={userData}
//         coins={coins}
//         reward={reward}
//       />
//       <div className="text-center mb-12" style={{marginTop:'12px'}}>
//         <h1 className="text-6xl font-bold text-white mb-6" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'16px',color:'white'}}>
//           <span style={{fontSize:'32px'}} className="animate-float">📚</span>
//           Quiz Categories
//         </h1>
//         <p className="text-xl text-gray-100 mb-8 " style={{maxWidth:'450px',margin:'0 auto',lineHeight:1.6,color:'white'}}>
//           Please select a category to begin your knowledge journey!
//         </p>
//       </div>
//       <div className="category-grid">
//         {[
//           { name: 'Music', icon: '🎵', description: 'Melodies & Harmonies' },
//           { name: 'Movies', icon: '🎬', description: 'Cinema & Entertainment' },
//           { name: 'Math', icon: '📐', description: 'Numbers & Logic' },
//           { name: 'Science', icon: '🔬', description: 'Discovery & Innovation' },
//           { name: 'Computer Science', icon: '💻', description: 'Technology & Code' },
//           { name: 'Geography', icon: '🌍', description: 'World & Places' },
//           { name: 'History', icon: '📚', description: 'Past & Stories' },
//           { name: 'Mythology', icon: '🏛️', description: 'Legends & Myths' },
//           { name: 'Sports', icon: '⚽', description: 'Games & Athletics' },
//           { name: 'Miscellaneous', icon: '🎲', description: 'Random & Fun' }
//         ].map((category, index) => (
//           <button
//             key={category.name}
//             onClick={() => handleCategoryClick(category.name)}
//             className="category-card animate-fade-in-up"
//             style={{animationDelay: `${index * 0.1}s`}}
//           >
//             <div className="category-icon animate-float">
//               {category.icon}
//             </div>
//             <h3 className="category-title">
//               {category.name}
//             </h3>
//             <p className="text-gray-600 text-sm">
//               {category.description}
//             </p>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
// export default App;




import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import QuizSetup from './components/QuizSetup';
import QuizResult from './components/QuizResult';
import Profile from './components/Profile';
import Quiz from './components/Quiz';

function App() {
  const [authMode, setAuthMode] = useState('signin');
  const [score, setScore] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("auth");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState('easy');
  const [isQuizSetupComplete, setIsQuizSetupComplete] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [coins, setCoins] = useState(0);
  const [reward, setReward] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [userData, setUserData] = useState({ 
    email: '', 
    username: '', 
    age: '', 
    gender: '', 
    mobile: '', 
    password: '' 
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [coinsUpdated, setCoinsUpdated] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Debug current state
  useEffect(() => {
    console.log('Current Page:', currentPage);
    console.log('Questions loaded:', questions.length);
    console.log('Quiz Setup Complete:', isQuizSetupComplete);
    console.log('Selected Category:', selectedCategory);
  }, [currentPage, questions, isQuizSetupComplete, selectedCategory]);

  const handleAuthSelection = (mode) => {
    setAuthMode(mode);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleCategoryClick = (category) => {
    console.log('Category selected:', category);
    setSelectedCategory(category);
    setIsQuizSetupComplete(false);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setQuizCompleted(false);
    setScore(0);
    setUserAnswers([]);
    setReward(null);
    setCoinsUpdated(false);
    setCurrentPage('quiz-setup');
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('allUsers');
    setIsAuthenticated(false);
    setCurrentPage('auth');
    setSelectedCategory(null);
    setIsQuizSetupComplete(false);
    setQuestions([]);
    setUserAnswers([]);
    setScore(0);
    setCoins(0);
    setReward(null);
    setShowDropdown(false);
    setShowSubjectDropdown(false);
    setCoinsUpdated(false);
    setUserData({ 
      email: '', 
      username: '', 
      age: '', 
      gender: '', 
      mobile: '', 
      password: '' 
    });
    setLoginEmail('');
    setLoginPassword('');
    setAuthMode('signin');
  };

  const handleHomeClick = () => {
    setSelectedCategory(null);
    setIsQuizSetupComplete(false);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setQuizCompleted(false);
    setScore(0);
    setUserAnswers([]);
    setReward(null);
    setCoinsUpdated(false);
    setCurrentPage('home');
  };

  const handleQuizSetup = (setupData) => {
    console.log('Quiz setup completed:', setupData);
    setQuestionCount(setupData.numQuestions);
    setDifficulty(setupData.difficulty);
    setIsQuizSetupComplete(true);
    setCurrentPage('quiz');
  };

  const isValidMobile = (value) => {
    const onlyDigits = /^[0-9]{0,10}$/;
    return onlyDigits.test(value);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData(user);
      setIsAuthenticated(true);
      setCurrentPage('home');
    }
  }, []);

  // FIXED: Question fetching with better error handling
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedCategory || !isQuizSetupComplete) {
        console.log('Skipping fetch - missing category or setup not complete');
        return;
      }

      console.log('Starting to fetch questions...');
      setLoadingQuestions(true);

      try {
        // Map categories to OpenTDB category IDs
        const categoryMap = {
          'Music': 12,
          'Movies': 11,
          'Math': 19,
          'Science': 17,
          'Computer Science': 18,
          'Geography': 22,
          'History': 23,
          'Mythology': 20,
          'Sports': 21,
          'Miscellaneous': 9
        };

        const categoryId = categoryMap[selectedCategory] || 9;
        const url = `https://opentdb.com/api.php?amount=${questionCount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
        
        console.log('Fetching from URL:', url);

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);

        if (data.response_code === 0 && data.results && data.results.length > 0) {
          console.log(`Successfully fetched ${data.results.length} questions`);
          
          const shuffledData = data.results.map((q) => {
            const answers = [...q.incorrect_answers, q.correct_answer];
            // Proper shuffle
            const shuffledAnswers = answers
              .map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value);
            
            // Add explanation
            const explanation = `The correct answer is "${q.correct_answer}".`;
            
            return {
              ...q,
              shuffledAnswers,
              explanation
            };
          });
          
          setQuestions(shuffledData);
        } else {
          console.error('No questions received from API. Response code:', data.response_code);
          // Use fallback questions
          useFallbackQuestions();
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Use fallback questions
        useFallbackQuestions();
      } finally {
        setLoadingQuestions(false);
      }
    };

    // Fallback function for when API fails
    const useFallbackQuestions = () => {
      console.log('Using fallback questions');
      const fallbackQuestions = [
        {
          question: `What is the capital of France?`,
          correct_answer: "Paris",
          incorrect_answers: ["London", "Berlin", "Madrid"],
          explanation: "Paris has been the capital of France since the 12th century.",
          shuffledAnswers: ["Paris", "London", "Berlin", "Madrid"].sort(() => Math.random() - 0.5)
        },
        {
          question: `Which planet is known as the Red Planet?`,
          correct_answer: "Mars",
          incorrect_answers: ["Venus", "Jupiter", "Saturn"],
          explanation: "Mars appears red due to iron oxide on its surface.",
          shuffledAnswers: ["Mars", "Venus", "Jupiter", "Saturn"].sort(() => Math.random() - 0.5)
        },
        {
          question: `What is 2 + 2?`,
          correct_answer: "4",
          incorrect_answers: ["3", "5", "6"],
          explanation: "Basic arithmetic: 2 + 2 = 4",
          shuffledAnswers: ["4", "3", "5", "6"].sort(() => Math.random() - 0.5)
        }
      ];
      setQuestions(fallbackQuestions.slice(0, questionCount));
    };

    fetchQuestions();
  }, [isQuizSetupComplete, selectedCategory, questionCount, difficulty]);

  useEffect(() => {
    if (quizCompleted && !coinsUpdated) {
      const earnedCoins = score > 0 ? score : 0;
      const updatedCoins = coins + earnedCoins;
      setCoins(updatedCoins);
      setCoinsUpdated(true);
      if (updatedCoins >= 10) {
        setReward("🎉 Congratulations! You've earned a reward!");
      }
    }
  }, [quizCompleted, score, coinsUpdated, coins]);

  // AUTH PAGE
  if (currentPage === "auth") {
    return (
      <div className="quiz-container" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',padding:'1rem'}}>
        <Auth
          authMode={authMode}
          setAuthMode={setAuthMode}
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          userData={userData}
          setUserData={setUserData}
          handleLogin={handleLogin}
          isValidMobile={isValidMobile}
        />
      </div>
    );
  }

  // PROFILE PAGE
  if (currentPage === "profile") {
    return (
      <div className="quiz-container" style={{padding:'1rem', paddingTop:'120px'}}>
        <Navbar
          handleHomeClick={handleHomeClick}
          handleCategoryClick={handleCategoryClick}
          setShowDropdown={setShowDropdown}
          setShowProfile={(flag) => setCurrentPage(flag ? 'profile' : 'home')}
          setShowSubjectDropdown={setShowSubjectDropdown}
          handleLogout={handleLogout}
          showDropdown={showDropdown}
          showSubjectDropdown={showSubjectDropdown}
          userData={userData}
          coins={coins}
          reward={reward}
        />
        <Profile
          userData={userData}
          coins={coins}
          reward={reward}
          onBack={() => setCurrentPage('home')}
          onUpdateUser={(updatedData) => setUserData(updatedData)}
        />
      </div>
    );
  }

  // QUIZ SETUP PAGE
  if (currentPage === "quiz-setup") {
    return (
      <div className="quiz-container" style={{padding:'1rem', paddingTop:'120px'}}>
        <Navbar
          handleHomeClick={handleHomeClick}
          handleCategoryClick={handleCategoryClick}
          setShowDropdown={setShowDropdown}
          setShowProfile={(flag) => setCurrentPage(flag ? 'profile' : 'home')}
          setShowSubjectDropdown={setShowSubjectDropdown}
          handleLogout={handleLogout}
          showDropdown={showDropdown}
          showSubjectDropdown={showSubjectDropdown}
          userData={userData}
          coins={coins}
          reward={reward}
        />
        <div className="text-center mb-8" style={{marginTop:'12px'}}>
          <h2 className="text-4xl font-bold text-white mb-4">
            📚 {selectedCategory} Quiz
          </h2>
          <p className="text-xl text-gray-100">
            Set up your quiz preferences and get ready to test your knowledge!
          </p>
        </div>
        <QuizSetup onStartQuiz={handleQuizSetup} />
      </div>
    );
  }

  // QUIZ PAGE
  if (currentPage === "quiz") {
    // Show loading while fetching questions
    if (loadingQuestions || questions.length === 0) {
      return (
        <div className="quiz-container" style={{padding:'1rem', paddingTop:'120px'}}>
          <Navbar
            handleHomeClick={handleHomeClick}
            handleCategoryClick={handleCategoryClick}
            setShowDropdown={setShowDropdown}
            setShowProfile={(flag) => setCurrentPage(flag ? 'profile' : 'home')}
            setShowSubjectDropdown={setShowSubjectDropdown}
            handleLogout={handleLogout}
            showDropdown={showDropdown}
            showSubjectDropdown={showSubjectDropdown}
            userData={userData}
            coins={coins}
            reward={reward}
          />
          {/* <div className="quiz-card text-center">
            <div className="text-6xl mb-4">🤔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading Questions...</h2>
            <p className="text-gray-600">Please wait while we prepare your {selectedCategory} quiz</p>
            <div className="loading-spinner mt-6"></div>
          </div> */}

          <div className="quiz-card text-center">
  {/* LOADING MASCOT */}
  <div 
    style={{ 
      background: 'linear-gradient(135deg, #EC265F, #26ECB4)',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
      fontSize: '40px',
      boxShadow: '0 6px 20px rgba(236, 38, 95, 0.3)'
    }}
    className="animate-pulse-slow"
    role="img"
    aria-label="Loading questions"
  >
    🤔
  </div>
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading Questions...</h2>
  <p className="text-gray-600 mb-4">Please wait while we prepare your {selectedCategory} quiz</p>
  <div className="loading-spinner mt-4"></div>
</div>

        </div>
      );
    }

    if (quizCompleted) {
      return (
        <div className="quiz-container" style={{padding:'1rem', paddingTop:'120px'}}>
          <Navbar
            handleHomeClick={handleHomeClick}
            handleCategoryClick={handleCategoryClick}
            setShowDropdown={setShowDropdown}
            setShowProfile={(flag) => setCurrentPage(flag ? 'profile' : 'home')}
            setShowSubjectDropdown={setShowSubjectDropdown}
            handleLogout={handleLogout}
            showDropdown={showDropdown}
            showSubjectDropdown={showSubjectDropdown}
            userData={userData}
            coins={coins}
            reward={reward}
          />
          <QuizResult
            questions={questions}
            userAnswers={userAnswers}
            score={score}
            questionCount={questionCount}
            coins={coins}
            reward={reward}
            onPlayAgain={() => {
              setQuestions([]);
              setCurrentQuestionIndex(0);
              setUserAnswers([]);
              setScore(0);
              setQuizCompleted(false);
              setReward(null);
              setIsQuizSetupComplete(false);
              setCoinsUpdated(false);
              setCurrentPage('quiz-setup');
            }}
            onBack={handleHomeClick}
          />
        </div>
      );
    }

    return (
      <div className="quiz-container" style={{padding:'1rem', paddingTop:'120px'}}>
        <Navbar
          handleHomeClick={handleHomeClick}
          handleCategoryClick={handleCategoryClick}
          setShowDropdown={setShowDropdown}
          setShowProfile={(flag) => setCurrentPage(flag ? 'profile' : 'home')}
          setShowSubjectDropdown={setShowSubjectDropdown}
          handleLogout={handleLogout}
          showDropdown={showDropdown}
          showSubjectDropdown={showSubjectDropdown}
          userData={userData}
          coins={coins}
          reward={reward}
        />
        <Quiz
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          score={score}
          setScore={setScore}
          setQuizCompleted={setQuizCompleted}
        />
      </div>
    );
  }

  // HOME PAGE (default)
  return (
    <div className="quiz-container" style={{padding:'1rem', paddingTop:'120px'}}>
      <Navbar
        handleHomeClick={handleHomeClick}
        handleCategoryClick={handleCategoryClick}
        setShowDropdown={setShowDropdown}
        setShowProfile={(flag) => setCurrentPage(flag ? 'profile' : 'home')}
        setShowSubjectDropdown={setShowSubjectDropdown}
        handleLogout={handleLogout}
        showDropdown={showDropdown}
        showSubjectDropdown={showSubjectDropdown}
        userData={userData}
        coins={coins}
        reward={reward}
      />
      <div className="text-center mb-12" style={{marginTop:'12px'}}>
        <h2 className="text-6xl font-bold text-white mb-6">
          📚 Quiz Categories
        </h2>
        <p className="text-xl text-gray-100 mb-8" style={{maxWidth:'640px',margin:'0 auto',lineHeight:1.6}}>
          Select a category to begin your knowledge journey!
        </p>
      </div>
      <div className="category-grid">
        {[
          { name: 'Music', icon: '🎵', description: 'Melodies & Harmonies' },
          { name: 'Movies', icon: '🎬', description: 'Cinema & Entertainment' },
          { name: 'Math', icon: '📐', description: 'Numbers & Logic' },
          { name: 'Science', icon: '🔬', description: 'Discovery & Innovation' },
          { name: 'Computer Science', icon: '💻', description: 'Technology & Code' },
          { name: 'Geography', icon: '🌍', description: 'World & Places' },
          { name: 'History', icon: '📚', description: 'Past & Stories' },
          { name: 'Mythology', icon: '🏛️', description: 'Legends & Myths' },
          { name: 'Sports', icon: '⚽', description: 'Games & Athletics' },
          { name: 'Miscellaneous', icon: '🎲', description: 'Random & Fun' }
        ].map((category, index) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className="category-card"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="category-icon">
              {category.icon}
            </div>
            <h3 className="category-title">
              {category.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {category.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;