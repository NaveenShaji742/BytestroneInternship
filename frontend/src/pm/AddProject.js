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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Project</h2>
  
      {error && <p className="text-red-600 font-semibold mb-4 text-center">{error}</p>}
  
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Client Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={project.clientName}
            onChange={onInputChange}
            placeholder="Enter client name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={project.projectName}
            onChange={onInputChange}
            placeholder="Enter project name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={onInputChange}
            placeholder="Enter description"
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        {/* Engineering Manager */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Engineering Manager</label>
          <input
            type="text"
            name="engineeringManager"
            value={project.engineeringManager}
            onChange={onInputChange}
            placeholder="Enter engineering manager"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={project.startDate}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={project.endDate}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
          <input
            type="number"
            name="budget"
            value={project.budget}
            onChange={onInputChange}
            placeholder="Enter budget"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        {/* Scope */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Scope</label>
          <textarea
            name="scope"
            value={project.scope}
            onChange={onInputChange}
            placeholder="Enter scope"
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        {/* Contract Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
          <input
            type="text"
            name="contractTypeName"
            value={project.contractTypeName}
            onChange={onInputChange}
            placeholder="Enter contract type"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        {/* Phase */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
          <select
            name="phaseName"
            value={project.phaseName}
            onChange={onInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Phase</option>
            <option value="INITIAL_PHASE">Initial Phase</option>
            <option value="DEVELOPING">Developing</option>
            <option value="TESTING">Testing</option>
            <option value="DEPLOYING">Deploying</option>
          </select>
        </div>
  
        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}