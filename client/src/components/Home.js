import React from "react";
import { Navigate } from "react-router-dom";

const Home = ({ currentUser }) => {
  if (!currentUser) {
    return <div>Please log in to view your home page.</div>;
  }

  if (currentUser.type === "pitcher") {
    // Redirect pitchers to their dashboard
    return <Navigate to="/pitcher" />;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Welcome, {currentUser.name}</h2>
      <h3>Your Bookmarked Pitches:</h3>
      {currentUser.bookmarkedPitches && currentUser.bookmarkedPitches.length > 0 ? (
        <ul>
          {currentUser.bookmarkedPitches.map((pitchId, index) => (
            <li key={index}>Pitch ID: {pitchId}</li>
          ))}
        </ul>
      ) : (
        <p>You have no bookmarked pitches yet.</p>
      )}
    </div>
  );
};

export default Home;