import React from "react";
import markCuban from "../assets/MarkCuban2023.jpg";

const Profile = ({ currentUser }) => {
  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Corrected to flexDirection
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "" }}>
          <img
            src={markCuban}
            alt={`${currentUser.name}'s profile`}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%", // Ensures the circle shape
              marginRight: "1rem",
              objectFit: "cover", // Ensures the image is cropped to fit the circle
            }}
          />
        </div>

        <div>
          <h3>{currentUser.name}</h3>
          <p>
            <strong>Location:</strong> {currentUser.location}
          </p>
          <a
            href={currentUser.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            LinkedIn Profile
          </a>
        </div>
      </div>

      {currentUser.type === "pitcher" && (
        <div>
          <h3>Your Pitches</h3>
          {currentUser.pitches.length > 0 ? (
            <ul>
              {currentUser.pitches.map((pitchId, index) => (
                <li key={index}>{pitchId}</li>
              ))}
            </ul>
          ) : (
            <p>You have no pitches yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
