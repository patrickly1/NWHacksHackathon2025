import React, { useState } from 'react';
import "./style/LoginPage.css";


const LoginPage = ({ setCurrentUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('shark'); // default
  const [isRegister, setIsRegister] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      // Sign up
      try {
        const response = await fetch('http://localhost:5002/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, type }),
        });
        const data = await response.json();
        if (response.ok) {
          setCurrentUser(data.user);
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // Login
      try {
        const response = await fetch('http://localhost:5002/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          setCurrentUser(data.user);
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{isRegister ? 'Sign-up' : 'Log-in'}</h1>
      <p>{isRegister ? 'Enter your information.' : 'Log-in'}</p>
      

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        {isRegister && (
          <>
            <div className='formDiv'>
              <label>Name: </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* <div>
              <label>Account Type: </label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="shark">Shark</option>
                <option value="pitcher">Pitcher</option>
              </select>
            </div> */}
          </>
        )}

        <div className='formDiv'>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='formDiv'>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>
          {isRegister ? 'Sign Up' : 'Log In'}
        </button>
      </form>

<br></br>
      <div>
        <p>{isRegister ? 'Already have an account?' : 'Need an account?'}</p>
        <a onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Log in' : 'Sign up'}
        </a>
      </div>


    </div>
  );
};

export default LoginPage;