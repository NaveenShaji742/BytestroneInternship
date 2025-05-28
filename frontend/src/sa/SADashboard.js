import React from "react";
import { useNavigate } from "react-router-dom";
import MasterDataList from "./MasterDataList";
import { LogOut } from 'lucide-react';

const SADashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">System Admin</h2>
        <nav>
          <ul>
            <li
              className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
              onClick={() => navigate("/phases")}
            >
              Phase Management
            </li>
            <li
              className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
              onClick={() => navigate("/contracts")}
            >
              Contract Type 
            </li>
            <li
              className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
              onClick={() => navigate("/audits")}
            >
              Audit Trail
            </li>
            <li
              className="mt-12 hover:bg-red-700 p-2 rounded cursor-pointer text-red-200"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white p-6 rounded shadow mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Admin Panel</h1>
          <p className="text-gray-700 mb-4">Use the sidebar to manage Master Data:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Manage and edit <strong>project phases</strong> and their statuses</li>
            <li>Configure <strong>contract types</strong> used across projects</li>
            <li>Track all changes through the <strong>audit trail</strong></li>
          </ul>
        </div>

        {/* Unified Master Data List View */}
        <div className="bg-white rounded shadow p-6">
          <MasterDataList />
        </div>
      </main>
    </div>
  );
};

export default SADashboard;
