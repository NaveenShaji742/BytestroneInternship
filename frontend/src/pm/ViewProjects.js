import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { LogOut } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewProjects = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const managerName = localStorage.getItem('username') || 'Project Manager';
  const avatar = '/images/avatar.png';

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    setSelectedProject(null);
    try {
      const res = await axios.get(`http://localhost:8080/project`);
      setProjects(res.data);
    } catch (err) {
      setMessage('Failed to load projects');
    }
  };

  const fetchProjectById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/project/${id}`);
      setSelectedProject(res.data);
    } catch (err) {
      setMessage('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project ?")) return;
    try {
      await axios.delete(`http://localhost:8080/project/${id}`);
      setProjects(prev => prev.filter(p => p.projectID !== id));
      setSelectedProject(null);
    } catch (err) {
      alert("Failed to update project status.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Welcome, {managerName}</h2>
        <ul>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/pmdashboard')}>
            Dashboard
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/viewprojects')}>
            Projects
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/view-milestones')}>
            Milestone
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer">Reports</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <img src="/bytestrone.png" alt="Company Logo" className="h-10" />
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-gray-800 font-medium">{managerName}</span>
              <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut size={18} className="text-gray-600" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* View Mode */}
        {loading ? (
          <p>Loading...</p>
        ) : selectedProject ? (
          <div className="bg-white p-6 rounded shadow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-indigo-700">{selectedProject.projectID}</h2>
              
            </div>
            <p className="text-gray-700 mb-2"><strong>Status:</strong> {selectedProject.status}</p>
            <p className="text-gray-700 mb-2"><strong>Client Name:</strong> {selectedProject.clientName}</p>
            <p className="text-gray-700 mb-2"><strong>Engineering Manager:</strong> {selectedProject.engineeringManager}</p>
            <p className="text-gray-700 mb-4"><strong>Description:</strong> {selectedProject.description}</p>
            <p className="text-gray-700 mb-4"><strong>Start Date:</strong> {selectedProject.startDate}</p>
            <p className="text-gray-700 mb-4"><strong>End Date:</strong> {selectedProject.endDate}</p>
            <p className="text-gray-700 mb-4"><strong>Budget:</strong> {selectedProject.budget}</p>
            <p className="text-gray-700 mb-4"><strong>Scope:</strong> {selectedProject.scope}</p>
            <p className="text-gray-700 mb-4"><strong>Contract Type :</strong> {selectedProject.contractTypeName.name}</p>
            <p className="text-gray-700 mb-2"><strong>Phase:</strong> {selectedProject.phaseName.phaseName}</p>

            <button
              onClick={fetchAllProjects}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            >
              ← Back to Projects
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-700">Projects</h2>
              <button
                onClick={() => navigate('/addproject')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium"
              >
                + Create Project
              </button>
            </div>

            {message && <p className="text-red-500">{message}</p>}

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow rounded-lg">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Project ID</th>
                    <th className="py-3 px-4 text-left">Project Name</th>
                    <th className="py-3 px-4 text-left">Client Name</th>
                    <th className="py-3 px-4 text-left">Phase</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects
                    .filter((p) => p.status !== 'Inactive')
                    .map((project) => (
                      <tr key={project.id} className="border-t hover:bg-gray-50">
                        <td className="py-2 px-4">{project.projectID}</td>
                        <td className="py-2 px-4">{project.projectName}</td>
                        <td className="py-2 px-4">{project.clientName}</td>
                        <td className="py-2 px-4">{project.phaseName.phaseName}</td>
                        <td className="py-2 px-4">{project.status}</td>
                        <td className="py-2 px-4 flex gap-2">
                          <button
                            onClick={() => fetchProjectById(project.projectID)}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                          >
                            View
                          </button>
                          <button
                            onClick={() => navigate(`/editproject/${project.projectID}`)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(project.projectID)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewProjects;
