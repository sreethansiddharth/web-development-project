import React, { useState } from 'react';
const Auth = ({
  authMode,
  setAuthMode,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  userData,
  setUserData,
  handleLogin,
  isValidMobile
}) => {
  const [errors, setErrors] = useState({});
  
  const validateEmail = (email) => {
    return email.endsWith('@gmail.com');
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (authMode === 'signin') {
      if (!loginEmail) newErrors.email = 'Email is required';
      else if (!validateEmail(loginEmail)) newErrors.email = 'Only Gmail addresses are allowed (@gmail.com)';
      if (!loginPassword) newErrors.password = 'Password is required';
    } else {
      if (!userData.email) newErrors.email = 'Email is required';
      else if (!validateEmail(userData.email)) newErrors.email = 'Only Gmail addresses are allowed (@gmail.com)';
      if (!userData.username) newErrors.username = 'Username is required';
      if (!userData.age) newErrors.age = 'Age is required';
      if (!userData.gender) newErrors.gender = 'Gender is required';
      if (!userData.mobile) newErrors.mobile = 'Mobile number is required';
      if (!userData.password) newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (!validateForm()) return;
    const users = JSON.parse(localStorage.getItem('allUsers')) || {};
    const user = users[loginEmail];
    if (user && user.password === loginPassword) {
      setUserData(user);
      handleLogin();
    } else {
      alert("Invalid email or password. Please try again or sign up.");
    }
  };

  const handleSignUp = () => {
    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem('allUsers')) || {};
    if (users[userData.email]) {
      alert("User already exists. Please sign in.");
      return;
    }
    users[userData.email] = { ...userData };
    localStorage.setItem('allUsers', JSON.stringify(users));
    setUserData(userData);
    handleLogin();
  };

  const clearErrors = () => {
    setErrors({});
  };

  return (
    <div className="quiz-card max-w-lg mx-auto" role="main" aria-label="Authentication">
      {/* AUTH LOGO */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #EC265F, #26ECB4)',
          color: 'white',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          fontWeight: 'bold',
          fontSize: '16px',
          textAlign: 'center',
          boxShadow: '0 8px 25px rgba(236, 38, 95, 0.4)'
        }}
        className="animate-float"
        role="img"
        aria-label="KonnichiWow Logo"
      >
        KonnichiWow
      </div>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-3 text-center">
        Welcome to <span style={{ background: 'linear-gradient(135deg, #EC265F, #26ECB4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>KonnichiWow</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">Select an option to continue:</p>      
      
      {/* Auth mode toggle */}
      <div style={{display:'flex', gap:'16px', justifyContent:'center', marginBottom:'24px'}}>
        <button 
          onClick={() => { setAuthMode('signin'); clearErrors(); }} 
          className={authMode === 'signin' ? 'btn-primary' : 'auth-button'}
          style={{minWidth:'140px'}}
          aria-label="Sign in to your account"
        >
          Sign In
        </button>
        <button 
          onClick={() => { setAuthMode('signup'); clearErrors(); }} 
          className={authMode === 'signup' ? 'btn-primary' : 'auth-button'}
          style={{minWidth:'140px'}}
          aria-label="Create new account"
        >
          Sign Up
        </button>
      </div>
      
      {authMode === 'signin' && (
        <div className="animate-fade-in-up">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h3>
          <div className="space-y-4">
            <div>
              <input
                placeholder="Email (Gmail only)"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className={`input-professional ${errors.email ? 'border-red-500' : ''}`}
                aria-label="Email address"
                aria-required="true"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className={`input-professional ${errors.password ? 'border-red-500' : ''}`}
                aria-label="Password"
                aria-required="true"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <button 
              onClick={handleSignIn} 
              className="btn-primary w-full text-lg py-4"
              aria-label="Sign in to your account"
            >
              Login
            </button>
          </div>
        </div>
      )}
      
      {authMode === 'signup' && (
        <div className="animate-fade-in-up">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h3>
          <div className="space-y-4">
            <div>
              <input 
                placeholder="Email (Gmail only)" 
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className={`input-professional ${errors.email ? 'border-red-500' : ''}`}
                aria-label="Email address"
                aria-required="true"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>            
            <div>
              <input 
                placeholder="Username" 
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                className={`input-professional ${errors.username ? 'border-red-500' : ''}`}
                aria-label="Username"
                aria-required="true"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>            
            <div>
              <input 
                placeholder="Age" 
                value={userData.age}
                onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                className={`input-professional ${errors.age ? 'border-red-500' : ''}`}
                aria-label="Age"
                aria-required="true"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>            
            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-left">Gender</label>
              <select
                value={userData.gender}
                onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                className={`input-professional ${errors.gender ? 'border-red-500' : ''}`}
                aria-label="Gender"
                aria-required="true"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>            
            <div>
              <input
                placeholder="Mobile Number"
                value={userData.mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isValidMobile(value)) {
                    setUserData({ ...userData, mobile: value });
                  }
                }}
                maxLength={10}
                className={`input-professional ${errors.mobile ? 'border-red-500' : ''}`}
                aria-label="Mobile number"
                aria-required="true"
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
            </div>            
            <div>
              <input
                placeholder="Password"
                type="password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                className={`input-professional ${errors.password ? 'border-red-500' : ''}`}
                aria-label="Password"
                aria-required="true"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            
            <button 
              onClick={handleSignUp} 
              className="btn-primary w-full text-lg py-4"
              aria-label="Create new account"
            >
              Create Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
