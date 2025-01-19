// import React, { useEffect, useState } from 'react';
// import "./style/SharkDashboard.css";

// const SharkDashboard = ({ currentUser }) => {
//   const [pitches, setPitches] = useState([]);
//   const [currentPitchIndex, setCurrentPitchIndex] = useState(0);

//   useEffect(() => {
//     const fetchPitches = async () => {
//       try {
//         const response = await fetch('http://localhost:5002/api/pitches');
//         const data = await response.json();
//         setPitches(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchPitches();
//   }, []);

//   const handleSwipeUp = () => {
//     if (currentPitchIndex < pitches.length - 1) {
//       setCurrentPitchIndex((prev) => prev + 1);
//     } else {
//       alert('You have viewed all pitches!');
//     }
//   };

//   if (pitches.length === 0) {
//     return <div>No pitches available.</div>;
//   }

//   const currentPitch = pitches[currentPitchIndex];

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>Shark Dashboard</h2>
//       <h3>Current Pitch:</h3>
//       <div>
//         <div>
//           <strong>Title:</strong> {currentPitch.title}
//         </div>
//         <div>
//           <strong>Caption:</strong> {currentPitch.caption}
//         </div>
//         <div>
//           <strong>Video URL:</strong> {currentPitch.videoUrl}
//         </div>
//       </div>

//       <button id="swipeUpBtn" onClick={handleSwipeUp} style={{ margin: '0.5rem' }}>
//         Swipe Up
//       </button>
//     </div>
//   );
// };

// export default SharkDashboard;

// import React, { useEffect, useState } from "react";
// import PitcherProfile from "./PitcherProfile"; // Import PitcherProfile
// import "./style/SharkDashboard.css";

// const SharkDashboard = ({ currentUser }) => {
//   const [pitches, setPitches] = useState([]);
//   const [currentPitchIndex, setCurrentPitchIndex] = useState(0);
//   const [showProfile, setShowProfile] = useState(false);

//   useEffect(() => {
//     const fetchPitches = async () => {
//       try {
//         const response = await fetch("http://localhost:5002/api/pitches");
//         const data = await response.json();
//         setPitches(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchPitches();
//   }, []);

//   const handleSwipeLeft = () => {
//     setShowProfile(false);
//   };

//   const handleSwipeDown = () => {
//     if (currentPitchIndex < pitches.length - 1) {
//       setCurrentPitchIndex((prev) => prev + 1);
//       setShowProfile(false);
//     } else {
//       alert("You have viewed all pitches!");
//     }
//   };

//   const handleSwipeRight = () => {
//     setShowProfile(true);
//   };

//   const handleSendMessage = async (pitcherId) => {
//     const message = prompt("Enter your message:");
//     if (message) {
//       try {
//         const response = await fetch("http://localhost:5002/api/messages", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             pitchId: pitches[currentPitchIndex].id,
//             senderId: currentUser.id,
//             senderType: currentUser.type,
//             message,
//           }),
//         });

//         if (response.ok) {
//           alert("Message sent!");
//           handleSwipeDown(); // Automatically go to the next pitch
//         } else {
//           const data = await response.json();
//           alert(data.message);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   if (pitches.length === 0) {
//     return <div>No pitches available.</div>;
//   }

//   const currentPitch = pitches[currentPitchIndex];

//   return (
//     <div style={{ padding: "1rem" }}>
//       {showProfile ? (
//         <PitcherProfile
//           pitcher={currentPitch.owner} // Assuming each pitch has an `owner` object
//           onSendMessage={handleSendMessage}
//           onSwipeLeft={handleSwipeLeft}
//           onSwipeDown={handleSwipeDown}
//         />
//       ) : (
//         <div>
//           <h2>Shark Dashboard</h2>
//           <h3>Current Pitch:</h3>
//           <div>
//             <strong>Title:</strong> {currentPitch.title}
//           </div>
//           <div>
//             <strong>Caption:</strong> {currentPitch.caption}
//           </div>
//           <div>
//             <strong>Video URL:</strong> {currentPitch.videoUrl}
//           </div>
//           <button
//             onClick={handleSwipeRight}
//             style={{ margin: "0.5rem", backgroundColor: "lightblue" }}
//           >
//             View Pitcher Profile
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SharkDashboard;

import React, { useEffect, useState } from "react";
import PitcherProfile from "./PitcherProfile";
import "./style/SharkDashboard.css";

