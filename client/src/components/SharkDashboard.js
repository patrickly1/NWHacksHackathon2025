// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./style/SharkDashboard.css";


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
//     navigate(`/pitcher-profile/${currentPitch.ownerId}`, {
//       state: { currentIndex: currentPitchIndex }, // Pass the current index to PitcherProfile
//     });
//   };

//   const handleSwipeDown = () => {
//     if (currentPitchIndex < pitches.length - 1) {
//       setCurrentPitchIndex((prev) => prev + 1);
//     } else {
//       alert("You have viewed all pitches!");
//     }
//   };

//   const handleSwipeLeft = (currentPitchId) => {
//     if (currentUser && currentUser.type === 'shark') {
//       // Check if the pitch is already bookmarked
//       if (!currentUser.bookmarkedPitches.includes(currentPitchId)) {
//         // Add the pitch ID to the user's bookmarked pitches
//         currentUser.bookmarkedPitches.push(currentPitchId);
  
//         // Optionally update the backend if needed
//         fetch(`http://localhost:5002/api/bookmark`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ sharkId: currentUser.id, pitchId: currentPitchId }),
//         })
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error('Failed to bookmark the pitch.');
//             }
//             alert('Pitch bookmarked successfully!');
//           })
//           .catch((error) => {
//             console.error(error);
//             alert('An error occurred while bookmarking the pitch.');
//           });
//       } else {
//         alert('This pitch is already bookmarked.');
//       }
//     } else {
//       alert('Only shark users can bookmark pitches.');
//     }
  
//     // Proceed to the next pitch
//     setCurrentPitchIndex((prevIndex) => (prevIndex + 1) % pitches.length);
//   };

//   if (pitches.length === 0) {
//     return <div>No pitches available.</div>;
//   }

//   const currentPitch = pitches[currentPitchIndex];

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h2>Pitches</h2>
//       <div>
//         <strong>Title:</strong> {currentPitch.title}
//       </div>
//       <div>
//         <strong>Caption:</strong> {currentPitch.caption}
//       </div>
//       <div>
//         <strong>Video URL:</strong> {currentPitch.videoUrl}
//       </div>
//       <video
//         controls
//         width="600"
//         src={currentPitch.videoUrl}
//         autoplay
//         muted
//         loop
//         style={{ marginTop: '10px' }}
//         >
//         Your browser does not support the video tag.
//       </video>
//       <div className="button-container">
//         <button id="swipeUpBtn"
//           onClick={handleSwipeDown}
//         >
//           Swipe Down
//         </button>
//         <button id="swipeRightBtn"
//           onClick={handleViewProfile}
//         >
//           Swipe Right
//         </button>

//         <button id="swipeLeftBtn" onClick={handleSwipeLeft(currentPitch.id)} style={{ margin: '0.5rem' }}>
//           Swipe left
//         </button>

//       </div>
//     </div>
//   );
// };

// export default SharkDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/SharkDashboard.css";

const SharkDashboard = ({ currentUser }) => {
  const [pitches, setPitches] = useState([]);
  const [currentPitchIndex, setCurrentPitchIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null); // Manage error messages
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
      alert("You have viewed all pitches!");
    }
  };

  const handleSwipeLeft = (currentPitchId) => {
    if (currentUser && currentUser.type === "shark") {
      // Check if the pitch is already bookmarked
      if (!currentUser.bookmarkedPitches.includes(currentPitchId)) {
        // Add the pitch ID to the user's bookmarked pitches
        currentUser.bookmarkedPitches.push(currentPitchId);

        // Optionally update the backend if needed
        fetch(`http://localhost:5002/api/bookmark`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sharkId: currentUser.id, pitchId: currentPitchId }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to bookmark the pitch.");
            }
            alert("Pitch bookmarked successfully!");
          })
          .catch((error) => {
            console.error(error);
            setErrorMessage("An error occurred while bookmarking the pitch.");
          });
      } else {
        setErrorMessage("This pitch is already bookmarked.");
      }
    } else {
      setErrorMessage("Only shark users can bookmark pitches.");
    }

    // Proceed to the next pitch
    setCurrentPitchIndex((prevIndex) => (prevIndex + 1) % pitches.length);
  };

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  if (pitches.length === 0) {
    return <div>No pitches available.</div>;
  }

  const currentPitch = pitches[currentPitchIndex];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Pitches</h2>
      <div>
        <strong>Title:</strong> {currentPitch.title}
      </div>
      <div>
        <strong>Caption:</strong> {currentPitch.caption}
      </div>
      <video
        controls
        width="600"
        src={currentPitch.videoUrl}
        autoPlay
        muted
        loop
        style={{ marginTop: "10px" }}
      >
        Your browser does not support the video tag.
      </video>

      {errorMessage && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#842029",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          {errorMessage}
          <button
            onClick={clearErrorMessage}
            style={{
              marginLeft: "10px",
              backgroundColor: "#842029",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            OK
          </button>
        </div>
      )}

      <div className="button-container">
        <button id="swipeUpBtn" onClick={handleSwipeDown}>
          Swipe Down
        </button>
        <button id="swipeRightBtn" onClick={handleViewProfile}>
          Swipe Right
        </button>
        <button
          id="swipeLeftBtn"
          onClick={() => handleSwipeLeft(currentPitch.id)}
          style={{ margin: "0.5rem" }}
        >
          Swipe Left
        </button>
      </div>
    </div>
  );
};

export default SharkDashboard;
