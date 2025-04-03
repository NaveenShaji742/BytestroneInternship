import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [project, setProject] = useState([]);

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const result = await axios.get("http://localhost:8080/project");
      setProject(result.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/project/${id}`);
        loadProject();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  
  return (
    <div className="main-content">
      <div className="container py-4">
        <h2 className="title">Project List</h2>

        {/* Project Cards */}
        <div className="row">
          {project.map((project, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="project-title">{project.projectName}</h6>
                  <p><strong>Project ID:</strong> {project.projectID}</p>
                  <p><strong>Start Date:</strong> {project.startDate}</p>
                  <p><strong>End Date:</strong> {project.endDate}</p>
                  <p><strong>Budget:</strong> ${project.budget}</p>
                  <p><strong>Phase:</strong> {project.phaseName}</p>
                  <div className="button-container">
                    <Link className="btn view-btn" to={`/viewProject/${project.projectID}`}>
                      View
                    </Link>
                    <Link className="btn edit-btn" to={`/editProject/${project.projectID}`}>
                      Edit
                    </Link>
                    <Link className="btn delete-btn" onClick={() => deleteProject(project.projectID)}>
                      Delete
                    </Link>
                    {/* Updated Link to View Milestones */}
                    <Link className="btn milestone-btn" to={`/projects/${project.projectID}/view-milestones`}>
                      View Milestone
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}