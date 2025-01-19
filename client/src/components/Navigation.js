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
      {/* Home Icon */}
      <Link to="/">
        <HomeIcon width="24" height="24" fill="white" />
      </Link>

      {/* Explore Icon for Sharks */}
      {currentUser && currentUser.type === "shark" && (
        <Link to="/shark">
          <ExploreIcon width="24" height="24" fill="white" />
        </Link>
      )}

      {/* Explore Icon for Pitchers */}
      {currentUser && currentUser.type === "pitcher" && (
        <Link to="/pitcher">
          <ExploreIcon width="24" height="24" fill="white" />
        </Link>
      )}

      {/* Messages Icon */}
      {currentUser && (
        <Link to="/messages">
          <InboxIcon width="24" height="24" fill="white" />
        </Link>
      )}

      {/* Profile Icon */}
      {currentUser && (
        <Link to="/profile">
          <ProfileIcon width="24" height="24" fill="white" />
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
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navigation;