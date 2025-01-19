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
        backgroundColor: "Black",
        borderRadius: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        <Link to="/">
          <HomeIcon width="24" height="24" fill="white" />
        </Link>
        <Link to="/explore">
          <ExploreIcon width="24" height="24" fill="white" />
        </Link>
        <Link to="/inbox">
          <InboxIcon width="24" height="24" fill="white" />
        </Link>
        <Link to="/profile">
          <ProfileIcon width="24" height="24" fill="white" />
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
