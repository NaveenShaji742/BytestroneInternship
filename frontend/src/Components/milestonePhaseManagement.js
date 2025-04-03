import React, { useState, useEffect } from "react";
import { getMilestonePhases, addMilestonePhase, updateMilestonePhase, deleteMilestonePhase } from "../Api/milestonePhaseApi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MilestonePhaseManagement = () => {
  const [milestonePhases, setMilestonePhases] = useState([]);
  const [filteredPhases, setFilteredPhases] = useState([]);
  const [search, setSearch] = useState("");
  const [milestoneData, setMilestoneData] = useState({ name: "", description: "", status: "ACTIVE" });

  useEffect(() => {
    loadMilestonePhases();
  }, []);

  const loadMilestonePhases = async () => {
    try {
      const response = await getMilestonePhases();
      setMilestonePhases(response.data);
      setFilteredPhases(response.data);
    } catch (error) {
      console.error("Error fetching milestone phases:", error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    setFilteredPhases(
      milestonePhases.filter((phase) =>
        phase.name.toLowerCase().includes(query)
      )
    );
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Milestone Phase List", 14, 10);

    const tableColumn = ["#", "Milestone Phase Name", "Description", "Status"];
    const tableRows = filteredPhases.map((milestone, index) => [
      index + 1,
      milestone.name,
      milestone.description || "N/A",
      milestone.status,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Milestone_Phase_List.pdf");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!milestoneData.name.trim()) {
      alert("Milestone Phase Name is required!");
      return;
    }
    try {
      if (milestoneData.id) {
        await updateMilestonePhase(milestoneData.id, milestoneData);
      } else {
        await addMilestonePhase(milestoneData);
      }
      setMilestoneData({ name: "", description: "", status: "ACTIVE" });
      loadMilestonePhases();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong!"));
    }
  };

  const handleEdit = (milestone) => {
    setMilestoneData(milestone);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this milestone phase?")) {
      await deleteMilestonePhase(id);
      loadMilestonePhases();
    }
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
    padding: "20px"
  }}
>

      <h2 className="text-center mb-4">📅 Milestone Phase Management</h2>

      {/* Milestone Phase Form */}
      <div className="card mx-auto shadow-sm p-4" style={{ maxWidth: "500px" }}>
        <h5 className="text-center">{milestoneData.id ? "Edit Milestone Phase" : "Add New Milestone Phase"}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Milestone Phase Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Milestone Phase Name"
              required
              value={milestoneData.name}
              onChange={(e) => setMilestoneData({ ...milestoneData, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter Description"
              value={milestoneData.description}
              onChange={(e) => setMilestoneData({ ...milestoneData, description: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={milestoneData.status}
              onChange={(e) => setMilestoneData({ ...milestoneData, status: e.target.value })}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="BLOCKED">Blocked</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {milestoneData.id ? "Update Milestone Phase" : "Add Milestone Phase"}
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search Milestone Phases..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Milestone Phase Table */}
      <div className="mt-4">
        <h4 className="mb-3">📋 Milestone Phase List</h4>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>Milestone Phase Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredPhases.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-muted">No milestone phases available.</td>
                </tr>
              ) : (
                filteredPhases.map((milestone, index) => (
                  <tr key={milestone.id}>
                    <td>{index + 1}</td>
                    <td>{milestone.name}</td>
                    <td>{milestone.description || "N/A"}</td>
                    <td>
                      <span className={`badge ${milestone.status === "ACTIVE" ? "bg-success" : "bg-secondary"}`}>
                        {milestone.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(milestone)} className="btn btn-sm btn-warning me-2">✏ Edit</button>
                      <button onClick={() => handleDelete(milestone.id)} className="btn btn-sm btn-danger">🗑 Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF Download Button */}
      <div className="text-center mt-3">
        <button className="btn btn-success" onClick={handleDownloadPDF}>
          📥 Download PDF
        </button>
      </div>
    </div>
  );
};

export default MilestonePhaseManagement;
