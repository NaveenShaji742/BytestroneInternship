import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Layout & Components
import Navbar from './Layout/Navbar';
import Home from './Pages/Home';
import Login from './Login/Login';


// Project & Milestone Management (From main-frontend)
import AddProject from './Users/Addproject';
import EditProject from './Users/Editproject';
import ViewProject from './Users/ViewProject';
import AddMilestone from './Users/AddMilestone';
import ViewMilestones from './Users/ViewMilestones';
import EditMilestone from './Users/EditMilestone';

// Other Management Pages (From master-frontend)
import PhaseManagement from './Components/PhaseManagement';
import MilestonePhaseManagement from "./Components/milestonePhaseManagement";
import ContractTypeManagement from './Components/ContractTypeManagement';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentProjectID, setCurrentProjectID] = useState(null);
  const location = useLocation(); // Get the current route

  // Hide Navbar on the login page
  const showNavbar = isLoggedIn && location.pathname.toLowerCase() !== '/login';

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentProjectID(null);
  };

  return (
    <div className="App">
      {showNavbar && <Navbar currentProjectID={currentProjectID} handleLogout={handleLogout} />}
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* Redirect root to home if logged in, otherwise login */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* Protected Routes */}
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />

        {/* Project & Milestone Management */}
        <Route path="/addproject" element={isLoggedIn ? <AddProject /> : <Navigate to="/" />} />
        <Route path="/editproject/:id" element={isLoggedIn ? <EditProject /> : <Navigate to="/" />} />
        <Route path="/viewproject/:id" element={isLoggedIn ? <ViewProject setCurrentProjectID={setCurrentProjectID} /> : <Navigate to="/" />} />
        <Route path="/projects/:projectID/add-milestone" element={isLoggedIn ? <AddMilestone /> : <Navigate to="/" />} />
        <Route path="/projects/:projectID/view-milestones" element={isLoggedIn ? <ViewMilestones /> : <Navigate to="/" />} />
        <Route path="/edit-milestone/:milestoneID" element={isLoggedIn ? <EditMilestone /> : <Navigate to="/" />} />

        {/* Other Management Pages */}
        <Route path="/phases" element={isLoggedIn ? <PhaseManagement /> : <Navigate to="/" />} />
        <Route path="/milestone-phases" element={isLoggedIn ? <MilestonePhaseManagement /> : <Navigate to="/" />} />
        <Route path="/contract-types" element={isLoggedIn ? <ContractTypeManagement /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
