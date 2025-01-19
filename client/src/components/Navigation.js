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
        bottom: "20px", // Position at the bottom of the page with some margin
        left: "50%", // Center horizontally
        transform: "translateX(-50%)", // Center alignment correction
        zIndex: "1000",
        backgroundColor: "black",
        borderRadius: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional shadow for better visibility
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
          backgroundColor: "transparent",
        }}
      >
        <Link
          id="home"
          to="/home"
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
        <Link
          id="dashboard"
          to="/dashboard"
          onClick={() => handleLinkClick("dashboard")}
          style={{
            backgroundColor:
              activeLink === "dashboard" ? "grey" : "transparent",
            borderRadius: "50%",
            padding: "10px",
            display: "inline-block",
            width: "30px",
          }}
        >
          <ExploreIcon
            width="24"
            height="24"
            fill={activeLink === "dashboard" ? "black" : "white"}
          />
        </Link>
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
      </div>
    </nav>
  );
};

export default Navigation;