import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMilestones = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectID: "",
    soWID: "",
    taskID: "",
    featureDescription: "",
    startDate: "",
    targetDate: "",
    currentStatus: "",
    currentPhase: {
      id: "",
      phaseName: "",
    },
  });

  const [message, setMessage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [phases, setPhases] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:8080/project");
        const activeProjects = res.data.filter((p) => p.status === "ACTIVE");
        setProjects(activeProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    const fetchPhases = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/phases");
        setPhases(res.data);
      } catch (err) {
        console.error("Error fetching phases:", err);
      }
    };

    fetchProjects();
    fetchPhases();
  }, []);

  const handleChange = (e) => {
    // Special handling for currentPhase select, because it is an object in state
    if (e.target.name === "currentPhase") {
      // Find selected phase object by id
      const selectedPhase = phases.find((p) => p.id.toString() === e.target.value);
      setFormData({ ...formData, currentPhase: selectedPhase || { id: "", phaseName: "" } });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleStatusSelect = (status) => {
    setFormData({ ...formData, currentStatus: status });
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const validateForm = async () => {
    const requiredFields = [
      { key: "projectID", label: "Project ID" },
      { key: "soWID", label: "SoW ID" },
      { key: "taskID", label: "Task ID" },
      { key: "featureDescription", label: "Feature Description" },
      { key: "startDate", label: "Start Date" },
      { key: "targetDate", label: "Target Date" },
      { key: "currentStatus", label: "Current Status" },
    ];

    for (let { key, label } of requiredFields) {
      if (!formData[key]) {
        setMessage({ type: "error", text: `${label} is required.` });
        return false;
      }
    }

    if (!formData.currentPhase.id) {
      setMessage({ type: "error", text: "Current Phase is required." });
      return false;
    }

    // Validate no duplicate SoW ID or Task ID within the same project
    try {
      const response = await axios.get(`http://localhost:8080/milestones/project/${formData.projectID}`);
      const milestones = response.data || [];

      if (milestones.some((m) => m.soWID === parseInt(formData.soWID))) {
        setMessage({ type: "error", text: "SoW ID already exists for this project." });
        return false;
      }
      if (milestones.some((m) => m.taskID === parseInt(formData.taskID))) {
        setMessage({ type: "error", text: "Task ID already exists for this project." });
        return false;
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to validate SoW ID and Task ID." });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!(await validateForm())) return;

    try {
      const payload = {
        soWID: parseInt(formData.soWID),
        taskID: parseInt(formData.taskID),
        featureDescription: formData.featureDescription,
        startDate: formData.startDate,
        targetDate: formData.targetDate,
        currentStatus: formData.currentStatus,
        currentPhase: parseInt(formData.currentPhase.id),
      };

      await axios.post(`http://localhost:8080/milestones/add/${formData.projectID}`, payload);
      setMessage({ type: "success", text: "Milestone added successfully!" });

      setFormData({
        projectID: "",
        soWID: "",
        taskID: "",
        featureDescription: "",
        startDate: "",
        targetDate: "",
        currentStatus: "",
        currentPhase: {
          id: "",
          phaseName: "",
        },
      });

      // Redirect to ViewMilestones after success
      setTimeout(() => {
        navigate(`/view-milestones`);
      }, 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to add milestone.";
      setMessage({ type: "error", text: errorMsg });
    }
  };

  const handleCancel = () => {
    navigate("/view-milestones");
  };

  const statusOptions = [
    { value: "Completed", color: "#00FF00" },
    { value: "Ongoing", color: "#FFA500" },
    { value: "At Risk", color: "#FF0000" },
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Milestone</h2>

      {message && (
        <p
          className={`mb-4 text-center font-semibold ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Dropdown */}
        <select
          name="projectID"
          value={formData.projectID}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value=""> Select Project </option>
          {projects.map((project) => (
            <option key={project.projectID} value={project.projectID}>
              {project.projectName} (ID: {project.projectID})
            </option>
          ))}
        </select>

        <input
          type="number"
          name="soWID"
          placeholder="SoW ID"
          value={formData.soWID}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          name="taskID"
          placeholder="Task ID"
          value={formData.taskID}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="featureDescription"
          placeholder="Feature Description"
          value={formData.featureDescription}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded resize-none"
        />

        {/* Dates */}
        <label className="block text-left font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        <label className="block text-left font-medium text-gray-700">Target Date</label>
        <input
          type="date"
          name="targetDate"
          value={formData.targetDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        {/* Status Dropdown */}
        <div className="relative">
          <div
            className="w-full px-4 py-2 border rounded cursor-pointer bg-white flex justify-between items-center"
            onClick={toggleDropdown}
          >
            {formData.currentStatus ? (
              <div className="flex items-center">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{
                    backgroundColor: statusOptions.find(
                      (opt) => opt.value === formData.currentStatus
                    )?.color,
                  }}
                ></span>
                {formData.currentStatus}
              </div>
            ) : (
              "Select Status"
            )}
            <span className="text-sm">▼</span>
          </div>

          {isDropdownOpen && (
            <div className="absolute w-full border rounded mt-1 bg-white z-10 shadow">
              {statusOptions.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                  onClick={() => handleStatusSelect(option.value)}
                >
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: option.color }}
                  ></span>
                  {option.value}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phase Dropdown */}
        <select
          name="currentPhase"
          value={formData.currentPhase.id || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Phase </option>
          {phases.map((phase) => (
            <option key={phase.id} value={phase.id}>
              {phase.phaseName} (ID: {phase.id})
            </option>
          ))}
        </select>

        {/* Buttons */}
        <div className="flex justify-between space-x-4 mt-4">
          <button
            type="submit"
            className="flex-1 bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800"
          >
            Add Milestone
          </button>

          <button
            type="button"
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMilestones;