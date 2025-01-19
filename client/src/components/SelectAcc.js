import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./style/SelectAcc.css";


const SelectAcc = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  const handleAccountType = (accountType) => {
    navigate('/login', { state: { accountType } });
  };

  return (
    <div id="selectAccDiv">
      <h1>Sign-Up</h1>
      
      <p>Choose an account type below:</p>
      <br></br><br></br><br></br><br></br><br></br>
      <button className="selectAccBtn" id="PitcherBtn" onClick={() => handleAccountType('pitcher')}>
        Pitcher
      </button><br></br>
      <button className="selectAccBtn" id="SharkBtn" onClick={() => handleAccountType('shark')}>
        Shark
      </button>
    </div>
  );
};

export default SelectAcc;