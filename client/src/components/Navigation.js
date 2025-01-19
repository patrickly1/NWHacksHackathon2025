// import React from "react";
// import { Link } from "react-router-dom";
// import { ReactComponent as ExploreIcon } from "../assets/Icons/ExploreIcon.svg";
// import { ReactComponent as HomeIcon } from "../assets/Icons/HomeIcon.svg";
// import { ReactComponent as InboxIcon } from "../assets/Icons/InboxIcon.svg";
// import { ReactComponent as ProfileIcon } from "../assets/Icons/ProfileIcon.svg";

// const Navigation = ({ currentUser, setCurrentUser }) => {
//   const handleLogout = () => {
//     setCurrentUser(null);
//   };

//   return (
//     <nav
//       style={{
//         height: "60px",
//         width: "300px",
//         position: "fixed",
//         zIndex: "1000",
//         backgroundColor: "black",
//         borderRadius: "100px",
//         display: "flex",
//         alignItems: "center",
//         padding: "0 40px",
//         justifyContent: "space-between",
//       }}
//     >
//       {/* Home Icon */}
//       <Link to="/">
//         <HomeIcon width="24" height="24" fill="white" />
//       </Link>

//       {/* Explore Icon for Sharks */}
//       {currentUser && currentUser.type === "shark" && (
//         <Link to="/shark">
//           <ExploreIcon width="24" height="24" fill="white" />
//         </Link>
//       )}

//       {/* Explore Icon for Pitchers */}
//       {currentUser && currentUser.type === "pitcher" && (
//         <Link to="/pitcher">
//           <ExploreIcon width="24" height="24" fill="white" />
//         </Link>
//       )}

//       {/* Messages Icon */}
//       {currentUser && (
//         <Link to="/messages">
//           <InboxIcon width="24" height="24" fill="white" />
//         </Link>
//       )}

//       {/* Profile Icon */}
//       {currentUser && (
//         <Link to="/profile">
//           <ProfileIcon width="24" height="24" fill="white" />
//         </Link>
//       )}

//       {/* Logout Button */}
//       {currentUser && (
//         <button
//           onClick={handleLogout}
//           style={{
//             backgroundColor: "white",
//             color: "black",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Logout
//         </button>
//       )}
//     </nav>
//   );
// };

// export default Navigation;

// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { ReactComponent as ExploreIcon } from "../assets/Icons/ExploreIcon.svg";
// // import { ReactComponent as HomeIcon } from "../assets/Icons/HomeIcon.svg";
// // import { ReactComponent as InboxIcon } from "../assets/Icons/InboxIcon.svg";
// // import { ReactComponent as ProfileIcon } from "../assets/Icons/ProfileIcon.svg";

// // const Navigation = ({ currentUser, setCurrentUser }) => {
// //   const [activeLink, setActiveLink] = useState("");

// //   const handleLogout = () => {
// //     setCurrentUser(null);
// //   };

// //   const handleLinkClick = (linkId) => {
// //     setActiveLink(linkId);
// //   };

// //   return (
// //     <nav
// //       style={{
// //         height: "60px",
// //         width: "300px",
// //         position: "fixed",
// //         bottom: "20px", // Position at the bottom of the page
// //         left: "50%", // Center horizontally
// //         transform: "translateX(-50%)", // Center alignment correction
// //         zIndex: "1000",
// //         backgroundColor: "black",
// //         borderRadius: "100px",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional shadow
// //       }}
// //     >
// //       <div
// //         style={{
// //           display: "flex",
// //           width: "100%",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           paddingLeft: "40px",
// //           paddingRight: "40px",
// //         }}
// //       >
// //         {/* Home Icon */}
// //         <Link
// //           id="home"
// //           to="/"
// //           onClick={() => handleLinkClick("home")}
// //           style={{
// //             backgroundColor: activeLink === "home" ? "grey" : "transparent",
// //             borderRadius: "50%",
// //             padding: "10px",
// //             display: "inline-block",
// //             width: "30px",
// //           }}
// //         >
// //           <HomeIcon
// //             width="24"
// //             height="24"
// //             fill={activeLink === "home" ? "black" : "white"}
// //           />
// //         </Link>

// //         {/* Explore Icon for Sharks */}
// //         {currentUser && currentUser.type === "shark" && (
// //           <Link
// //             id="shark-dashboard"
// //             to="/shark"
// //             onClick={() => handleLinkClick("shark-dashboard")}
// //             style={{
// //               backgroundColor:
// //                 activeLink === "shark-dashboard" ? "grey" : "transparent",
// //               borderRadius: "50%",
// //               padding: "10px",
// //               display: "inline-block",
// //               width: "30px",
// //             }}
// //           >
// //             <ExploreIcon
// //               width="24"
// //               height="24"
// //               fill={
// //                 activeLink === "shark-dashboard" ? "black" : "white"
// //               }
// //             />
// //           </Link>
// //         )}

