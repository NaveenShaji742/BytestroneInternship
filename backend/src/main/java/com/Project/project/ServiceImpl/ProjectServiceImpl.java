package com.Project.project.ServiceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Project.project.exception.ProjectNotFoundException;
import com.Project.project.model.Project;
import com.Project.project.repository.ProjectRepository;
import com.Project.project.service.ProjectService;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project saveProject(Project newProject) {
        return projectRepository.save(newProject);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProjectByProjectID(Long projectID) {
        return projectRepository.findById(projectID)
                .orElseThrow(() -> new ProjectNotFoundException(projectID));
    }

    @Override
    public Project updateProject(Project newProject, Long projectID) {
        return projectRepository.findById(projectID)
                .map(existingProject -> updateExistingProject(existingProject, newProject))
                .orElseThrow(() -> new ProjectNotFoundException(projectID));
    }

    private Project updateExistingProject(Project existingProject, Project newProject) {
        existingProject.setClientName(newProject.getClientName());
        existingProject.setProjectName(newProject.getProjectName());
        existingProject.setDescription(newProject.getDescription());
        existingProject.setEngineeringManager(newProject.getEngineeringManager());
        existingProject.setScope(newProject.getScope());
        existingProject.setContractTypeName(newProject.getContractTypeName());
        existingProject.setPhaseName(newProject.getPhaseName());
        existingProject.setBudget(newProject.getBudget());
        existingProject.setStartDate(newProject.getStartDate());
        existingProject.setEndDate(newProject.getEndDate());
        return projectRepository.save(existingProject);
    }

    @Override
    public String deleteProject(Long projectID) {
        if (!projectRepository.existsById(projectID)) {
            throw new ProjectNotFoundException(projectID);
        }
        projectRepository.deleteById(projectID);
        return String.format("Project with ID %d has been deleted successfully.", projectID);
    }
}