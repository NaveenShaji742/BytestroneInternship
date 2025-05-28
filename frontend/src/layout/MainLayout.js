import React, { useRef, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const MainLayout = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const avatar = "/images/avatar.png";
  const managerName = localStorage.getItem("username") || "Project Manager";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Welcome, {managerName}</h2>
        <ul>
          <li
            className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={() => navigate("/pmdashboard")}
          >
            Dashboard
          </li>
          <li
            className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={() => navigate("/viewprojects")}
          >
            Projects
          </li>
          <li
            className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={() => navigate("/view-milestones")}
          >
            Milestone 
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer">
            Reports
          </li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <img src="/bytestrone.png" alt="Logo" className="h-10" />
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

        {/* Inject page content here */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
