import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProject() {
  let navigate = useNavigate();

  const [project, setProject] = useState({
    clientName: "",
    projectName: "",
    description: "",
    engineeringManager: "",
    startDate: "",
    endDate: "",
    budget: "",
    scope: "",
    contractTypeName: "",
    phaseName: ""
  });

  const [error, setError] = useState("");

  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if endDate is after startDate
    if (new Date(project.endDate) <= new Date(project.startDate)) {
      setError("End Date must be after Start Date.");
      return;
    }

    // Check if all fields are filled
    if (
      !project.clientName ||
      !project.projectName ||
      !project.description ||
      !project.engineeringManager ||
      !project.startDate ||
      !project.endDate ||
      !project.budget ||
      !project.scope ||
      !project.contractTypeName ||
      !project.phaseName
    ) {
      setError("Please fill out all fields before submitting.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/project", project);
      navigate("/");
    } catch (error) {
      console.error("There was an error submitting the project!", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="container">
        <style>
          {`
            .container {
              max-width: 500px;
              margin: 50px auto;
              padding: 20px;
              background: #f9f9f9;
              border-radius: 10px;
              box-shadow: 0px 4px 8px rgba(122, 129, 131, 0.1);
              text-align: center;
            }
            h2 {
              color: #333;
              margin-bottom: 20px;
            }
            label {
              display: block;
              text-align: left;
              font-size: 14px;
              color: #333;
              margin-bottom: 5px;
            }
            input, textarea, select {
              width: 100%;
              padding: 10px;
              margin: 5px 0 10px 0;
              border: 1px solid #ccc;
              border-radius: 5px;
              font-size: 16px;
            }
            textarea {
              height: 80px;
              resize: none;
            }
            button {
              width: 100%;
              padding: 12px;
              background: rgb(152, 94, 140);
              color: white;
              border: none;
              border-radius: 5px;
              font-size: 18px;
              cursor: pointer;
              margin: 5px 0;
            }
            button:hover {
              background: rgb(152, 84, 135);
            }
            .success {
              color: green;
              font-weight: bold;
            }
            .error {
              color: red;
              font-weight: bold;
            }
            /* Custom Dropdown Styles (not used here but included for consistency) */
            .dropdown-container {
              position: relative;
              width: 100%;
              margin: 10px 0;
            }
            .dropdown-button {
              width: 100%;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              font-size: 16px;
              text-align: left;
              background: white;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .dropdown-button::after {
              content: '▼';
              font-size: 12px;
            }
            .dropdown-menu {
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              border: 1px solid #ccc;
              border-radius: 5px;
              background: white;
              z-index: 1000;
              box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
              display: block;
            }
            .dropdown-item {
              padding: 10px;
              cursor: pointer;
              display: flex;
              align-items: center;
            }
            .dropdown-item:hover {
              background: #f0f0f0;
            }
            .color-dot {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              margin-right: 10px;
              display: inline-block;
            }
          `}
        </style>

        <h2>Add Project</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="clientName">Client Name</label>
            <input
              type="text"
              placeholder="Enter client name"
              name="clientName"
              value={project.clientName}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              placeholder="Enter project name"
              name="projectName"
              value={project.projectName}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              placeholder="Enter description"
              name="description"
              value={project.description}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="engineeringManager">Engineering Manager</label>
            <input
              type="text"
              placeholder="Enter engineering manager"
              name="engineeringManager"
              value={project.engineeringManager}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="budget">Budget</label>
            <input
              type="number"
              placeholder="Enter budget"
              name="budget"
              value={project.budget}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="scope">Scope</label>
            <textarea
              placeholder="Enter scope"
              name="scope"
              value={project.scope}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="contractTypeName">Contract Type</label>
            <input
              type="text"
              placeholder="Enter contract type"
              name="contractTypeName"
              value={project.contractTypeName}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="phaseName">Phase</label>
            <select
              name="phaseName"
              value={project.phaseName}
              onChange={onInputChange}
            >
              <option value="">Select Phase</option>
              <option value="INITIAL_PHASE">Initial Phase</option>
              <option value="DEVELOPING">Developing</option>
              <option value="TESTING">Testing</option>
              <option value="DEPLOYING">Deploying</option>
            </select>
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}