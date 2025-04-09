import React, { useState } from "react";
import axios from "axios";

const MilestoneForm = () => {
  const [formData, setFormData] = useState({
    projectID: "",
    soWID: "",
    taskID: "",
    featureDescription: "",
    startDate: "",
    targetDate: "",
    currentStatus: "",
    currentPhaseID: "",
  });

  const [message, setMessage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusSelect = (status) => {
    setFormData({ ...formData, currentStatus: status });
    setIsDropdownOpen(false);
    console.log("Selected status:", status);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => {
      console.log("Toggling dropdown, new state:", !prev);
      return !prev;
    });
  };

  const validateForm = () => {
    const requiredFields = ["projectID", "soWID", "taskID", "featureDescription", "startDate", "targetDate", "currentStatus", "currentPhaseID"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setMessage({ type: "error", text: `${field} is required.` });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(`http://localhost:8080/milestones/add/${formData.projectID}`, formData);
      setMessage({ type: "success", text: "Milestone added successfully!" });

      setFormData({
        projectID: "",
        soWID: "",
        taskID: "",
        featureDescription: "",
        startDate: "",
        targetDate: "",
        currentStatus: "",
        currentPhaseID: "",
      });
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to add milestone. Please try again.";
      setMessage({ type: "error", text: errorMsg });
    }
  };

  const statusOptions = [
    { value: "Green", color: "#00FF00" },
    { value: "Amber", color: "#FFA500" },
    { value: "Red", color: "#FF0000" },
  ];

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
            input, textarea {
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
            /* Custom Dropdown Styles */
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

        <h2>Add Milestone</h2>
        {message && <p className={message.type}>{message.text}</p>}

        <form onSubmit={handleSubmit}>
          <input type="number" name="projectID" placeholder="Project ID" value={formData.projectID} onChange={handleChange} required />
          <input type="number" name="soWID" placeholder="SoW ID" value={formData.soWID} onChange={handleChange} required />
          <input type="number" name="taskID" placeholder="Task ID" value={formData.taskID} onChange={handleChange} required />
          <textarea name="featureDescription" placeholder="Feature Description" value={formData.featureDescription} onChange={handleChange} required />

          <label htmlFor="startDate">Start Date</label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />

          <label htmlFor="targetDate">Target Date</label>
          <input type="date" id="targetDate" name="targetDate" value={formData.targetDate} onChange={handleChange} required />

          <div className="dropdown-container">
            <div className="dropdown-button" onClick={toggleDropdown}>
              {formData.currentStatus ? (
                <>
                  <span className="color-dot" style={{ backgroundColor: statusOptions.find(opt => opt.value === formData.currentStatus)?.color }}></span>
                  {formData.currentStatus}
                </>
              ) : (
                "Select Status"
              )}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {statusOptions.map((option) => (
                  <div
                    key={option.value}
                    className="dropdown-item"
                    onClick={() => handleStatusSelect(option.value)}
                  >
                    <span className="color-dot" style={{ backgroundColor: option.color }}></span>
                    {option.value}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input type="text" name="currentPhaseID" placeholder="Current PhaseID" value={formData.currentPhaseID} onChange={handleChange} required />
          <button type="submit">Add Milestone</button>
        </form>
      </div>
    </div>
  );
};

export default MilestoneForm;