package com.Project.project.controller;

import com.Project.project.exception.ProjectNotFoundException;
import com.Project.project.model.Project;
import com.Project.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("*")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    // Create a new project
    @PostMapping("/project")
    public Project newProject(@RequestBody Project newProject) {
        newProject.setCreatedAt(LocalDateTime.now()); // Set created time
        newProject.setUpdatedAt(LocalDateTime.now()); // Set updated time
        return projectRepository.save(newProject);
    }

    // Get all projects
    @GetMapping("/project")
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Get a project by ID
    @GetMapping("/project/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ProjectNotFoundException(id));
    }

    // Update an existing project
    @PutMapping("/project/{id}")
    public Project updateProject(@RequestBody Project newProject, @PathVariable Long id) {
        return projectRepository.findById(id)
                .map(project -> {
                    project.setClientName(newProject.getClientName());
                    project.setProgramName(newProject.getProgramName());
                    project.setDescription(newProject.getDescription());
                    project.setEngineeringManager(newProject.getEngineeringManager());
                    project.setStartDate(newProject.getStartDate());
                    project.setEndDate(newProject.getEndDate());
                    project.setBudget(newProject.getBudget());
                    project.setScope(newProject.getScope());
                    project.setContractTypeName(newProject.getContractTypeName());
                    project.setPhaseName(newProject.getPhaseName()); // Updating phase dropdown
                    project.setUpdatedAt(LocalDateTime.now()); // Update timestamp
                    return projectRepository.save(project);
                }).orElseThrow(() -> new ProjectNotFoundException(id));
    }

    // Delete a project
    @DeleteMapping("/project/{id}")
    public String deleteProject(@PathVariable Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ProjectNotFoundException(id);
        }
        projectRepository.deleteById(id);
        return "Project with ID " + id + " has been deleted successfully.";
    }

    // Get sorted projects
    @GetMapping("/project/sorted/{sortBy}")
    public List<Project> getSortedProjects(@PathVariable String sortBy) {
        switch (sortBy.toLowerCase()) {
            case "budget":
                return projectRepository.findAllByOrderByBudgetAsc();
            case "startdate":
                return projectRepository.findAllByOrderByStartDateAsc();
            default:
                throw new IllegalArgumentException("Invalid sort criteria: " + sortBy);
        }
    }
}
