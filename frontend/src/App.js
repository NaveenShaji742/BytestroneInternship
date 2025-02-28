import React, { useState } from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './Layout/Navbar';
import Home from './Pages/Home';
import Addproject from './Users/Addproject';
import EditProject from './Users/Editproject';
import ViewUser from './Users/Viewproject';
import ViewProjects from './Pages/ViewProjects';
import Login from './Login/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Router>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route 
            exact 
            path="/" 
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            } 
          />
          <Route 
            exact 
            path="/home" 
            element={isLoggedIn ? <Home /> : <Navigate to="/" />} 
          />
          <Route 
            exact 
            path="/Addproject" 
            element={isLoggedIn ? <Addproject /> : <Navigate to="/" />} 
          />
          <Route 
            exact 
            path="/editproject/:id" 
            element={isLoggedIn ? <EditProject /> : <Navigate to="/" />} 
          />
          <Route 
            exact 
            path="/viewUser/:id" 
            element={isLoggedIn ? <ViewUser /> : <Navigate to="/" />} 
          />
          <Route 
            exact 
            path="/view-projects" 
            element={isLoggedIn ? <ViewProjects /> : <Navigate to="/" />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;