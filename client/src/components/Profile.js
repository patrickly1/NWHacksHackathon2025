import React from "react";

const Profile = ({ currentUser }) => {
  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Profile</h2>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <img
          src={currentUser.profilePic || "https://via.placeholder.com/100"}
          alt={`${currentUser.name}'s profile`}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            marginRight: "1rem",
          }}
        />
        <div>
          <h3>{currentUser.name}</h3>
          <p><strong>Location:</strong> {currentUser.location}</p>
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