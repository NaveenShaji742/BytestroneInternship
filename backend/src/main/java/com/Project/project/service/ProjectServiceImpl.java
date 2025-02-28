package com.Project.project.service;

import com.Project.project.exception.ProjectNotFoundException;
import com.Project.project.model.Project;
import com.Project.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Project saveProject(Project newProject) {
        return projectRepository.save(newProject);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProjectByProjectID(Long projectID) {  // Updated method name
        return projectRepository.findById(projectID)
                .orElseThrow(() -> new ProjectNotFoundException(projectID));
    }

    @Override
    public Project updateProject(Project newProject, Long projectID) { // Updated method name
        return projectRepository.findById(projectID)
                .map(project -> {
                    project.setClientName(newProject.getClientName());   // Updated field names
                    project.setProgramName(newProject.getProgramName());
                    project.setDescription(newProject.getDescription());
                    project.setEngineeringManager(newProject.getEngineeringManager());
                    project.setScope(newProject.getScope());
                    project.setContractTypeName(newProject.getContractTypeName());
                    project.setPhaseName(newProject.getPhaseName());   // Dropdown field
                    project.setBudget(newProject.getBudget());
                    project.setStartDate(newProject.getStartDate()); // Set startDate
                    project.setEndDate(newProject.getEndDate());     // Set endDate
                    return projectRepository.save(project);
                }).orElseThrow(() -> new ProjectNotFoundException(projectID));
    }

    @Override
    public String deleteProject(Long projectID) {  // Updated parameter name
        if (!projectRepository.existsById(projectID)) {
            throw new ProjectNotFoundException(projectID);
        }
        projectRepository.deleteById(projectID);
        return "Project with ProjectID " + projectID + " has been deleted successfully.";
    }
}
