import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMilestones = () => {
    const [formData, setFormData] = useState({
        projectID: "",
        soWID: "",
        taskID: "",
        featureDescription: "",
        startDate: "",
        targetDate: "",
        currentStatus: "",
        currentPhaseID: "",
    });

    const [message, setMessage] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [projects, setProjects] = useState([]); // State to hold projects

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get("http://localhost:8080/project");
                const activeProjects = res.data.filter(p => p.status === "ACTIVE");
                setProjects(activeProjects);
            } catch (err) {
                console.error("Error fetching projects:", err);
            }
        };

        fetchProjects();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStatusSelect = (status) => {
        setFormData({ ...formData, currentStatus: status });
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const validateForm = () => {
        const requiredFields = [
            "projectID",
            "soWID",
            "taskID",
            "featureDescription",
            "startDate",
            "targetDate",
            "currentStatus",
            "currentPhaseID",
        ];
        for (let field of requiredFields) {
            if (!formData[field]) {
                setMessage({ type: "error", text: `${field} is required.` });
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.post(`http://localhost:8080/milestone/add/${formData.projectID}`, formData);
            setMessage({ type: "success", text: "Milestone added successfully!" });
            setFormData({
                projectID: "",
                soWID: "",
                taskID: "",
                featureDescription: "",
                startDate: "",
                targetDate: "",
                currentStatus: "",
                currentPhaseID: "",
            });
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Failed to add milestone.";
            setMessage({ type: "error", text: errorMsg });
        }
    };

    const statusOptions = [
        { value: "Completed", color: "#00FF00" },
        { value: "Ongoing", color: "#FFA500" },
        { value: "At Risk", color: "#FF0000" },
    ];

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Milestone</h2>

            {message && (
                <p className={`mb-4 text-center font-semibold ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                    {message.text}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                <label className="block text-left font-medium text-gray-700">Select Project</label>
                <select
                    name="projectID"
                    value={formData.projectID}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="">-- Select a Project --</option>
                    {projects.map((project) => (
                        <option key={project.projectID} value={project.projectID}>
                            {project.projectName} (ID: {project.projectID})
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    name="soWID"
                    placeholder="SoW ID"
                    value={formData.soWID}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <input
                    type="number"
                    name="taskID"
                    placeholder="Task ID"
                    value={formData.taskID}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <textarea
                    name="featureDescription"
                    placeholder="Feature Description"
                    value={formData.featureDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring focus:border-blue-300"
                />

                <label className="block text-left font-medium text-gray-700">Start Date</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />

                <label className="block text-left font-medium text-gray-700">Target Date</label>
                <input
                    type="date"
                    name="targetDate"
                    value={formData.targetDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />

                {/* Status Dropdown */}
                <div className="relative">
                    <div
                        className="w-full px-4 py-2 border rounded cursor-pointer bg-white flex justify-between items-center"
                        onClick={toggleDropdown}
                    >
                        {formData.currentStatus ? (
                            <div className="flex items-center">
                                <span
                                    className="inline-block w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: statusOptions.find(opt => opt.value === formData.currentStatus)?.color }}
                                ></span>
                                {formData.currentStatus}
                            </div>
                        ) : (
                            "Select Status"
                        )}
                        <span className="text-sm">▼</span>
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute w-full border rounded mt-1 bg-white z-10 shadow">
                            {statusOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                    onClick={() => handleStatusSelect(option.value)}
                                >
                                    <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: option.color }}></span>
                                    {option.value}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <input
                    type="text"
                    name="currentPhaseID"
                    placeholder="Current Phase ID"
                    value={formData.currentPhaseID}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />

                <div className="flex justify-between space-x-4 mt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800"
                    >
                        Add Milestone
                    </button>
                    <button
                        type="button"
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                        onClick={() => {
                            setFormData({
                                projectID: "",
                                soWID: "",
                                taskID: "",
                                featureDescription: "",
                                startDate: "",
                                targetDate: "",
                                currentStatus: "",
                                currentPhaseID: "",
                            });
                            setMessage(null);
                            setIsDropdownOpen(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMilestones;
