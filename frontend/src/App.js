import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './login/Login';
import Home from "./pages/Home";
import MainLayout from './layout/MainLayout';
import PMDashboard from './pm/PMDashboard';
import AddProject from './pm/AddProject'; // Assuming your AddProject page is here 
import ViewProjects from "./pm/ViewProjects";
import EditProject from "./pm/EditProject";
// You can adjust import paths if your folders are different

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
      

  return (
    <Router>
      <Routes>
        {/* Default route - login page */}
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/pm" element={<MainLayout />}></Route>
        <Route path="/home" element={<Home />} />
        {/* Dashboard route */}
        <Route path="/pmdashboard" element={isLoggedIn ? <PMDashboard /> : <Navigate to="/" />} />
        <Route path="/viewprojects" element={<ViewProjects />} />

        {/* Add Project route */}
        <Route path="/addproject" element={isLoggedIn ? <AddProject /> : <Navigate to="/" />} />
        <Route path="/editproject/:id" element={<EditProject />} />

        </Routes>
    </Router>
  );
}

export default App;
