import React, { useState, useEffect } from "react";
import { getContractTypes, addContractType, updateContractType, deleteContractType } from "../Api/contractTypeApi";

const ContractTypeManagement = () => {
  const [contractTypes, setContractTypes] = useState([]);
  const [contractData, setContractData] = useState({ name: "", contractCode: "", description: "" });

  useEffect(() => {
    loadContractTypes();
  }, []);

  const loadContractTypes = async () => {
    try {
      const response = await getContractTypes();
      setContractTypes(response.data);
    } catch (error) {
      console.error("Error fetching contract types:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contractData.name.trim()) {
      alert("Contract Type Name is required!");
      return;
    }
    try {
      if (contractData.id) {
        await updateContractType(contractData.id, contractData);
      } else {
        await addContractType(contractData);
      }
      setContractData({ name: "", contractCode: "", description: "" });
      loadContractTypes();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong!"));
    }
  };

  const handleEdit = (contractType) => {
    setContractData(contractType);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contract type?")) {
      await deleteContractType(id);
      loadContractTypes();
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

      <h2 className="text-center mb-4 text-white">📜 Contract Type Management</h2>

      <div className="card mx-auto shadow-sm p-4" style={{ maxWidth: "500px", opacity: 0.9 }}>
        <h5 className="text-center">{contractData.id ? "Edit Contract Type" : "Add New Contract Type"}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Contract Type Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Contract Type Name"
              required
              value={contractData.name}
              onChange={(e) => setContractData({ ...contractData, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contract Code (Optional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Contract Code"
              value={contractData.contractCode}
              onChange={(e) => setContractData({ ...contractData, contractCode: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter Description"
              value={contractData.description}
              onChange={(e) => setContractData({ ...contractData, description: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {contractData.id ? "Update Contract Type" : "Add Contract Type"}
          </button>
        </form>
      </div>

      <div className="mt-5">
        <h4 className="mb-3 text-white">📋 Contract Type List</h4>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>Contract Name</th>
                <th>Contract Code</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {contractTypes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-muted">No contract types available.</td>
                </tr>
              ) : (
                contractTypes.map((contractType, index) => (
                  <tr key={contractType.id}>
                    <td>{index + 1}</td>
                    <td>{contractType.name}</td>
                    <td>{contractType.contractCode || "N/A"}</td>
                    <td>{contractType.description}</td>
                    <td>
                      <button onClick={() => handleEdit(contractType)} className="btn btn-sm btn-warning me-2">✏ Edit</button>
                      <button onClick={() => handleDelete(contractType.id)} className="btn btn-sm btn-danger">🗑 Delete</button>
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

export default ContractTypeManagement;
