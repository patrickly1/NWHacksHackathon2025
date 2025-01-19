import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import SharkDashboard from './components/SharkDashboard';
import Messages from './components/Messages';
import PitcherDashboard from './components/PitcherDashboard';
import Navigation from './components/Navigation';
import SelectAcc from './components/SelectAcc';
import "./components/style/App.css";


function App() {
  // We’ll store the current user in App state for simplicity
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div id='app'>
      <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        {/* HomePage for signup/login */}
        <Route path="/" element={<LoginPage setCurrentUser={setCurrentUser} />} />

        {/* Shark dashboard */}
        <Route
          path="/shark"
          element={<SharkDashboard currentUser={currentUser} />}
        />

        {/* Pitcher dashboard */}
        <Route
          path="/pitcher"
          element={<PitcherDashboard currentUser={currentUser} />}
        />

        {/* Messages */}
        <Route
          path="/messages"
          element={
            currentUser ? (
              <Messages currentUser={currentUser} />
            ) : (
              <div>Please log in to view messages.</div>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;