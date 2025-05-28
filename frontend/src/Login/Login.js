import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css"; // Ensure Tailwind is imported globally if not here

function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                username,
                password,
            });

            if (response?.data === 'PM' || response?.data === 'SA') {
                setMessage('Login successful!');
                setIsLoggedIn(true);
                localStorage.setItem('roles', response.data); 
                localStorage.setItem('username', response.data);// ✅ Store role here
                navigate('/home');
            } else {
                setMessage('Invalid username or password');
            }
        } catch (error) {
            if (error.response?.data) {
                setMessage(error.response.data.message || 'Login failed: Invalid credentials');
            } else if (error.request) {
                setMessage('No response from server. Please try again later.');
            } else {
                setMessage('An error occurred: ' + error.message);
            }
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-r from-indigo-100 to-blue-200">
            <div className="hidden lg:flex flex-1 flex-col justify-center items-center px-12">
                <img
                    src="bytestrone.png"
                    alt="Project Management"
                    className="rounded-xl w-3/4"
                />
            </div>

            <div className="flex-1 flex flex-col justify-center px-12 bg-white rounded-l-3xl lg:rounded-l-none lg:shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-gray-800">Project Management System</h1>

                {message && (
                    <p className={`text-sm mb-4 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}

                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label className="mb-2 font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className="mb-2 font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
