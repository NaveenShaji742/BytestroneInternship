import React, { useEffect, useState } from "react";
import axios from "axios";

const PhaseManagement = () => {
  const [phases, setPhases] = useState([]);
  const [newPhase, setNewPhase] = useState({ phaseName: "", description: "", status: "ACTIVE" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchPhases = async () => {
    const res = await axios.get("http://localhost:8080/api/phases");
    setPhases(res.data);
  };

  useEffect(() => {
    fetchPhases();
  }, []);

  const handleSave = async () => {
    if (!newPhase.phaseName) return setError("Phase name is required");
    try {
      if (editId) {
        await axios.put(`http://localhost:8080/api/phases/${editId}`, newPhase);
      } else {
        await axios.post("http://localhost:8080/api/phases", newPhase);
      }
      setNewPhase({ phaseName: "", description: "", status: "ACTIVE" });
      setEditId(null);
      fetchPhases();
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error saving phase");
    }
  };

  const handleEdit = (phase) => {
    setNewPhase(phase);
    setEditId(phase.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this phase?")) {
      await axios.delete(`http://localhost:8080/api/phases/${id}`);
      fetchPhases();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Phase Management</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4 space-y-2">
        <input type="text" placeholder="Phase Name" value={newPhase.phaseName}
          onChange={(e) => setNewPhase({ ...newPhase, phaseName: e.target.value })} className="border p-2 w-full" />
        <textarea placeholder="Description" value={newPhase.description}
          onChange={(e) => setNewPhase({ ...newPhase, description: e.target.value })} className="border p-2 w-full" />
        <select value={newPhase.status} onChange={(e) => setNewPhase({ ...newPhase, status: e.target.value })} className="border p-2 w-full">
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2">{editId ? "Update" : "Add"} Phase</button>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2">Name</th>
            <th className="border px-2">Description</th>
            <th className="border px-2">Status</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {phases.map((p) => (
            <tr key={p.id}>
              <td className="border px-2">{p.phaseName}</td>
              <td className="border px-2">{p.description}</td>
              <td className="border px-2">{p.status}</td>
              <td className="border px-2">
                <button onClick={() => handleEdit(p)} className="text-yellow-500 mr-2">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PhaseManagement;
