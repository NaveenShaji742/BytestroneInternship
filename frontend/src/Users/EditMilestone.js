import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
 
const EditMilestoneForm = () => {
  const { milestoneID } = useParams(); // Use 'milestoneID' as per App.js route
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    project: {
      projectID:""
    },
    soWID: "",
    taskID: "",
    featureDescription: "",
    startDate: "",
    targetDate: "",
    currentStatus: "",
    currentPhaseID: "",
  });
 
  const [message, setMessage] = useState(null); 
 
  useEffect(() => {
    const fetchMilestone = async () => {
      console.log("milestoneID:", milestoneID); // Debug
      try {
        const response = await axios.get(`http://localhost:8080/milestones/${milestoneID}`);
        setFormData(response.data);
      } catch (error) {
        const errorMsg = error.response?.data?.message || "Failed to fetch milestone.";
        setMessage({ type: "error", text: errorMsg });
      }
    };
  
    fetchMilestone();
  }, [milestoneID]);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const validateForm = () => {
    const requiredFields = ["soWID", "taskID", "featureDescription", "startDate", "targetDate", "currentStatus", "currentPhaseID"];
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
      await axios.put(`http://localhost:8080/milestones/update/${milestoneID}`, formData);
      setMessage({ type: "success", text: "Milestone updated successfully!" });
      // setTimeout(() => {
      //   navigate(`projects/${projectID}/view-milestones`); // Navigate to milestone list page
      // }, 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to update milestone.";
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
            box-shadow: 0px 4px 8px rgba(254, 254, 254, 0.1);
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
            background: rgb(94, 140, 152);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            cursor: pointer;
          }
          button:hover {
            background: rgb(84, 135, 152);
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
 
      <h2>Edit Milestone</h2>
      {message && <p className={message.type}>{message.text}</p>}
 
      <form onSubmit={handleSubmit}>
        <input type="number" name="projectID" placeholder="Project ID" value={formData.project.projectID} onChange={handleChange} required />
        <input type="number" name="soWID" placeholder="SoW ID" value={formData.soWID} onChange={handleChange} required />
        <input type="number" name="taskID" placeholder="Task ID" value={formData.taskID} onChange={handleChange} required />
        <textarea name="featureDescription" placeholder="Feature Description" value={formData.featureDescription} onChange={handleChange} required />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        <input type="date" name="targetDate" value={formData.targetDate} onChange={handleChange} required />
        <input type="text" name="currentStatus" placeholder="Current Status" value={formData.currentStatus} onChange={handleChange} required />
        <input type="text" name="currentPhaseID" placeholder="Current PhaseID" value={formData.currentPhaseID} onChange={handleChange} required />
        <button type="submit">Update Milestone</button>
      </form>
    </div>
  );
};
 
export default EditMilestoneForm;
 
 