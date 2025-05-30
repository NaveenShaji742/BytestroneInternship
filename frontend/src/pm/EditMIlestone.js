import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditMilestone = () => {
  const { milestoneID } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    milestoneID: '',
    projectID: '',
    soWID: '',
    taskID: '',
    featureDescription: '',
    startDate: '',
    targetDate: '',
    currentStatus: '',
    currentPhase: '',
    phaseName: '',
  });
  const [message, setMessage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusOptions = [
    { value: 'Completed', color: '#00FF00' },
    { value: 'Ongoing', color: '#FFA500' },
    { value: 'At Risk', color: '#FF0000' },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:8080/project');
        const activeProjects = res.data.filter((p) => p.status === 'ACTIVE');
        setProjects(activeProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setMessage({ type: 'error', text: 'Failed to fetch projects.' });
      }
    };

    const fetchPhases = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/phases');
        setPhases(res.data);
      } catch (err) {
        console.error('Error fetching phases:', err);
        setMessage({ type: 'error', text: 'Failed to fetch phases.' });
      }
    };

    const fetchMilestone = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/milestones/${milestoneID}`);
        const milestone = response.data;

        let phaseName = '';
        if (milestone.currentPhase) {
          try {
            const phaseResponse = await axios.get(`http://localhost:8080/api/phases/${milestone.currentPhase}`);
            phaseName = phaseResponse.data?.phaseName || '';
          } catch (err) {
            console.error('Error fetching phase details:', err);
          }
        }

        setFormData({
          milestoneID: milestone.milestoneID || '',
          projectID: milestone.projectID || '',
          soWID: milestone.soWID || '',
          taskID: milestone.taskID || '',
          featureDescription: milestone.featureDescription || '',
          startDate: milestone.startDate || '',
          targetDate: milestone.targetDate || '',
          currentStatus: milestone.currentStatus || '',
          currentPhase: milestone.currentPhase || '',
          phaseName: phaseName,
        });
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch milestone details.';
        setMessage({ type: 'error', text: errorMsg });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    fetchPhases();
    if (milestoneID) {
      fetchMilestone();
    }
  }, [milestoneID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPhase') {
      const selectedPhase = phases.find((phase) => phase.id === value);
      setFormData({
        ...formData,
        currentPhase: value,
        phaseName: selectedPhase ? selectedPhase.phaseName : '',
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleStatusSelect = (status) => {
    setFormData({ ...formData, currentStatus: status });
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const validateForm = async () => {
    const requiredFields = [
      { key: 'projectID', label: 'Project ID' },
      { key: 'soWID', label: 'SoW ID' },
      { key: 'taskID', label: 'Task ID' },
      { key: 'featureDescription', label: 'Feature Description' },
      { key: 'startDate', label: 'Start Date' },
      { key: 'targetDate', label: 'Target Date' },
      { key: 'currentStatus', label: 'Current Status' },
      { key: 'currentPhase', label: 'Current Phase' },
    ];

    for (let { key, label } of requiredFields) {
      const value = formData[key];
      if (!value) {
        setMessage({ type: 'error',
                    text: `${label} is required.` });
        return false;
      }
    }

    try {
      const response = await axios.get(`http://localhost:8080/milestones/project/${formData.projectID}`);
      const milestones = response.data || [];
      const otherMilestones = milestones.filter((m) => m.milestoneID !== parseInt(milestoneID));

      if (otherMilestones.some((m) => m.soWID === parseInt(formData.soWID))) {
        setMessage({ type: 'error',
                    text: 'SoW ID already exists for this project.' });
        return false;
      }
      if (otherMilestones.some((m) => m.taskID === parseInt(formData.taskID))) {
        setMessage({ type: 'error',
                    text: 'Task ID already exists for this project.' });
        return false;
      }
    } catch (error) {
      setMessage({ type: 'error',
                  text: 'Failed to validate SoW ID and Task ID.' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!(await validateForm())) {
      setLoading(false);
      return;
    }

    try {
      const payload = {
        milestoneID: parseInt(formData.milestoneID),
        soWID: parseInt(formData.soWID),
        taskID: parseInt(formData.taskID),
        featureDescription: formData.featureDescription,
        startDate: formData.startDate,
        targetDate: formData.targetDate,
        currentStatus: formData.currentStatus,
        currentPhase: parseInt(formData.currentPhase),
      };
      await axios.put(`http://localhost:8080/milestones/update/${milestoneID}`, payload);
      setMessage({ type: 'success',
                    text: 'Milestone updated successfully!' });
      setTimeout(() => {
        navigate(`/view-milestones`);
      }, 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to update milestone.';
      setMessage({ type: 'error',
                    text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/view-milestones`);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Milestone</h2>

      {message && (
        <p className={`mb-4 text-center font-semibold ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}
      {loading && <p className="text-center text-gray-600">Loading...</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-left font-medium text-gray-700">Select Project</label>
          <select
            name="projectID"
            value={formData.projectID}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.projectID} value={project.projectID}>
                {project.projectName} (ID: {project.projectID})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-left font-medium text-gray-700">SoW ID</label>
          <input
            type="number"
            name="soWID"
            placeholder="SoW ID"
            value={formData.soWID}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-left font-medium text-gray-700">Task ID</label>
          <input
            type="number"
            name="taskID"
            placeholder="Task ID"
            value={formData.taskID}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-left font-medium text-gray-700">Feature Description</label>
          <textarea
            name="featureDescription"
            placeholder="Feature Description"
            value={formData.featureDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-left font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-left font-medium text-gray-700">Target Date</label>
          <input
            type="date"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-left font-medium text-gray-700">Current Status</label>
          <div
            className="w-full px-4 py-2 border rounded cursor-pointer bg-white flex justify-between items-center"
            onClick={toggleDropdown}
          >
            {formData.currentStatus ? (
              <div className="flex items-center">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: statusOptions.find((opt) => opt.value === formData.currentStatus)?.color }}
                ></span>
                {formData.currentStatus}
              </div>
            ) : (
              'Select Status'
            )}
            <span className="text-sm">▼</span>
          </div>
          {isDropdownOpen && (
            <div className="absolute w-full border rounded-md mt-1 bg-white z-10 shadow">
              {statusOptions.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded flex items-center"
                  onClick={() => handleStatusSelect(option.value)}
                >
                  <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: option.color }}></span>
                  {option.value}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-left font-medium text-gray-700">Current Phase</label>
          <select
            name="currentPhase"
            value={formData.currentPhase}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="">Select Phase</option>
            {phases.map((phase) => (
              <option key={phase.id} value={phase.id}>
                {phase.phaseName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between space-x-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 text-white py-2 px-4 rounded-lg ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800'
            }`}
          >
            Save
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMilestone;