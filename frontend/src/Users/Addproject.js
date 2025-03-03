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
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Project</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="clientName" className="form-label">
                Client Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter client name"
                name="clientName"
                value={project.clientName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="projectName" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter project name"
                name="projectName"
                value={project.projectName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                placeholder="Enter description"
                name="description"
                value={project.description}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="engineeringManager" className="form-label">
                Engineering Manager
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter engineering manager"
                name="engineeringManager"
                value={project.engineeringManager}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={project.startDate}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">
                End Date
              </label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={project.endDate}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="budget" className="form-label">
                Budget
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter budget"
                name="budget"
                value={project.budget}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="scope" className="form-label">
                Scope
              </label>
              <textarea
                className="form-control"
                placeholder="Enter scope"
                name="scope"
                value={project.scope}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contractTypeName" className="form-label">
                Contract Type
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter contract type"
                name="contractTypeName"
                value={project.contractTypeName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phaseName" className="form-label">
                Phase
              </label>
              <select
                className="form-control"
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
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-outline-danger mx-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}