import React, { useEffect, useState } from "react";
import telus from "../assets/telusHome.jpg";
import warp from "../assets/warp.jpg";

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
    <div style={{ 
      overflow: 'scroll', 
      padding: '1rem',
      height: '774px',
      scrollbarWidth: 'none',

    }}>
      <h2>Welcome, {currentUser.name}</h2>
      {bookmarkedPitches.map((pitch) => (
        <div
          key={pitch.id}
          style={{
            // border: "1px solid #ccc",
            backgroundColor: "#F6F6F6",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            
          }}
        >
          <h4>{pitch.title}</h4>
          <div>
            {pitch.ownerId === "user2" ? (
              <img
                src={telus}
                alt="Owner-specific image"
                style={{
                  maxWidth: "100%", // Ensures it doesn't exceed the container's width
                  height: "auto", // Maintains the aspect ratio
                }}
              />
            ) : pitch.ownerId === "user3" ? (
              <img
                src={warp}
                alt="Owner-specific image"
                style={{
                  maxWidth: "100%", // Ensures it doesn't exceed the container's width
                  height: "auto", // Maintains the aspect ratio
                }}
              />
            ) : (
              <p>Not the owner</p>
            )}
          </div>
          <p>{pitch.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
