import React, { useEffect, useState } from 'react';

const SharkDashboard = ({ currentUser }) => {
  const [pitches, setPitches] = useState([]);
  const [currentPitchIndex, setCurrentPitchIndex] = useState(0);

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

  if (!currentUser || currentUser.type !== 'shark') {
    return <div>Please log in as a shark.</div>;
  }

  const handleSwipeLeft = () => {
    // Skip the current pitch if not interested
    if (currentPitchIndex < pitches.length - 1) {
      setCurrentPitchIndex((prev) => prev + 1);
    } else {
      alert('You have viewed all pitches!');
    }
  };
  
  const handleSwipeRight = () => {
    // Show the next pitch if interested
    if (currentPitchIndex < pitches.length - 1) {
      setCurrentPitchIndex((prev) => prev + 1);
    } else {
      alert('You have viewed all pitches!');
    }
  };

  const handleBookmark = async (pitchId) => {
    try {
      const response = await fetch('http://localhost:5002/api/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sharkId: currentUser.id, pitchId }),
      });
      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        alert('Pitch bookmarked!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMessage = async (pitchId) => {
    const message = prompt('Enter your message to the pitcher:');
    if (message) {
      try {
        const response = await fetch('http://localhost:5002/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pitchId, sharkId: currentUser.id, message }),
        });
        if (!response.ok) {
          const data = await response.json();
          alert(data.message);
        } else {
          alert('Message sent!');
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
      <h2>Shark Dashboard</h2>
      <h3>Current Pitch:</h3>
      <div>
        <strong>Title:</strong> {currentPitch.title}
      </div>
      <div>
        <strong>Video URL:</strong> {currentPitch.videoUrl}
      </div>
      <div>
        <strong>Company Info:</strong> {currentPitch.companyInfo}
      </div>

      <button onClick={handleSwipeLeft} style={{ margin: '0.5rem' }}>
        Swipe Left (Not Interested)
      </button>
      <button onClick={handleSwipeRight} style={{ margin: '0.5rem' }}>
        Swipe Right (Interested)
      </button>
      <button
        onClick={() => handleMessage(currentPitch.id)}
        style={{ margin: '0.5rem' }}
      >
        Message
      </button>
      <button
        onClick={() => handleBookmark(currentPitch.id)}
        style={{ margin: '0.5rem' }}
      >
        Bookmark
      </button>
    </div>
  );
};

export default SharkDashboard;