// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import "./style/SelectAcc.css";


// const SelectAcc = ({ setCurrentUser }) => {
//   const navigate = useNavigate();

//   const handleAccountType = (accountType) => {
//     navigate('/login', { state: { accountType } });
//   };

//   return (
//     <div id="selectAccDiv">
//       <h1>Sign-Up</h1>
      
//       <p>Choose an account type below:</p>
//       <br></br><br></br><br></br><br></br><br></br>
//       <button className="selectAccBtn" id="PitcherBtn" onClick={() => handleAccountType('pitcher')}>
//         Pitcher
//       </button><br></br>
//       <button className="selectAccBtn" id="SharkBtn" onClick={() => handleAccountType('shark')}>
//         Funder
//       </button>
//     </div>
//   );
// };

// export default SelectAcc;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/SelectAcc.css";
import logo from "../assets/LOGO.svg";

const SelectAcc = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  const handleAccountType = (accountType) => {
    navigate("/login", { state: { accountType } });
  };

  return (
    <div id="selectAccDiv">
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <h1
          style={{
            display: "flex",
            width: "100%",
            fontWeight: "bold",
            padding: "0px",
            margin: "0px",
          }}
        >
          Sign-Up
        </h1>
        <p style={{ padding: "0px" }}>Choose an account type below:</p>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <button
        className="selectAccBtn"
        id="PitcherBtn"
        onClick={() => handleAccountType("pitcher")}
        style={{
          width: "200px",
          height: "100px",
          backgroundColor: "#F6F6F6",
          borderColor: "#256AE5",
        }}
      >
        Funder
      </button>
      <br></br>
      <button
        className="selectAccBtn"
        id="SharkBtn"
        onClick={() => handleAccountType("shark")}
        style={{
          width: "200px",
          height: "100px",
          backgroundColor: "#F6F6F6",
          borderColor: "#256AE5",
        }}
      >
        Pitcher
      </button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>


      <img src={logo}></img>
    </div>
  );
};

export default SelectAcc;