// //         {/* Explore Icon for Pitchers */}
// //         {currentUser && currentUser.type === "pitcher" && (
// //           <Link
// //             id="pitcher-dashboard"
// //             to="/pitcher"
// //             onClick={() => handleLinkClick("pitcher-dashboard")}
// //             style={{
// //               backgroundColor:
// //                 activeLink === "pitcher-dashboard" ? "grey" : "transparent",
// //               borderRadius: "50%",
// //               padding: "10px",
// //               display: "inline-block",
// //               width: "30px",
// //             }}
// //           >
// //             <ExploreIcon
// //               width="24"
// //               height="24"
// //               fill={
// //                 activeLink === "pitcher-dashboard" ? "black" : "white"
// //               }
// //             />
// //           </Link>
// //         )}

// //         {/* Messages Icon */}
// //         {currentUser && (
// //           <Link
// //             id="messages"
// //             to="/messages"
// //             onClick={() => handleLinkClick("messages")}
// //             style={{
// //               backgroundColor: activeLink === "messages" ? "grey" : "transparent",
// //               borderRadius: "50%",
// //               padding: "10px",
// //               display: "inline-block",
// //               width: "30px",
// //             }}
// //           >
// //             <InboxIcon
// //               width="24"
// //               height="24"
// //               fill={activeLink === "messages" ? "black" : "white"}
// //             />
// //           </Link>
// //         )}

// //         {/* Profile Icon */}
// //         {currentUser && (
// //           <Link
// //             id="profile"
// //             to="/profile"
// //             onClick={() => handleLinkClick("profile")}
// //             style={{
// //               backgroundColor: activeLink === "profile" ? "grey" : "transparent",
// //               borderRadius: "50%",
// //               padding: "10px",
// //               display: "inline-block",
// //               width: "30px",
// //             }}
// //           >
// //             <ProfileIcon
// //               width="24"
// //               height="24"
// //               fill={activeLink === "profile" ? "black" : "white"}
// //             />
// //           </Link>
// //         )}

// //         {/* Logout Button */}
// //         {currentUser && (
// //           <button
// //             onClick={handleLogout}
// //             style={{
// //               backgroundColor: "white",
// //               color: "black",
// //               border: "none",
// //               borderRadius: "5px",
// //               cursor: "pointer",
// //               marginLeft: "1rem",
// //               padding: "5px 10px",
// //             }}
// //           >
// //             Logout
// //           </button>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navigation;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ExploreIcon } from "../assets/Icons/ExploreIcon.svg";
import { ReactComponent as HomeIcon } from "../assets/Icons/HomeIcon.svg";
import { ReactComponent as InboxIcon } from "../assets/Icons/InboxIcon.svg";
import { ReactComponent as ProfileIcon } from "../assets/Icons/ProfileIcon.svg";

const Navigation = ({ currentUser, setCurrentUser }) => {
  const [activeLink, setActiveLink] = useState("");

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
  };

  return (
    <nav
      style={{
        height: "60px",
        width: "300px",
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "1000",
        backgroundColor: "black",
        borderRadius: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
      >
        {/* Home Icon */}
        <Link
          id="home"
          to="/Home"
          onClick={() => handleLinkClick("home")}
          style={{
            backgroundColor: activeLink === "home" ? "grey" : "transparent",
            borderRadius: "50%",
            padding: "10px",
            display: "inline-block",
            width: "30px",
          }}
        >
          <HomeIcon
            width="24"
            height="24"
            fill={activeLink === "home" ? "black" : "white"}
          />
        </Link>

        {/* Explore Icon (Same for Sharks and Pitchers) */}
        <Link
          id="explore"
          to="/shark"
          onClick={() => handleLinkClick("explore")}
          style={{
            backgroundColor: activeLink === "explore" ? "grey" : "transparent",
            borderRadius: "50%",
            padding: "10px",
            display: "inline-block",
            width: "30px",
          }}
        >
          <ExploreIcon
            width="24"
            height="24"
            fill={activeLink === "explore" ? "black" : "white"}
          />
        </Link>

        {/* Messages Icon */}
        {currentUser && (
          <Link
            id="messages"
            to="/messages"
            onClick={() => handleLinkClick("messages")}
            style={{
              backgroundColor: activeLink === "messages" ? "grey" : "transparent",
              borderRadius: "50%",
              padding: "10px",
              display: "inline-block",
              width: "30px",
            }}
          >
            <InboxIcon
              width="24"
              height="24"
              fill={activeLink === "messages" ? "black" : "white"}
            />
          </Link>
        )}

        {/* Profile Icon */}
        {currentUser && (
          <Link
            id="profile"
            to="/profile"
            onClick={() => handleLinkClick("profile")}
            style={{
              backgroundColor: activeLink === "profile" ? "grey" : "transparent",
              borderRadius: "50%",
              padding: "10px",
              display: "inline-block",
              width: "30px",
            }}
          >
            <ProfileIcon
              width="24"
              height="24"
              fill={activeLink === "profile" ? "black" : "white"}
            />
          </Link>
        )}

        {/* Logout Button */}
        {currentUser && (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: "1rem",
              padding: "5px 10px",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;