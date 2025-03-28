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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      // Reset form fields after successful submission
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

  return (
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
          input, textarea {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
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
        `}
      </style>

      <h2>Add Milestone</h2>
      {message && <p className={message.type}>{message.text}</p>}

      <form onSubmit={handleSubmit}>
        <input type="number" name="projectID" placeholder="Project ID" value={formData.projectID} onChange={handleChange} required />
        <input type="number" name="soWID" placeholder="SoW ID" value={formData.soWID} onChange={handleChange} required />
        <input type="number" name="taskID" placeholder="Task ID" value={formData.taskID} onChange={handleChange} required />
        <textarea name="featureDescription" placeholder="Feature Description" value={formData.featureDescription} onChange={handleChange} required />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        <input type="date" name="targetDate" value={formData.targetDate} onChange={handleChange} required />
        <input type="text" name="currentStatus" placeholder="Current Status" value={formData.currentStatus} onChange={handleChange} required />
        <input type="text" name="currentPhaseID" placeholder="Current PhaseID" value={formData.currentPhaseID} onChange={handleChange} required />

        <button type="submit">Add Milestone</button>
      </form>
    </div>
  );
};

export default MilestoneForm;
