import React, { useState, useEffect, useRef } from 'react';
function Profile({ userData, onBack, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [error, setError] = useState('');
  const firstInputRef = useRef(null);
  useEffect(() => {
    setEditedData(userData);
  }, [userData]);
  useEffect(() => {
    if (isEditing && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isEditing]);
  const handleSave = () => {
    if (
      !editedData.email ||
      !editedData.username ||
      !editedData.age ||
      !editedData.gender ||
      !editedData.mobile
    ) {
      setError('Please fill all fields.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('allUsers')) || {};
    if (editedData.email !== userData.email) {
      delete users[userData.email];
    }
    users[editedData.email] = { ...editedData };
    localStorage.setItem('allUsers', JSON.stringify(users));
    setIsEditing(false);
    setError('');
    if (onUpdateUser) onUpdateUser(editedData);
  };
  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
    setError('');
  };
  const isValidMobile = (value) => {
    return /^\d{10}$/.test(value);
  };
  return (
    <section
      aria-label="User Profile"
      className="quiz-container"
    >
      <div className="quiz-card">
        <h1 tabIndex={0} className="text-5xl font-bold text-gray-800 mb-10 text-center">👤 Your Profile</h1>
        
        {!isEditing ? (
          <div className="text-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-left">
              <div>
                <p1 className="font-semibold text-2xl ">📧 Email:</p1>
                <p1 className="text-gray-600 text-xl">{userData.email}</p1>
              </div>
              <div>
                <p1 className="font-semibold text-2xl">👤 Username:</p1>
                <p1 className="text-gray-600 text-xl">{userData.username}</p1>
              </div>
              <div>
                <p1 className="font-semibold text-2xl">🎂 Age:</p1>
                <p1 className="text-gray-600 text-xl">{userData.age}</p1>
              </div>
              <div>
                <p1 className="font-semibold text-2xl">⚧ Gender:</p1>
                <p1 className="text-gray-600 text-xl">{userData.gender}</p1>
              </div>
              <div>
                <p1 className="font-semibold text-2xl">📱 Mobile:</p1>
                <p1 className="text-gray-600 text-xl">{userData.mobile}</p1>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary text-2xl py-6 px-12 mr-6"
                aria-label="Edit Profile"
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={onBack}
                className="btn-secondary text-2xl py-6 px-12"
                aria-label="Back"
              >
                🔙 Back
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={e => { e.preventDefault(); handleSave(); }}
            aria-label="Edit Profile"
            className="text-left"
          >
            <fieldset className="border-none p-0">
              <legend className="sr-only">Edit Profile Fields</legend>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label htmlFor="profile-email" className="block text-gray-800 font-semibold mb-4 text-xl">📧 Email</label>
                  <input
                    id="profile-email"
                    ref={firstInputRef}
                    placeholder="Email"
                    value={editedData.email}
                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                    className="input-professional"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="profile-username" className="block text-gray-800 font-semibold mb-4 text-xl">👤 Username</label>
                  <input
                    id="profile-username"
                    placeholder="Username"
                    value={editedData.username}
                    onChange={(e) => setEditedData({ ...editedData, username: e.target.value })}
                    className="input-professional"
                    type="text"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label htmlFor="profile-age" className="block text-gray-800 font-semibold mb-4 text-xl">🎂 Age</label>
                  <input
                    id="profile-age"
                    placeholder="Age"
                    value={editedData.age}
                    onChange={(e) => setEditedData({ ...editedData, age: e.target.value })}
                    className="input-professional"
                    type="number"
                    min="1"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="profile-gender" className="block text-gray-800 font-semibold mb-4 text-xl">⚧ Gender</label>
                  <select
                    id="profile-gender"
                    value={editedData.gender}
                    onChange={(e) => setEditedData({ ...editedData, gender: e.target.value })}
                    className="input-professional"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-10">
                <label htmlFor="profile-mobile" className="block text-gray-800 font-semibold mb-4 text-xl">📱 Mobile</label>
                <input
                  id="profile-mobile"
                  placeholder="Mobile"
                  value={editedData.mobile}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isValidMobile(value)) {
                      setEditedData({ ...editedData, mobile: value });
                    }
                  }}
                  className="input-professional"
                  type="tel"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  autoComplete="tel"
                  required
                />
              </div>
            </fieldset>
            
            <div aria-live="polite" className="min-h-6 mb-8">
              {error && <p className="text-red-600 font-semibold text-xl">{error}</p>}
            </div>
            
            <div className="mt-10 text-center">
              <button
                type="submit"
                className="btn-primary text-2xl py-6 px-12 mr-6"
                aria-label="Save Profile"
              >
                💾 Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary text-2xl py-6 px-12"
                aria-label="Cancel Edit"
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
export default Profile;
