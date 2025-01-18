import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import SharkDashboard from './components/SharkDashboard';
import PitcherDashboard from './components/PitcherDashboard';
import Navigation from './components/Navigation';

function App() {
  // We’ll store the current user in App state for simplicity
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>
      <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        {/* HomePage for signup/login */}
        <Route path="/" element={<HomePage setCurrentUser={setCurrentUser} />} />

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
      </Routes>
    </div>
  );
}

export default App;