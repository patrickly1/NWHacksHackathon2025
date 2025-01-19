import React from "react";

const PitcherProfile = ({ pitcher, onSendMessage, onSwipeLeft, onSwipeDown }) => {
  if (!pitcher) {
    return <div>No pitcher profile available.</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div>
          <img
            src={pitcher.profilePic || "https://via.placeholder.com/100"}
            alt={`${pitcher.name}'s profile`}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginBottom: "1rem",
              objectFit: "cover",
            }}
          />
        </div>

        <div>
          <h3>{pitcher.name}</h3>
          <p>
            <strong>Location:</strong> {pitcher.location}
          </p>
          <a
            href={pitcher.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            LinkedIn Profile
          </a>
        </div>
      </div>

      <div>
        <button
          onClick={() => onSendMessage(pitcher.id)}
          style={{ margin: "0.5rem" }}
        >
          Send Message
        </button>
        <button
          onClick={onSwipeLeft}
          style={{ margin: "0.5rem", backgroundColor: "lightgrey" }}
        >
          Back to Pitch
        </button>
        <button
          onClick={onSwipeDown}
          style={{ margin: "0.5rem", backgroundColor: "lightgreen" }}
        >
          Next Pitch
        </button>
      </div>
    </div>
  );
};

export default PitcherProfile;