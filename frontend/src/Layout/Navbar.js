import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(currentProjectID) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo Added */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/images/logo.jpg" alt="Logo" style={{ height: "40px", marginRight: "10px" }} />
          Project Management System 
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">🏠 Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AddProject">📊 Project</Link>
            </li>
      
            <li className="nav-item">
              <Link className="nav-link" to="/phases">📊 Phase</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/projects/${currentProjectID}/add-milestone`}>📊 Milestone </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/milestone-phases">📊 Milestone Phase</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contract-types">📜 Contract Type</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login">⏻ Log out</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
