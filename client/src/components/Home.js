// import React from "react";
// import { Navigate } from "react-router-dom";

// const Home = ({ currentUser }) => {
//   if (!currentUser) {
//     return <div>Please log in to view your home page.</div>;
//   }

//   if (currentUser.type === "pitcher") {
//     // Redirect pitchers to their dashboard
//     return <Navigate to="/pitcher" />;
//   }

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h2>Welcome, {currentUser.name}</h2>
//       <h3>Your Bookmarked Pitches:</h3>
//       {currentUser.bookmarkedPitches && currentUser.bookmarkedPitches.length > 0 ? (
//         <ul>
//           {currentUser.bookmarkedPitches.map((pitchId, index) => (
//             <li key={index}>Pitch ID: {pitchId}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>You have no bookmarked pitches yet.</p>
//       )}
//     </div>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from "react";

// const Home = ({ currentUser }) => {
//   const [bookmarkedPitches, setBookmarkedPitches] = useState([]);

//   useEffect(() => {
//     const fetchBookmarkedPitches = async () => {
//       if (currentUser && currentUser.type === "shark") {
//         try {
//           const response = await fetch("http://localhost:5002/api/pitches");
//           const allPitches = await response.json();

//           // Filter pitches based on the user's bookmarked pitches
//           const filteredPitches = allPitches.filter((pitch) =>
//             currentUser.bookmarkedPitches.includes(pitch.id)
//           );
//           setBookmarkedPitches(filteredPitches);
//         } catch (err) {
//           console.error("Error fetching pitches:", err);
//         }
//       }
//     };

//     fetchBookmarkedPitches();
//   }, [currentUser]);

//   if (!currentUser || currentUser.type !== "shark") {
//     return <div>Please log in as a shark to view this page.</div>;
//   }

//   if (bookmarkedPitches.length === 0) {
//     return <div>No bookmarked pitches available.</div>;
//   }

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h2>Welcome, {currentUser.name}</h2>
//       <h3>Your Bookmarked Pitches</h3>
//       {bookmarkedPitches.map((pitch) => (
//         <div
//           key={pitch.id}
//           style={{
//             border: "1px solid #ccc",
//             padding: "1rem",
//             marginBottom: "1rem",
//             borderRadius: "8px",
//           }}
//         >
//           <h4>{pitch.title}</h4>
//           <p>
//             <strong>Caption:</strong> {pitch.caption}
//           </p>
//           <p>
//             <strong>Company Info:</strong> {pitch.companyInfo}
//           </p>
//           <video
//             controls
//             width="400"
//             src={pitch.videoUrl}
//             style={{ marginTop: "10px" }}
//           >
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";

const Home = ({ currentUser }) => {
  const [bookmarkedPitches, setBookmarkedPitches] = useState([]);

  useEffect(() => {
    const fetchBookmarkedPitches = async () => {
      if (currentUser && currentUser.type === "shark") {
        try {
          const response = await fetch("http://localhost:5002/api/pitches");
          const allPitches = await response.json();

          // Filter pitches based on the user's bookmarked pitches
          const filteredPitches = allPitches.filter((pitch) =>
            currentUser.bookmarkedPitches.includes(pitch.id)
          );
          setBookmarkedPitches(filteredPitches);
        } catch (err) {
          console.error("Error fetching pitches:", err);
        }
      }
    };

    fetchBookmarkedPitches();
  }, [currentUser]);

  if (!currentUser || currentUser.type !== "shark") {
    return <div>Please log in as a shark to view this page.</div>;
  }

  if (bookmarkedPitches.length === 0) {
    return <div>No bookmarked pitches available.</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Welcome, {currentUser.name}</h2>
      <h3>Your Bookmarked Pitches</h3>
      {bookmarkedPitches.map((pitch) => (
        <div
          key={pitch.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <h4>{pitch.title}</h4>
          <p>
            <strong>Caption:</strong> {pitch.caption}
          </p>
          <p>
            <strong>Company Info:</strong> {pitch.companyInfo}
          </p>
          <img
            src={pitch.photoUrl}
            alt={pitch.title}
            style={{
              width: "100%",
              height: "auto",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;