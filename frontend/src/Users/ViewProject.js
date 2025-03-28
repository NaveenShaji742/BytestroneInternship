import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from "axios";
 
export default function ViewProject() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
 
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/project/${id}`);
        console.log("Fetched project data:", result.data); // Debugging step
        setProject(result.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
 
    fetchProjectDetails();
  }, [id]);
 
  if (!project) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Project Details</h2>
          <div className="card">
            <div className="card-body">
              <p className="card-text"><strong>Client Name:</strong> {project.clientName}</p>
              <p className="card-text"><strong>projectName:</strong> {project.projectName}</p>
              <p className="card-text"><strong>Start Date:</strong> {project.startDate}</p>
              <p className="card-text"><strong>End Date:</strong> {project.endDate}</p>
              <p className="card-text"><strong>Description:</strong> {project.description}</p>
              <p className="card-text"><strong>Budget:</strong> {project.budget}</p>
              <p className="card-text"><strong>Phase:</strong> {project.phaseName}</p>
              <p className="card-text"><strong>Engineering Manager:</strong> {project.engineeringManager || "Not Available"}</p>
              <p className="card-text"><strong>Scope:</strong> {project.scope || "Not Available"}</p>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}