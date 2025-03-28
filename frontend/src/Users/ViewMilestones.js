import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewMilestones() {
  const { projectID } = useParams();
  const navigate = useNavigate();
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!projectID) {
      setError("Invalid project ID");
      setLoading(false);
      return;
    }
    loadMilestones();
  }, [projectID]);

  const loadMilestones = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/milestones/project/${projectID}`);
      setMilestones(result.data || []);
    } catch (error) {
      setError("Failed to load milestones. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (milestoneID) => {
    navigate(`/edit-milestone/${milestoneID}`);
  };

  const handleDelete = async (milestoneID) => {
    console.log("Deleting milestone with ID:", milestoneID);
    if (window.confirm("Are you sure you want to delete this milestone?")) {
      try {
        await axios.delete(`http://localhost:8080/milestones/delete/${milestoneID}`);
        console.log("Milestone deleted successfully");
        setMilestones(milestones.filter((m) => m.milestoneID !== milestoneID));
      } catch (error) {
        console.error("Error deleting milestone:", error);
        alert("Failed to delete milestone. Please try again.");
      }
    }
  };

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "auto",
      padding: "20px",
      background: "#dedcdb",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#2c3e50",
    },
    message: {
      textAlign: "center",
      fontSize: "18px",
      color: "#555",
      marginTop: "20px",
    },
    listContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px",
    },
    card: {
      width: "300px",
      border: "1px solid #555555",
      borderRadius: "10px",
      padding: "15px",
      background: "#823d76",
      color: "#efeaea",
      boxShadow: "0px 4px 8px rgba(155, 86, 86, 0.1)",
      transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#efeaea",
    },
    paragraph: {
      fontSize: "14px",
      color: "#f2dce9",
      margin: "5px 0",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
    },
    btn: {
      backgroundColor: "rgb(209, 80, 176)", // Same color for edit & delete buttons
      color: "#ffffff",
      fontWeight: "bold",
      border: "none",
      padding: "10px 15px",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100px", // Increased button length
    },
    deleteBtn: {
      backgroundColor: "rgb(209, 80, 176)", // Same color as edit button
    },
  };

  if (loading) return <h2 style={styles.message}>Loading milestones...</h2>;
  if (error) return <h2 style={styles.message}>{error}</h2>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Milestones for ProjectID {projectID}</h2>
      <div style={styles.listContainer}>
        {milestones.length > 0 ? (
          milestones.map((milestone) => (
            <div key={milestone.milestoneID} style={styles.card}>
              <h6 style={styles.cardTitle}>{milestone.featureDescription || "No Description"}</h6>
              <p style={styles.paragraph}><strong>Start Date:</strong> {milestone.startDate ? new Date(milestone.startDate).toLocaleDateString() : "N/A"}</p>
              <p style={styles.paragraph}><strong>Target Date:</strong> {milestone.targetDate ? new Date(milestone.targetDate).toLocaleDateString() : "N/A"}</p>
              <p style={styles.paragraph}><strong>Status:</strong> {milestone.currentStatus || "N/A"}</p>
              <p style={styles.paragraph}><strong>SoW ID:</strong> {milestone.soWID || "N/A"}</p>
              <p style={styles.paragraph}><strong>Task ID:</strong> {milestone.taskID || "N/A"}</p>
              <div style={styles.buttonContainer}>
                <button style={styles.btn} onClick={() => handleEdit(milestone.milestoneID)}>Edit</button>
                <button style={{ ...styles.btn, ...styles.deleteBtn }} onClick={() => handleDelete(milestone.milestoneID)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.message}>No milestones available for this project.</p>
        )}
      </div>
    </div>
  );
}