import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MasterDataList = () => {
  const [dataType, setDataType] = useState('phase'); // 'phase' or 'contract'
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, [dataType]);

  const fetchData = async () => {
    try {
      const endpoint =
        dataType === 'phase'
          ? 'http://localhost:8080/api/phases'
          : 'http://localhost:8080/api/contracts';
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching master data:', error);
    }
  };

  const filteredData = data.filter((item) => {
    const name =
      dataType === 'phase' ? item.phaseName : item.name;
    return (name || '').toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    const endpoint =
      dataType === 'phase'
        ? `http://localhost:8080/api/phases/${id}`
        : `http://localhost:8080/api/contracts/${id}`;

    axios
      .delete(endpoint)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Delete error:", error);
        alert('Cannot delete item due to dependencies or server error.');
      });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Master Data Management</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => {
            setDataType('phase');
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded ${dataType === 'phase' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Phases
        </button>
        <button
          onClick={() => {
            setDataType('contract');
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded ${dataType === 'contract' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Contract Types
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Table */}
      <table className="w-full border text-left mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Associated Count</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                {dataType === 'phase' ? item.phaseName : item.name}
              </td>
              <td className="py-2 px-4 border-b">{item.description || '-'}</td>
              <td className="py-2 px-4 border-b">{item.status || 'Active'}</td>
              <td className="py-2 px-4 border-b">{item.associatedCount || 0}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {currentData.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterDataList;
