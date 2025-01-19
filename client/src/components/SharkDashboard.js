import React, { useEffect, useState } from 'react';
import "./style/SharkDashboard.css";

const SharkDashboard = ({ currentUser }) => {
  const [pitches, setPitches] = useState([]);
  const [currentPitchIndex, setCurrentPitchIndex] = useState(0);
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/pitches');
        const data = await response.json();
        setPitches(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPitches();
  }, []);

  const handleSwipeUp = () => {
    if (currentPitchIndex < pitches.length - 1) {
      setCurrentPitchIndex((prev) => prev + 1);
      setShowCompanyInfo(false);
    } else {
      alert('You have viewed all pitches!');
    }
  };

  const handleSwipeRight = () => {
    setShowCompanyInfo((prev) => !prev);
  };

  const handleSendMessage = async (pitchId) => {
    if (!showCompanyInfo) return;

    const message = prompt('Enter your message:');
    if (message) {
      try {
        const response = await fetch('http://localhost:5002/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pitchId,
            senderId: currentUser.id, // Use "senderId" to represent both sharks and pitchers
            senderType: currentUser.type, // Include user type in the request
            message,
          }),
        });

        if (response.ok) {
          alert('Message sent!');
          setPitches((prevPitches) =>
            prevPitches.filter((pitch) => pitch.id !== pitchId)
          );
          setShowCompanyInfo(false);

          if (currentPitchIndex >= pitches.length - 1) {
            setCurrentPitchIndex(0);
          }
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (pitches.length === 0) {
    return <div>No pitches available.</div>;
  }

  const currentPitch = pitches[currentPitchIndex];

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Dashboard</h2>
      <h3>Current Pitch:</h3>

      {showCompanyInfo ? (
        <div>
          <div>
            <strong>Company Info:</strong> {currentPitch.companyInfo}
          </div>
          <button
            onClick={() => handleSendMessage(currentPitch.id)}
            style={{ margin: '0.5rem' }}
          >
            Send Message
          </button>
        </div>
      ) : (
        <div>
          <div>
            <strong>Title:</strong> {currentPitch.title}
          </div>
          <div>
            <strong>Caption:</strong> {currentPitch.caption}
          </div>
          <div>
            <strong>Video URL:</strong> {currentPitch.videoUrl}
          </div>
        </div>
      )}

      <div className="button-container">
        <button id="swipeUpBtn" onClick={handleSwipeUp} style={{ margin: '0.5rem' }}>
          Swipe Up
        </button>
        <button id="swipeRightBtn" onClick={handleSwipeRight} style={{ margin: '0.5rem' }}>
          {showCompanyInfo ? 'Back to Video' : 'Swipe Right'}
        </button>
      </div>
    </div>
  );
};

export default SharkDashboard;