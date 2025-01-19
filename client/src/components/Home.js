import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import telus from "../assets/telusHome.jpg";
import warp from "../assets/warp.jpg";

const Home = ({ currentUser }) => {
  const [bookmarkedPitches, setBookmarkedPitches] = useState([]);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [caption, setCaption] = useState("");

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

  const handleCreatePitch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5002/api/pitches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          videoUrl,
          caption,
          ownerId: currentUser.id,
        }),
      });
      if (response.ok) {
        alert("Pitch created!");
        setTitle("");
        setVideoUrl("");
        setCaption("");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentUser) {
    return <div>Please log in to view your home page.</div>;
  }

  if (currentUser.type === "pitcher") {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>Welcome, {currentUser.name}</h2>
        <h3>Create Your Pitch</h3>
        <form onSubmit={handleCreatePitch}>
          <div>
            <label>Title: </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Video URL: </label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
          <div>
            <label>Caption: </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <button type="submit">Create Pitch</button>
        </form>
      </div>
    );
  }

  if (currentUser.type === "shark") {
    return (
      <div
        style={{
          overflow: "scroll",
          padding: "1rem",
          height: "774px",
          scrollbarWidth: "none",
        }}
      >
        <h2>Welcome, {currentUser.name}</h2>
        <h3>Your Bookmarked Pitches:</h3>
        {bookmarkedPitches.length === 0 ? (
          <div>No bookmarked pitches available.</div>
        ) : (
          bookmarkedPitches.map((pitch) => (
            <div
              key={pitch.id}
              style={{
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
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                ) : pitch.ownerId === "user3" ? (
                  <img
                    src={warp}
                    alt="Owner-specific image"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <p>{pitch.caption}</p>
              <p><strong>Company Info:</strong> {pitch.companyInfo}</p>
            </div>
          ))
        )}
      </div>
    );
  }

  return <div>Please log in to view your home page.</div>;
};

export default Home;