import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const AdminLayout = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const adminName = localStorage.getItem("username") || "System Admin";
  const avatar = "/images/avatar.png";

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
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">System Admin</h2>
        <ul>
          <li
            className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={() => navigate("/admin/phases")}
          >
            Phase Management
          </li>
          <li
            className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={() => navigate("/admin/contract-types")}
          >
            Contract Type Management
          </li>
          <li
            className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={() => navigate("/admin/audit-trail")}
          >
            Audit Trail
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <img src="/bytestrone.png" alt="Logo" className="h-10" />
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-gray-800 font-medium">{adminName}</span>
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

        {/* Page Outlet */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
