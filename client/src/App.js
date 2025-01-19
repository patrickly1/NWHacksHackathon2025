// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';

// import LoginPage from './components/LoginPage';
// import SharkDashboard from './components/SharkDashboard';
// import Messages from './components/Messages';
// import PitcherDashboard from './components/PitcherDashboard';
// import Profile from './components/Profile';
// import Home from './components/Home'; // Import Home component
// import Navigation from './components/Navigation';
// import SelectAcc from './components/SelectAcc';
// import "./components/style/App.css";

// function App() {
//   const [currentUser, setCurrentUser] = useState(null);

//   return (
//     <div id="app">
//       <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
//       <Routes>
//         {/* Home Page */}
//         <Route path="/Home" element={<Home currentUser={currentUser} />} />

//         {/* Select Account */}
//         <Route path="/" element={<SelectAcc setCurrentUser={setCurrentUser} />} />

//         {/* Login Page */}
//         <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />

//         {/* Shark Dashboard */}
//         <Route
//           path="/shark"
//           element={<SharkDashboard currentUser={currentUser} />}
//         />

//         {/* Pitcher Dashboard */}
//         <Route
//           path="/pitcher"
//           element={<PitcherDashboard currentUser={currentUser} />}
//         />

//         {/* Messages */}
//         <Route
//           path="/messages"
//           element={
//             currentUser ? (
//               <Messages currentUser={currentUser} />
//             ) : (
//               <div>Please log in to view messages.</div>
//             )
//           }
//         />

//         {/* Profile */}
//         <Route
//           path="/profile"
//           element={
//             currentUser ? (
//               <Profile currentUser={currentUser} />
//             ) : (
//               <div>Please log in to view your profile.</div>
//             )
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import SharkDashboard from './components/SharkDashboard';
import Messages from './components/Messages';
import PitcherDashboard from './components/PitcherDashboard';
import Profile from './components/Profile';
import PitcherProfile from "./components/PitcherProfile";
import Home from './components/Home';
import Navigation from './components/Navigation';
import SelectAcc from './components/SelectAcc';
import "./components/style/App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (


    <div id='app'>
      {currentUser && <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />}
      


      <Routes>
        {/* Home Page */}
        <Route path="/Home" element={<Home currentUser={currentUser} />} />

        {/* Select Account */}
        <Route path="/" element={<SelectAcc setCurrentUser={setCurrentUser} />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />

        {/* Shark Dashboard */}
        <Route
          path="/shark"
          element={
            currentUser ? (
              <SharkDashboard currentUser={currentUser} />
            ) : (
              <div>Please log in to access the dashboard.</div>
            )
          }
        />

        {/* Pitcher Dashboard */}
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

        {/* Profile */}
        <Route
          path="/profile"
          element={
            currentUser ? (
              <Profile currentUser={currentUser} />
            ) : (
              <div>Please log in to view your profile.</div>
            )
          }
        />
         {/* Add the dynamic route for PitcherProfile */}
         <Route path="/pitcher-profile/:pitcherId" element={<PitcherProfile />} />
      </Routes>
    </div>
  );
}

export default App;