import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ExploreIcon } from "../assets/Icons/ExploreIcon.svg";
import { ReactComponent as HomeIcon } from "../assets/Icons/HomeIcon.svg";
import { ReactComponent as InboxIcon } from "../assets/Icons/InboxIcon.svg";
import { ReactComponent as ProfileIcon } from "../assets/Icons/ProfileIcon.svg";

const Navigation = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <nav
      style={{
        height: "60px",
        width: "300px",
        position: "fixed",
        zIndex: "1000",
        backgroundColor: "black",
        borderRadius: "100px",
        display: "flex",
        alignItems: "center",
        padding: "0 40px",
        justifyContent: "space-between",
      }}
    >
      {/* General Navigation Icons */}
      <Link to="/">
        <HomeIcon width="24" height="24" fill="white" />
      </Link>
      <Link to="/shark">
        <ExploreIcon width="24" height="24" fill="white" />
      </Link>
      <Link to="/messages">
        <InboxIcon width="24" height="24" fill="white" />
      </Link>
      <Link to="/profile">
        <ProfileIcon width="24" height="24" fill="white" />
      </Link>

      {/* User-Specific Links */}
      <div style={{ marginLeft: "40px", color: "white" }}>
        {currentUser && currentUser.type === "shark" && (
          <>
            <Link to="/shark" style={{ marginLeft: "1rem" }}>
              Shark Dashboard
            </Link>
            <Link to="/messages" style={{ marginLeft: "1rem" }}>
              Messages (Shark)
            </Link>
          </>
        )}
        {currentUser && currentUser.type === "pitcher" && (
          <>
            <Link to="/pitcher" style={{ marginLeft: "1rem" }}>
              Pitcher Dashboard
            </Link>
            <Link to="/messages" style={{ marginLeft: "1rem" }}>
              Messages (Pitcher)
            </Link>
          </>
        )}
        {currentUser && (
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "1rem",
              backgroundColor: "white",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
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