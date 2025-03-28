import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Layout/Navbar';
import Home from './Pages/Home';
import Addproject from './Users/Addproject';
import EditProject from './Users/Editproject';
import ViewProject from './Users/ViewProject';
import AddMilestone from './Users/AddMilestone';
import ViewMilestones from './Users/ViewMilestones';
import Login  from './Login/Login';
import EditMilestoneForm from './Users/EditMilestone';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentProjectID, setCurrentProjectID] = useState(null);
  const location = useLocation(); // Get the current route

  // Hide navbar on the login page, regardless of login state
  const showNavbar = isLoggedIn && location.pathname.toLowerCase() !== '/login';

  const handleLogout = () => {
   
    setIsLoggedIn(false); // Update state
    setCurrentProjectID(null); // Reset project ID
  };


  return (
    <div className="App">
      {showNavbar && <Navbar currentProjectID={currentProjectID} handleLogout={handleLogout}/>}
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {/* Redirect root to home if logged in, otherwise to login */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        {/* Protected routes */}
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/addproject" element={isLoggedIn ? <Addproject /> : <Navigate to="/" />} />
        <Route path="/editproject/:id" element={isLoggedIn ? <EditProject /> : <Navigate to="/" />} />
        <Route path="/viewproject/:id" element={isLoggedIn ? <ViewProject setCurrentProjectID={setCurrentProjectID} /> : <Navigate to="/" />} />
        {/* Milestones */}
        <Route path="/projects/:projectID/add-milestone" element={isLoggedIn ? <AddMilestone /> : <Navigate to="/" />} />
        <Route path="/projects/:projectID/view-milestones" element={isLoggedIn ? <ViewMilestones /> : <Navigate to="/" />} />
        <Route path="/edit-milestone/:milestoneID" element={isLoggedIn ? <EditMilestoneForm /> : <Navigate to="/" />} />
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