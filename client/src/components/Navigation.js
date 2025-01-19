import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <nav style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
      <Link id='HomeLink' to="/">Home</Link>
      {currentUser && currentUser.type === 'shark' && (
        <Link to="/shark" style={{ marginLeft: '1rem' }}>
          Shark Dashboard
        </Link>
      )}
      {currentUser && currentUser.type === 'pitcher' && (
        <Link to="/pitcher" style={{ marginLeft: '1rem' }}>
          Pitcher Dashboard
        </Link>
      )}
      {currentUser && (
        <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navigation;