const SharkDashboard = ({ currentUser }) => {
  const [pitches, setPitches] = useState([]);
  const [currentPitchIndex, setCurrentPitchIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/pitches");
        const data = await response.json();
        setPitches(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPitches();
  }, []);

  const handleSwipeLeft = () => {
    setShowProfile(false); // Go back to the pitch view
  };

  const handleSwipeDown = () => {
    if (currentPitchIndex < pitches.length - 1) {
      setCurrentPitchIndex((prev) => prev + 1); // Move to the next pitch
      setShowProfile(false); // Ensure we return to the pitch view
    } else {
      alert("You have viewed all pitches!");
    }
  };

  const handleSwipeRight = () => {
    setShowProfile(true); // Show the pitcher profile
  };


  const handleSendMessage = async (pitchId) => {
    if (!showCompanyInfo) return;

    const message = prompt('Enter your message to the pitcher:');
    if (message) {
      try {
        const response = await fetch("http://localhost:5002/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pitchId: pitches[currentPitchIndex].id,
            senderId: currentUser.id,
            senderType: currentUser.type,
            message,
          }),
        });

        if (response.ok) {
          alert("Message sent!");
          handleSwipeDown(); // Automatically go to the next pitch
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
    <div style={{ padding: "1rem" }}>
      {showProfile ? (
        <PitcherProfile
          pitcher={currentPitch.owner} // Assuming each pitch has an `owner` object
          onSendMessage={handleSendMessage}
          onSwipeLeft={handleSwipeLeft}
          onSwipeDown={handleSwipeDown}
        />
      ) : (
        <div>
          <h2>Shark Dashboard</h2>
          <h3>Current Pitch:</h3>
          <div>
            <strong>Title:</strong> {currentPitch.title}
          </div>
          <div>
            <strong>Caption:</strong> {currentPitch.caption}
          </div>
          <div>
            <strong>Video URL:</strong> {currentPitch.videoUrl}
          </div>
          <div className="button-container">
            <button
              onClick={handleSwipeDown}
              style={{ margin: "0.5rem", backgroundColor: "lightgreen" }}
            >
              Next Pitch
            </button>
            <button
              onClick={handleSwipeRight}
              style={{ margin: "0.5rem", backgroundColor: "lightblue" }}
            >
              View Pitcher Profile
            </button>
          </div>
        </div>
      )}

      <div className="button-container">
        <button id="swipeUpBtn" onClick={handleSwipeDown} style={{ margin: '0.5rem' }}>
          Swipe Up
        </button>
        <button id="swipeRightBtn" onClick={handleSwipeRight} style={{ margin: '0.5rem' }}>
          {showCompanyInfo ? 'Back to Video' : 'Swipe Right'}
        </button>
        <button id="swipeLeftBtn" onClick={handleSwipeLeft} style={{ margin: '0.5rem' }}>
          Swipe left
        </button>
      </div>

      {/* <button onClick={handleSwipeLeft} style={{ margin: '0.5rem' }}>
        Swipe Left (Not Interested)
      </button>
      <button onClick={handleSwipeRight} style={{ margin: '0.5rem' }}>
        {showCompanyInfo ? 'Back to Video' : 'View Company Info'}
      </button> */}
    </div>
  );
};

export default SharkDashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import "./style/SharkDashboard.css";

// const SharkDashboard = ({ currentUser }) => {
//   const [pitches, setPitches] = useState([]);
//   const [currentPitchIndex, setCurrentPitchIndex] = useState(0);

//   const navigate = useNavigate(); // Initialize navigation

//   useEffect(() => {
//     const fetchPitches = async () => {
//       try {
//         const response = await fetch("http://localhost:5002/api/pitches");
//         const data = await response.json();
//         setPitches(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchPitches();
//   }, []);

//   const handleSwipeDown = () => {
//     if (currentPitchIndex < pitches.length - 1) {
//       setCurrentPitchIndex((prev) => prev + 1);
//     } else {
//       alert("You have viewed all pitches!");
//     }
//   };

//   const handleViewProfile = (pitcherId) => {
//     navigate(`/pitcher-profile/${pitcherId}`); // Navigate to the pitcher's profile
//   };

//   if (pitches.length === 0) {
//     return <div>No pitches available.</div>;
//   }

//   const currentPitch = pitches[currentPitchIndex];

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h2>Shark Dashboard</h2>
//       <h3>Current Pitch:</h3>
//       <div>
//         <strong>Title:</strong> {currentPitch.title}
//       </div>
//       <div>
//         <strong>Caption:</strong> {currentPitch.caption}
//       </div>
//       <div>
//         <strong>Video URL:</strong> {currentPitch.videoUrl}
//       </div>
//       <div className="button-container">
//         <button
//           onClick={handleSwipeDown}
//           style={{ margin: "0.5rem", backgroundColor: "lightgreen" }}
//         >
//           Next Pitch
//         </button>
//         <button
//           onClick={() => handleViewProfile(currentPitch.owner.id)}
//           style={{ margin: "0.5rem", backgroundColor: "lightblue" }}
//         >
//           View Pitcher Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SharkDashboard;