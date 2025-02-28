import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) { // Accept setIsLoggedIn as a prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous message
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username,
        password,
      });
      // Check if response and response.data exist
      if (response && response.data === 'PM') {
        setMessage('Login successful!');
        setIsLoggedIn(true); // Update login state
        navigate('/home'); // Navigate to home page
      } else {
        setMessage('No data returned from server');
      }
      if (response && response.data === 'SA') {
        setMessage('Login successful!');
        setIsLoggedIn(true); // Update login state
        navigate('/home'); // Navigate to home page
      } else {
        setMessage('No data returned from server');
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.response && error.response.data) {
        setMessage(
          error.response.data.message || 'Login failed: Invalid credentials'
        );
      } else if (error.request) {
        setMessage('No response from server. Please try again later.');
      } else {
        setMessage('An error occurred: ' + error.message);
      }
    }
  };

  return (
    <div className="App">
      <h1>Bytestrone Project Management System</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;