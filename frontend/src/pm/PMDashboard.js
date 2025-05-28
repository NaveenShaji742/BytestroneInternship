import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

function PMDashboard() {
    const [project, setProjects] = useState([]);
    const [message, setMessage] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [managerName, setManagerName] = useState('');
    const avatar = '/images/avatar.png';

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/login', {
                    withCredentials: true  // if using cookies/session
                });
                setManagerName(res.data.username);
            } catch (error) {
                console.error("Failed to fetch user info", error);
                setManagerName("Project Manager"); // fallback
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/projects');
                setProjects(response.data);
            } catch (error) {
                setMessage('Failed to fetch projects');
            }
        };
        fetchProjects();
    }, []);


    // Close dropdown on outside click
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
                    <div className="flex items-center">
                        <img src="/bytestrone.png" alt="Company Logo" className="h-10 mr-4" />
                    </div>
                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="flex items-center space-x-4 cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <span className="text-gray-800 font-medium">{managerName}</span>
                            <img
                                src={avatar}
                                alt="avatar"
                                className="w-10 h-10 rounded-full"
                            />
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
            </div>
        </div>
    );
}

export default PMDashboard;
