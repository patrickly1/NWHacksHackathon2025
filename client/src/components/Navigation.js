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
Navbar-Styling
    <nav
      style={{
        height: "60px",
        width: "300px",
        position: "fixed",
        zIndex: "1000",
        backgroundColor: "Black",
        borderRadius: "100px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
      >
        <Link to="/">
          <HomeIcon width="24" height="24" fill="white" />
        </Link>
        <Link to="/shark">
          <ExploreIcon width="24" height="24" fill="white" />
        </Link>
        <Link to="/shark">
          <InboxIcon width="24" height="24" fill="white" />
        </Link>
        <Link to="/shark">
          <ProfileIcon width="24" height="24" fill="white" />
        </Link>
      </div>

      {currentUser && currentUser.type === "shark" && (
        <Link to="/shark" style={{ marginLeft: "1rem" }}>
          Shark Dashboard
        </Link>
      )}
      {currentUser && currentUser.type === "pitcher" && (
        <Link to="/pitcher" style={{ marginLeft: "1rem" }}>
          Pitcher Dashboard
        </Link>
      )}
      {currentUser && (
        <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navigation;
