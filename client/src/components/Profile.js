// import React from "react";
// import markCuban from "../assets/MarkCuban2023.jpg";

// const Profile = ({ currentUser }) => {
//   if (!currentUser) {
//     return <div>Please log in to view your profile.</div>;
//   }

//   return (
//     <div style={{ padding: "1rem" }}>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column", // Corrected to flexDirection
//           alignItems: "center",
//           marginBottom: "1rem",
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "" }}>
//           <img
//             src={markCuban}
//             alt={`${currentUser.name}'s profile`}
//             style={{
//               width: "100px",
//               height: "100px",
//               borderRadius: "50%", // Ensures the circle shape
//               marginRight: "1rem",
//               objectFit: "cover", // Ensures the image is cropped to fit the circle
//             }}
//           />
//         </div>

//         <div>
//           <h3>{currentUser.name}</h3>
//           <p>
//             <strong>Location:</strong> {currentUser.location}
//           </p>
//           <a
//             href={currentUser.linkedin}
//             target="_blank"
//             rel="noopener noreferrer"
//             style={{ color: "blue", textDecoration: "underline" }}
//           >
//             LinkedIn Profile
//           </a>
//         </div>
//       </div>

//       {currentUser.type === "pitcher" && (
//         <div>
//           <h3>Your Pitches</h3>
//           {currentUser.pitches.length > 0 ? (
//             <ul>
//               {currentUser.pitches.map((pitchId, index) => (
//                 <li key={index}>{pitchId}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>You have no pitches yet.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import backgroundPic from "../assets/MarkCubanBackground.svg";
import markCuban from "../assets/MarkCuban2023.jpg";
import telus from "../assets/Telus.svg";
import telusBackgroundPic from "../assets/TelusBackground.svg";

const Profile = ({ currentUser }) => {
  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredTwo, setIsHoveredTwo] = useState(false);

  return (
    <div style={{
      marginLeft: "-20px", 
      overflowY:"scroll",
      overflowX:"hidden",
      scrollbarWidth: 'none',
      height: '774px',
      width: '110%',
      }}>
      <img src={backgroundPic} style={{ width: "402px" }}></img>
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Corrected to flexDirection
          alignItems: "center",
          marginBottom: "1rem",
          backgroundColor: "white",
          borderRadius: "20px",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            paddingLeft: "40px",
            paddingRight: "40px",
            paddingTop: "10px",
          }}
        >
          <img
            src={
              currentUser.name === "Mark Cuban"
                ? markCuban
                : currentUser.name === "telus"
                ? telus
                : telus
            }
            alt={`${currentUser.name}'s profile`}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "100px", // Ensures the circle shape
              marginRight: "1rem",
              objectFit: "cover", // Ensures the image is cropped to fit the circle
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {currentUser.type === "shark" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {currentUser.interests}
                </div>
                <div style={{ fontSize: "14px" }}>Interests</div>
              </div>
            )}
            <div style={{ width: "100px" }}>
              <div>
                <button
                  style={{
                    marginTop: "10px",
                    height: "40px",
                    width: "100px",
                    fontSize: "14px",
                    padding: "10px 10px",
                    backgroundColor: isHovered ? "#256AE5" : "transparent",
                    borderWidth: "0.5px",
                    borderColor: "grey",
                    borderRadius: "30px",
                    cursor: "pointer",
                  }}
                  onClick={() => alert("Button clicked!")}
                  onMouseEnter={() => setIsHovered(true)} // Hover in
                  onMouseLeave={() => setIsHovered(false)} // Hover out
                >
                  Edit Profile
                </button>
              </div>
              <button
                style={{
                  marginTop: "10px",
                  height: "40px",
                  width: "100px",
                  fontSize: "14px",
                  padding: "10px 10px",
                  borderWidth: "0.5px",
                  borderColor: isHoveredTwo ? "transparent" : "red",
                  backgroundColor: isHoveredTwo ? "red" : "transparent",
                  borderRadius: "30px",
                  color: isHoveredTwo ? "white" : "red",
                  cursor: "pointer",
                }}
                onClick={() => alert("Logged out!")}
                onMouseEnter={() => setIsHoveredTwo(true)} // Hover in
                onMouseLeave={() => setIsHoveredTwo(false)} // Hover out
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        <div
          style={{ paddingLeft: "40px", width: "100%", paddingRight: "40px" }}
        >
          <div style={{ padding: "0px" }}>
            <h3 style={{ margin: "0px", paddingTop: "10px" }}>
              {currentUser.name}
            </h3>
            <p style={{ margin: "0px", marginBottom: "5px" }}>
              {currentUser.location}
            </p>
          </div>
          <a
            href={currentUser.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#256AE5",
              textDecoration: "underline",
              padding: "0px",
              fontSize: "14px",
              fontWeight: "normal",
              marginTop: "10px",
            }}
          >
            linkedin.com/in/{currentUser.name}
          </a>
        </div>
      </div>

      <div style={{ marginTop: "-450px", paddingLeft: "40px", paddingRight: "40px" }}>
        <h3 style={{ marginBottom: "5px" }}>About</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "14px",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
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

      {currentUser.type === "shark" && (
        <div style={{ paddingLeft: "40px", paddingRight: "40px" }}>
          <h3>Shark Stats</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "200px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "25%",
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "25%",
                  height: "100%",
                  borderWidth: "0.5px",
                  borderColor: "grey",
                  borderStyle: "solid", // Add this line
                  color: "#256AE5",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                {currentUser.smallBusiness}
              </div>
              <div style={{ fontSize: "14px" }}>Small Business Helped</div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  fontSize: "14px",
                  color: "black",
                  marginBottom: "5px",
                  marginTop: "10px",
                }}
              >
                Based on previous investments, I like...
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                {(currentUser.interestingCategories || []).map(
                  (company, index) => (
                    <div
                      key={index}
                      style={{
                        margin: "5px 0",
                        fontSize: "12px",
                        color: "#256AE5",
                        border: "solid",
                        borderWidth: "0.5px",
                        borderColor: "grey",
                        padding: "5px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        marginRight: "5px",
                        borderRadius: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {company}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
