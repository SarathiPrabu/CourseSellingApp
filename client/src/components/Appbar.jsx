import React from 'react';
import './Appbar.css';


function Appbar() {
  const handleSignup = () => {
    
  };

  const handleLogin = () => {
    // Add your login logic here
  };

  return (
    <div>
      <div className='app-bar-container'>
        <div className='course-appbar-title'>
          <h1>Course Management System</h1>
        </div>
        <div>
          Hello
        </div>
        <div className='buttons-container'>
          <button className='course-appbar-button' onClick={handleSignup}>Signup</button>
          <button className='course-appbar-button' onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Appbar;