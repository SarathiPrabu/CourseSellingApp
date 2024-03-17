// App.jsx
import React from 'react';
import Appbar from './components/Appbar';
import SideBar from './components/Sidebar';
import MainScreen from './components/MainScreen';
import './App.css'; // Ensure this imports your CSS

function App() {
  return (
    <div className="app-container">
      <div className="appbar-container">
        <Appbar />
      </div>
      <div className="content-container">
        <div className="sidebar-container">
          <SideBar />
        </div>
        <div className="main-container">
          <MainScreen />
        </div>
      </div>
    </div>
  );
}

export default App;
