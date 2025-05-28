import React, { useEffect, useState } from "react";
import axios from "axios";

const ContractTypeManagement = () => {
  const [contracts, setContracts] = useState([]);
  const [formData, setFormData] = useState({ name: "", code: "", description: "" });
  const [id, setid] = useState(null);
  const [error, setError] = useState("");

  const fetchContracts = async () => {
    const res = await axios.get("http://localhost:8080/api/contracts");
    setContracts(res.data);
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleSave = async () => {
    if (!formData.name) return setError("Contract type name is required");
    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/contracts/${id}`, formData);
      } else {
        await axios.post("http://localhost:8080/api/contracts", formData);
      }
      setFormData({ name: "", code: "", description: "" });
      setid(null);
      fetchContracts();
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error saving contract type");
    }
  };

  const handleEdit = (contract) => {
    setFormData(contract);
    setid(contract.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this contract type?")) {
      await axios.delete(`http://localhost:8080/api/contracts/${id}`);
      fetchContracts();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Contract Type Management</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4 space-y-2">
        <input type="text" placeholder="Contract Type Name" value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2 w-full" />

        <input type="text" placeholder="Contract Code" value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })} className="border p-2 w-full" />

        <textarea placeholder="Description" value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="border p-2 w-full" />
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2">{id ? "Update" : "Add"} Contract</button>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2">Name</th>
            <th className="border px-2">Code</th>
            <th className="border px-2">Description</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((c) => (
            <tr key={c.id}>
              <td className="border px-2">{c.name}</td>
              <td className="border px-2">{c.code}</td>
              <td className="border px-2">{c.description}</td>
              <td className="border px-2">
                <button onClick={() => handleEdit(c)} className="text-yellow-500 mr-2">Edit</button>
                <button onClick={() => handleDelete(c.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractTypeManagement;