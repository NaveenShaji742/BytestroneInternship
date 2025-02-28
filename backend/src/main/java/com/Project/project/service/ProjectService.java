package com.Project.project.service;

import com.Project.project.model.Project;
import java.util.List;

public interface ProjectService {
    Project saveProject(Project newProject);

    List<Project> getAllProjects();

    Project getProjectByProjectID(Long projectID);  // Changed from id to ProjectID

    Project updateProject(Project newProject, Long projectID);  // Changed from id to ProjectID

    String deleteProject(Long projectID);  // Changed from id to ProjectID
}
