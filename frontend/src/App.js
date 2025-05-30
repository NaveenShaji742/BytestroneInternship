import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './login/Login';
import Home from "./pages/Home";
import MainLayout from './layout/MainLayout';
import PMDashboard from './pm/PMDashboard';
import AddProject from './pm/AddProject';
import ViewProjects from "./pm/ViewProjects";
import EditProject from "./pm/EditProject";
import ViewMilestones from "./pm/ViewMilestone";
import AddMilestones from "./pm/AddMilestone";
import EditMilestone from "./pm/EditMIlestone";
// System Admin modules
import SADashboard from "./sa/SADashboard";
import PhaseManagement from "./sa/PhaseManagement";
import ContractTypeManagement from "./sa/ContractTypeManagement";
import AuditTrailView from "./sa/AuditTrailView";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* General */}
        <Route path="/home" element={<Home />} />
        <Route path="/pm" element={<MainLayout />} />

        {/* Project Manager Routes */}
        <Route path="/pmdashboard" element={isLoggedIn ? <PMDashboard /> : <Navigate to="/" />} />
        <Route path="/viewprojects" element={<ViewProjects />} />
        <Route path="/addproject" element={<AddProject />} />
        <Route path="/editproject/:id" element={<EditProject />} />
        <Route path="/view-milestones" element={<ViewMilestones />} />
        <Route path="/add-milestone" element={<AddMilestones />} />
        <Route path="/edit-milestone/:milestoneID" element={<EditMilestone />} />


        {/* System Administrator Routes */}
        <Route path="/sadashboard" element={isLoggedIn ? <SADashboard /> : <Navigate to="/" />} />
        <Route path="/phases" element={<PhaseManagement />} />
        <Route path="/contracts" element={<ContractTypeManagement />} />
        <Route path="/audits" element={<AuditTrailView />} />
      </Routes>
    </Router>
  );
}

export default App;
