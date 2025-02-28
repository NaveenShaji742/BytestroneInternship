import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure styling is updated

export default function Navbar() {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Addproject" className="add-project-btn">Add Project</Link>
        </li>
      </ul>
    </div>
  );
}
