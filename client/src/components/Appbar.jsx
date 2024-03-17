import React from 'react';
import './Appbar.css';

function Appbar() {
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
          <button className='course-appbar-button'>Signup</button>
          <button className='course-appbar-button'>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Appbar;