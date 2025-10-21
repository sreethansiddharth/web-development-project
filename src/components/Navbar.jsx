import React, { useRef, useEffect } from 'react';

function Navbar({ 
  handleHomeClick, 
  handleCategoryClick, 
  setShowDropdown, 
  setShowProfile, 
  setShowSubjectDropdown, 
  handleLogout, 
  showDropdown, 
  showSubjectDropdown, 
  userData, 
  coins, 
  reward 
}) {
  const profileRef = useRef(null);
  const subjectRef = useRef(null);
  const subjects = [
    'Music', 'Movies', 'Math', 'Science', 'Computer Science',
    'Geography', 'History', 'Mythology', 'Sports', 'Miscellaneous'
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (subjectRef.current && !subjectRef.current.contains(event.target)) {
        setShowSubjectDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowDropdown, setShowSubjectDropdown]);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-group">
        {/* LOGO - FIXED PLACEMENT */}
        <div 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          {/* BRAND LOGO */}
          <div 
            style={{ 
              background: 'linear-gradient(135deg, #EC265F, #26ECB4)',
              color: 'white',
              padding: '10px 16px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '22px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(236, 38, 95, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={handleHomeClick}
            className="logo-brand"
            role="button"
            aria-label="Quizly Home"
            tabIndex={0}
          >
            <span>🎯</span>
            <span>Quizly</span>
          </div>

          <button className="nav-pill" onClick={handleHomeClick} aria-label="Go to home page">
            <span style={{fontSize:'28px'}}>🏠</span>
            <span>Home</span>
          </button>
        </div>
        
        <div className="dropdown-wrapper" ref={subjectRef}>
          <button className="nav-simple" onClick={() => setShowSubjectDropdown(prev => !prev)} aria-label="Browse quiz subjects">
            <span style={{fontSize:'24px'}}>📚</span>
            <span>Subjects</span>
            <span>▾</span>
          </button>
          {showSubjectDropdown && (
            <div className="dd-panel">
              <div className="dd-header">
                <span style={{fontSize:'22px'}}>📚</span>
                <span className="dd-title">Subjects</span>
              </div>
              <div className="dd-list">
                {subjects.map((subject) => (
                  <div
                    key={subject}
                    className="dd-item"
                    onClick={() => { handleCategoryClick(subject); setShowSubjectDropdown(false); }}
                    role="button"
                    aria-label={`Select ${subject} quiz category`}
                    tabIndex={0}
                  >
                    <div className="dd-icon">
                      <span>
                        {subject === 'Music' && '🎵'}
                        {subject === 'Movies' && '🎬'}
                        {subject === 'Math' && '📐'}
                        {subject === 'Science' && '🔬'}
                        {subject === 'Computer Science' && '💻'}
                        {subject === 'Geography' && '🌍'}
                        {subject === 'History' && '📚'}
                        {subject === 'Mythology' && '🏛️'}
                        {subject === 'Sports' && '⚽'}
                        {subject === 'Miscellaneous' && '🎲'}
                      </span>
                    </div>
                    <span style={{fontWeight:600}}>{subject}</span>
                    <span style={{marginLeft:'auto',color:'#22c55e'}}>→</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="nav-group" style={{justifyContent:'flex-end'}}>
        <div className="dropdown-wrapper" ref={profileRef}>
          <button className="nav-simple" onClick={() => setShowDropdown(prev => !prev)} aria-label="User profile menu">
            <span style={{fontSize:'24px'}}>👤</span>
            <span>{userData.username || 'Profile'}</span>
            <span>▾</span>
          </button>
          {showDropdown && (
            <div className="profile-panel">
              <div className="profile-head">
                <div className="profile-row">
                  <div className="profile-avatar">👤</div>
                  <div style={{flex:1,fontWeight:800,fontSize:'18px'}}>{userData.username || 'User'}</div>
                  <div>▲</div>
                </div>
                <div className="profile-email">{userData.email || 'No email'}</div>
              </div>
              <div className="profile-actions">
                <button className="action-btn" onClick={() => { setShowProfile(true); setShowDropdown(false); }}>
                  <div className="action-icon">👤</div>
                  <span style={{fontWeight:600}}>Profile</span>
                  <span style={{marginLeft:'auto',color:'#8b5cf6'}}>→</span>
                </button>
                <button className="action-btn" onClick={() => { alert(`💰 Coins: ${coins}\n${reward ? `🎁 Reward: ${reward}` : '🚫 No rewards yet'}`); setShowDropdown(false); }}>
                  <div className="action-icon">🎁</div>
                  <span style={{fontWeight:600}}>Rewards</span>
                  <span style={{marginLeft:'auto',color:'#fb923c'}}>→</span>
                </button>
                <button className="action-btn" onClick={handleLogout}>
                  <div className="action-icon">🚪</div>
                  <span style={{fontWeight:600}}>Logout</span>
                  <span style={{marginLeft:'auto',color:'#ef4444'}}>→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;