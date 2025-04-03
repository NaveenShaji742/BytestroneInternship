import React, { useState, useEffect } from "react";
import { getPhases, addPhase, updatePhase, deletePhase } from "../Api/phaseApi";

const PhaseManagement = () => {
  const [phases, setPhases] = useState([]);
  const [phaseData, setPhaseData] = useState({ name: "", description: "", status: "ACTIVE" });

  useEffect(() => {
    loadPhases();
  }, []);

  const loadPhases = async () => {
    const response = await getPhases();
    setPhases(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phaseData.name.trim()) {
      alert("Phase Name is required!");
      return;
    }
    try {
      if (phaseData.id) {
        await updatePhase(phaseData.id, phaseData);
      } else {
        await addPhase(phaseData);
      }
      setPhaseData({ name: "", description: "", status: "ACTIVE" });
      loadPhases();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong!"));
    }
  };

  const handleEdit = (phase) => {
    setPhaseData(phase);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this phase?")) {
      await deletePhase(id);
      loadPhases();
    }
  };

  return (
    <div 
      className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center" 
      style={{ 
        backgroundImage: "url('/images/background.png')", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <h2 className="text-center text-white mb-4">📊 Phase Management</h2>

      <div className="card mx-auto shadow-sm p-4" style={{ maxWidth: "500px", background: "rgba(255, 255, 255, 0.8)", borderRadius: "10px" }}>
        <h5 className="text-center">{phaseData.id ? "Edit Phase" : "Add New Phase"}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Phase Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Phase Name"
              required
              value={phaseData.name}
              onChange={(e) => setPhaseData({ ...phaseData, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter Description"
              value={phaseData.description}
              onChange={(e) => setPhaseData({ ...phaseData, description: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={phaseData.status}
              onChange={(e) => setPhaseData({ ...phaseData, status: e.target.value })}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="BLOCKED">Blocked</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="READY_FOR_DEMO">Ready for Demo</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {phaseData.id ? "Update Phase" : "Add Phase"}
          </button>
        </form>
      </div>

      <div className="mt-5">
        <h4 className="mb-3 text-white">📋 Phase List</h4>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>Phase Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {phases.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-muted">No phases available.</td>
                </tr>
              ) : (
                phases.map((phase, index) => (
                  <tr key={phase.id}>
                    <td>{index + 1}</td>
                    <td>{phase.name}</td>
                    <td>{phase.description}</td>
                    <td>
                      <span className={`badge ${phase.status === "ACTIVE" ? "bg-success" : "bg-secondary"}`}>
                        {phase.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(phase)} className="btn btn-sm btn-warning me-2">✏ Edit</button>
                      <button onClick={() => handleDelete(phase.id)} className="btn btn-sm btn-danger">🗑 Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PhaseManagement;
