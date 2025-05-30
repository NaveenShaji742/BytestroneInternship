import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, BarChart, Bar } from 'recharts';

function PMDashboard() {
    const [projects, setProjects] = useState([]);
    const [phases, setPhases] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [managerName, setManagerName] = useState('');
    const avatar = '/images/avatar.png';

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/login', { withCredentials: true });
                setManagerName(res.data.username || "Project Manager");
            } catch (error) {
                console.error("Failed to fetch user info:", error);
                setManagerName("Project Manager");
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/projects', { withCredentials: true });
                const projectData = Array.isArray(response.data) ? response.data : [];
                console.log("Fetched projects:", projectData); // Debug log
                setProjects(projectData);
            } catch (error) {
                console.error('Failed to fetch projects:', error.response?.data || error.message);
                setProjects([]); // Ensure projects is an array on error
            }
        };

        const fetchPhases = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/phases', { withCredentials: true });
                const phaseData = Array.isArray(response.data) ? response.data : [];
                console.log("Fetched phases:", phaseData); // Debug log
                setPhases(phaseData);
            } catch (error) {
                console.error('Failed to fetch phases:', error.response?.data || error.message);
                setPhases([]);
            }
        };

        fetchProjects();
        fetchPhases();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        navigate('/');
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const pieData = [
        { name: 'Completed', value: projects.filter(p => p.status === 'COMPLETED').length },
        { name: 'Ongoing', value: projects.filter(p => p.status === 'ONGOING').length },
        { name: 'At Risk', value: projects.filter(p => p.status === 'AT_RISK').length },
        { name: 'Not Started', value: projects.filter(p => p.status === 'NOT_STARTED').length },
    ].filter(entry => entry.value > 0); // Remove zero-value entries for cleaner chart

    const lineData = projects.map((p) => ({
        name: p.projectName || `Project ${p.projectID || 'Unknown'}`,
        progress: Number(p.progress) || 0
    }));

    const phaseData = phases.map(phase => ({
        name: phase.phaseName || `Phase ${phase.id || 'Unknown'}`,
        count: projects.filter(p => 
            (p.currentPhase?.id === phase.id) || 
            (typeof p.currentPhase === 'number' && p.currentPhase === phase.id)
        ).length
    })).filter(entry => entry.count > 0); // Remove phases with no projects

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-64 bg-gray-800 text-white p-6">
                <h2 className="text-2xl font-bold mb-8">Welcome, PM</h2>
                <ul>
                    <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/pmdashboard')}>Dashboard</li>
                    <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/viewprojects')}>Projects</li>
                    <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/view-milestones')}>Milestone</li>
                    <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer">Reports</li>
                </ul>
            </div>

            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <img src="/bytestrone.png" alt="Company Logo" className="h-10" />
                    <div className="relative" ref={dropdownRef}>
                        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <span className="text-gray-800 font-medium">PM</span>
                            <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                        </div>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50">
                                <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    <LogOut size={18} className="text-gray-600" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold mb-2">Project Progress</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="progress" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold mb-2">Project Status Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold mb-2">Projects by Phase</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={phaseData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#0088FE">
                                    {phaseData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PMDashboard;