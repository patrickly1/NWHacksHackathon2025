// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./style/SharkDashboard.css";

// // const SharkDashboard = ({ currentUser }) => {
// //   const [pitches, setPitches] = useState([]);
// //   const [currentPitchIndex, setCurrentPitchIndex] = useState(0);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchPitches = async () => {
// //       try {
// //         const response = await fetch("http://localhost:5002/api/pitches");
// //         const data = await response.json();
// //         setPitches(data);
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };
// //     fetchPitches();
// //   }, []);

// //   const handleSwipeDown = () => {
// //     if (currentPitchIndex < pitches.length - 1) {
// //       setCurrentPitchIndex((prev) => prev + 1);
// //     } else {
// //       alert("You have viewed all pitches!");
// //     }
// //   };

// //   const handleViewProfile = () => {
// //     const currentPitch = pitches[currentPitchIndex];
// //     if (currentPitch?.owner?.id) {
// //       navigate(`/pitcher-profile/${currentPitch.owner.id}`);
// //     } else {
// //       alert("Pitcher profile information is missing.");
// //     }
// //   };

// //   if (pitches.length === 0) {
// //     return <div>No pitches available.</div>;
// //   }

// //   const currentPitch = pitches[currentPitchIndex];

// //   return (
// //     <div style={{ padding: "1rem" }}>
// //       <h2>Shark Dashboard</h2>
// //       <h3>Current Pitch:</h3>
// //       <div>
// //         <strong>Title:</strong> {currentPitch.title}
// //       </div>
// //       <div>
// //         <strong>Caption:</strong> {currentPitch.caption}
// //       </div>
// //       <div>
// //         <strong>Video URL:</strong> {currentPitch.videoUrl}
// //       </div>
// //       <div className="button-container">
// //         <button
// //           onClick={handleSwipeDown}
// //           style={{ margin: "0.5rem", backgroundColor: "lightgreen" }}
// //         >
// //           Next Pitch
// //         </button>
// //         <button
// //           onClick={handleViewProfile}
// //           style={{ margin: "0.5rem", backgroundColor: "lightblue" }}
// //         >
// //           View Pitcher Profile
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SharkDashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SharkDashboard = ({ currentUser }) => {
//   const [pitches, setPitches] = useState([]);
//   const [currentPitchIndex, setCurrentPitchIndex] = useState(0);
//   const navigate = useNavigate();

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

//   const handleViewProfile = () => {
//     const currentPitch = pitches[currentPitchIndex];
//     navigate(`/pitcher-profile/${currentPitch.ownerId}`);
//   };

//   const handleSwipeDown = () => {
//     if (currentPitchIndex < pitches.length - 1) {
//       setCurrentPitchIndex((prev) => prev + 1);
//     } else {
//       alert("You have viewed all pitches!");
//     }
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
//           Swipe Down
//         </button>
//         <button
//           onClick={handleViewProfile}
//           style={{ margin: "0.5rem", backgroundColor: "lightblue" }}
//         >
//           View Pitcher Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SharkDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SharkDashboard = ({ currentUser }) => {
  const [pitches, setPitches] = useState([]);
  const [currentPitchIndex, setCurrentPitchIndex] = useState(0);
  const navigate = useNavigate();

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

  const handleViewProfile = () => {
    const currentPitch = pitches[currentPitchIndex];
    navigate(`/pitcher-profile/${currentPitch.ownerId}`, {
      state: { currentIndex: currentPitchIndex }, // Pass the current index to PitcherProfile
    });
  };

  const handleSwipeDown = () => {
    if (currentPitchIndex < pitches.length - 1) {
      setCurrentPitchIndex((prev) => prev + 1);
    } else {

      alert('You have viewed all pitches!');
    }
  };

  const handleSwipeRight = () => {
    setShowCompanyInfo((prev) => !prev);
  };

  const handleSwipeLeft = () => {
    //add bookmark
  };

  const handleSendMessage = async (pitchId) => {
    if (!showCompanyInfo) return;

    const message = prompt('Enter your message to the pitcher:');
    if (message) {
      try {
        const response = await fetch('http://localhost:5002/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pitchId, sharkId: currentUser.id, message }),
        });

        if (response.ok) {
          alert('Message sent!');
          // Remove the messaged pitch from the dashboard
          setPitches((prevPitches) =>
            prevPitches.filter((pitch) => pitch.id !== pitchId)
          );
          setShowCompanyInfo(false);

          // Reset the index to avoid out-of-bounds errors
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
    <div style={{ padding: "1rem" }}>
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
          Swipe Down
        </button>
        <button
          onClick={handleViewProfile}
          style={{ margin: "0.5rem", backgroundColor: "lightblue" }}
        >
          View Pitcher Profile
        </button>
        <button id="swipeLeftBtn" onClick={handleSwipeLeft} style={{ margin: '0.5rem' }}>
          Swipe left
        </button>
      </div>
    </div>
  );
};

export default SharkDashboard;