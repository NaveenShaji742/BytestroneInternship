import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username,
        password,
      });

      if (response?.data === 'PM' || response?.data === 'SA') {
        setMessage('Login successful!');
        setIsLoggedIn(true);
        navigate('/home');
      } else {
        setMessage('Invalid UserName or password');
      }
    } catch (error) {
      if (error.response?.data) {
        setMessage(error.response.data.message || 'Login failed: Invalid credentials');
      } else if (error.request) {
        setMessage('No response from server. Please try again later.');
      } else {
        setMessage('An error occurred: ' + error.message);
      }
    }
  };

  const styles = {
    container: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#E6E6FA', // Lavender shade
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      width: '450px', // Increased width
      padding: '35px', // More padding for better spacing
      borderRadius: '12px',
      backgroundColor: '#ffffff', // White background
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)', // Smooth shadow effect
    },
    inputContainer: {
      marginBottom: '20px',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      fontSize: '18px', // Larger font for better readability
      color: '#4B0082', // Dark lavender
    },
    input: {
      width: '100%',
      padding: '12px',
      marginTop: '6px',
      borderRadius: '8px',
      border: '1px solid #9370DB', // Medium lavender border
      backgroundColor: '#F8F8FF', // Light lavender background
      fontSize: '16px',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#9370DB', // Medium lavender shade
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold',
      transition: '0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#6A5ACD', // Darker lavender on hover
    },
    message: {
      marginTop: '18px',
      fontWeight: 'bold',
      fontSize: '16px',
      color: 'red',
    },
    heading: {
      color: '#4B0082', // Dark lavender heading
      fontSize: '22px', // Bigger heading
      marginBottom: '20px',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.heading}>Bytestrone Project Management</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Enter your username"
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Login
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

export default Login;