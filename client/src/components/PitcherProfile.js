// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const PitcherProfile = ({ currentUser }) => {
//   const { pitcherId } = useParams(); // Get pitcherId from URL
//   const [pitcher, setPitcher] = useState(null);
//   const navigate = useNavigate(); // To navigate back to SharkDashboard

//   useEffect(() => {
//     const fetchPitcherData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5002/api/users/${pitcherId}`);
//         if (response.ok) {
//           const data = await response.json();
//           setPitcher(data);
//         } else {
//           console.error("Failed to fetch pitcher data");
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchPitcherData();
//   }, [pitcherId]);

//   const handleSendMessage = async () => {
//     const message = prompt("Enter your message:");
//     if (message) {
//       try {
//         const response = await fetch(`http://localhost:5002/api/messages`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             senderId: currentUser.id,
//             senderType: currentUser.type,
//             recipientId: pitcherId,
//             message,
//           }),
//         });

//         if (response.ok) {
//           alert("Message sent successfully!");
//         } else {
//           const data = await response.json();
//           alert(`Error: ${data.message}`);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   const handleBackToDashboard = () => {
//     navigate("/shark"); // Navigate back to SharkDashboard
//   };

//   if (!pitcher) {
//     return <div>Loading pitcher profile...</div>;
//   }

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h2>{pitcher.name}'s Profile</h2>
//       <img
//         src={pitcher.profilePic || "https://via.placeholder.com/100"}
//         alt={`${pitcher.name}'s profile`}
//         style={{
//           width: "100px",
//           height: "100px",
//           borderRadius: "50%",
//           marginBottom: "1rem",
//           objectFit: "cover",
//         }}
//       />
//       <p><strong>Location:</strong> {pitcher.location}</p>
//       <a
//         href={pitcher.linkedin}
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{ color: "blue", textDecoration: "underline" }}
//       >
//         LinkedIn Profile
//       </a>
//       <div style={{ marginTop: "1rem" }}>
//         <button
//           onClick={handleSendMessage}
//           style={{
//             margin: "0.5rem",
//             backgroundColor: "lightblue",
//             padding: "10px",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Message {pitcher.name}
//         </button>
//         <button
//           onClick={handleBackToDashboard}
//           style={{
//             margin: "0.5rem",
//             backgroundColor: "lightgrey",
//             padding: "10px",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Back to Explorer
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PitcherProfile;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PitcherProfile = () => {
  const { pitcherId } = useParams();
  const [pitcher, setPitcher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPitcher = async () => {
      try {
        const response = await fetch(`http://localhost:5002/api/users/${pitcherId}`);
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

  if (!pitcher) {
    return <div>Loading pitcher profile...</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{pitcher.name}'s Profile</h2>
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
      <p><strong>Location:</strong> {pitcher.location}</p>
      <a
        href={pitcher.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "blue", textDecoration: "underline" }}
      >
        LinkedIn Profile
      </a>
      <button
        onClick={() => navigate("/shark")}
        style={{
          marginTop: "1rem",
          backgroundColor: "lightgrey",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back to Explorer
      </button>
    </div>
  );
};

export default PitcherProfile;

