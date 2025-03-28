import React from 'react';
import { Link} from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ currentProjectID }) {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/">Home </Link>
        </li>
        <li>
          <Link to="/Addproject" className="add-project-btn">Project</Link>
        </li>
        <li>
          <Link to={`/projects/${currentProjectID}/add-milestone`} className="add-project-btn">
            Milestones
          </Link>
        </li>
        <li>
          <Link to="/Login" className="add-project-btn">Logout</Link>
        </li>
      </ul>
    </div>
  );
}
