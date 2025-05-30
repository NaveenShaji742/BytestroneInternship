import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const ViewMilestones = () => {
  const { projectID } = useParams();
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const avatar = '/images/avatar.png';
  const managerName = localStorage.getItem('username') || 'Project Manager';

  useEffect(() => {
    loadMilestones();
  }, [projectID]);

  const loadMilestones = async () => {
    try {
      // Fixed API endpoint to include projectID
      const result = await axios.get(`http://localhost:8080/milestones/project`);
      setMilestones(result.data || []);
    } catch (error) {
      console.error("Error fetching milestones:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (milestoneID) => {
    if (window.confirm("Are you sure you want to delete this milestone?")) {
      try {
        await axios.delete(`http://localhost:8080/milestones/delete/${milestoneID}`);
        setMilestones(milestones.filter((m) => m.milestoneID !== milestoneID));
      } catch (error) {
        alert("Failed to delete milestone. Please try again.");
      }
    }
  };

  const handleEdit = (milestoneID) => {
    navigate(`/edit-milestone/${milestoneID}`);
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
          <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate(`/view-milestones`)}>
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

        {/* Milestone Section */}
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-700">Milestones of Project {projectID}</h2>
            <button
              onClick={() => navigate('/add-milestone')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              + Create Milestone
            </button>
          </div>

          {loading ? (
            <p>Loading milestones...</p>
          ) : milestones.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {milestones.map((milestone) => (
                <div key={milestone.milestoneID} className="bg-purple-200 border rounded-lg p-4 shadow-md">
                  <h6 className="text-lg font-semibold text-purple-900 mb-2">{milestone.featureDescription || "No Description"}</h6>
                  <p><strong>Project:</strong> {milestone.project?.projectName || "N/A"}</p>
                  <p><strong>Start Date:</strong> {milestone.startDate ? new Date(milestone.startDate).toLocaleDateString() : "N/A"}</p>
                  <p><strong>Target Date:</strong> {milestone.targetDate ? new Date(milestone.targetDate).toLocaleDateString() : "N/A"}</p>
                  <p><strong>Status:</strong> {milestone.currentStatus || "N/A"}</p>
                  <p><strong>SoW ID:</strong> {milestone.soWID || "N/A"}</p>
                  <p><strong>Task ID:</strong> {milestone.taskID || "N/A"}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(milestone.milestoneID)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                      
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(milestone.milestoneID)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No milestones available for the project.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMilestones;