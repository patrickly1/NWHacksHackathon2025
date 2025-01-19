import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import telus from "../assets/Telus.svg";

const PitcherProfile = ({ currentUser, setRemainingPitches }) => {
  const { pitcherId } = useParams();
  const [pitcher, setPitcher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPitcher = async () => {
      try {
        const response = await fetch(
          `http://localhost:5002/api/users/${pitcherId}`
        );
        if (response.ok) {
          const data = await response.json();
          setPitcher(data);
        } else {
          console.error("Failed to fetch pitcher data");
        }
      } catch (error) {
        console.error("Error fetching pitcher:", error);
      }
    };

    fetchPitcher();
  }, [pitcherId]);

  const handleSendMessage = async () => {
    const message = prompt(`Enter your message to ${pitcher?.name}:`);
    if (message) {
      try {
        const response = await fetch(`http://localhost:5002/api/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderId: currentUser.id,
            senderType: currentUser.type,
            recipientId: pitcherId,
            message,
          }),
        });

        if (response.ok) {
          alert("Message sent successfully!");
          // Remove the pitch from the SharkDashboard
          setRemainingPitches((prevPitches) =>
            prevPitches.filter((pitch) => pitch.ownerId !== pitcherId)
          );
          navigate("/shark"); // Redirect to the SharkDashboard
        } else {
          const data = await response.json();
          alert(`Error: ${data.message}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleBackToDashboard = () => {
    navigate("/shark");
  };

  if (!pitcher) {
    return <div>Loading pitcher profile...</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{pitcher.name}'s Profile</h2>
      <img
        src={telus}
        alt={`${pitcher.name}'s profile`}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          marginBottom: "1rem",
          objectFit: "cover",
        }}
      />
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
      <div>
        <h3 style={{ marginBottom: "5px" }}>About</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "14px",
            padding: "0px",
            margin: "",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <button
          onClick={handleSendMessage}
          style={{
            margin: "0.5rem",
            backgroundColor: "#F6F6F6",
            padding: "10px",
            borderRadius: "20px",
            cursor: "pointer",
            borderColor: "#256AE5",
            color: "#256AE5",
          }}
        >
          Message {pitcher.name}
        </button>
        <button
          onClick={handleBackToDashboard}
          style={{
            margin: "0.5rem",
            backgroundColor: "lightgrey",
            padding: "10px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Back to Explorer
        </button>
      </div>
    </div>
  );
};

export default PitcherProfile;
