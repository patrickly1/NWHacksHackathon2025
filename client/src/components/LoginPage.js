import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/LoginPage.css";
import logo from "../assets/LOGO.svg";

const LoginPage = ({ setCurrentUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("shark"); // default
  const [isRegister, setIsRegister] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      // Sign up
      try {
        const response = await fetch("http://localhost:5002/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, type }),
        });
        const data = await response.json();
        if (response.ok) {
          setCurrentUser(data.user);
          setShowNavbar(true);
          navigate("/shark");
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // Login
      try {
        const response = await fetch("http://localhost:5002/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          setCurrentUser(data.user);
          setShowNavbar(true);
          navigate("/shark");
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h1>{isRegister ? "Sign-up" : "Log-in"}</h1>
      <p>{isRegister ? "Enter your information." : "Log-in"}</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        {isRegister && (
          <>
            <div className="formDiv">
              <label>Name: </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
          </>
        )}

        <div className="formDiv">
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div className="formDiv">
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          {isRegister ? "Sign Up" : "Log In"}
        </button>
      </form>

      <br></br>
      <div>
        <p>{isRegister ? "Already have an account?" : "Need an account?"}</p>
        <a onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Log in" : "Sign up"}
        </a>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <img src={logo}></img>
      </div>
    </div>
  );
};

export default LoginPage;
