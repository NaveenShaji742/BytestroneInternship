package com.Project.project.controller;

import com.Project.project.dto.ProjectDTO;
import com.Project.project.exception.ProjectNotFoundException;
import com.Project.project.model.Project;
import com.Project.project.repository.ContractTypeRepository;
import com.Project.project.repository.PhaseRepository;
import com.Project.project.repository.ProjectRepository;
import com.Project.project.repository.MilestoneRepository;
import com.Project.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin("*")
public class ProjectController {

    private static final Logger logger = LoggerFactory.getLogger(ProjectController.class);

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private PhaseRepository phaseRepo;

    @Autowired
    private ContractTypeRepository contractTypeRepo;

    @Autowired
    private MilestoneRepository milestoneRepository; // Inject MilestoneRepository

    // Create a new project
    @PostMapping("/project")
    public ResponseEntity<Project> newProject(@RequestBody ProjectDTO newProject) {
        try {
            Project project = new Project(newProject);
            project.setCreatedAt(LocalDateTime.now());
            project.setUpdatedAt(LocalDateTime.now());
            project.setStatus("ACTIVE");
            project.setContractTypeName(contractTypeRepo.findByName(newProject.getContractTypeName()).get());
            project.setPhaseName(phaseRepo.findByPhaseName(newProject.getPhaseName()).get());
            Project savedProject = projectRepository.save(project);
            logger.info("Created new project with ID: {}", savedProject.getId());
            return ResponseEntity.ok(savedProject);
        } catch (Exception e) {
            logger.error("Failed to create project: {}", e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }

    // Get all projects
    @GetMapping("/project")
    public ResponseEntity<List<Project>> getAllProjects() {
        try {
            List<Project> projects = projectRepository.findByStatus("ACTIVE");
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            logger.error("Failed to fetch projects: {}", e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }

    // Get a project by ID
    @GetMapping("/project/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        try {
            Project project = projectRepository.findById(id)
                    .orElseThrow(() -> new ProjectNotFoundException(id));
            return ResponseEntity.ok(project);
        } catch (ProjectNotFoundException e) {
            logger.warn("Project not found with ID: {}", id);
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            logger.error("Failed to fetch project with ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }

    // Update an existing project
    @PutMapping("/project/{id}")
    public ResponseEntity<Project> updateProject(@RequestBody ProjectDTO newProject, @PathVariable Long id) {
        try {
            Project updatedProject = projectRepository.findById(id)
                    .map(project -> {
                        project.setClientName(newProject.getClientName());
                        project.setProjectName(newProject.getProjectName());
                        project.setDescription(newProject.getDescription());
                        project.setEngineeringManager(newProject.getEngineeringManager());
                        project.setStartDate(newProject.getStartDate());
                        project.setEndDate(newProject.getEndDate());
                        project.setBudget(newProject.getBudget());
                        project.setScope(newProject.getScope());
                        project.setContractTypeName(contractTypeRepo.findByName(newProject.getContractTypeName()).get());
                        project.setPhaseName(phaseRepo.findByPhaseName(newProject.getPhaseName()).get());
                        project.setUpdatedAt(LocalDateTime.now());
                        return projectRepository.save(project);
                    }).orElseThrow(() -> new ProjectNotFoundException(id));
            logger.info("Updated project with ID: {}", id);
            return ResponseEntity.ok(updatedProject);
        } catch (ProjectNotFoundException e) {
            logger.warn("Project not found with ID: {}", id);
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            logger.error("Failed to update project with ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }

    // Delete a project
    @DeleteMapping("/project/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        try {
            if (!projectRepository.existsById(id)) {
                throw new ProjectNotFoundException(id);
            }

            // Delete all milestones associated with the project first
            milestoneRepository.deleteByProjectId(id);

            // Delete the project
            Optional<Project> byId = projectRepository.findById(id);
            Project project = byId.get();
            project.setStatus("INACTIVE");
            projectRepository.save(project);
            logger.info("Deleted project with ID: {}", id);
            return ResponseEntity.ok("Project with ID " + id + " has been deleted successfully.");
        } catch (ProjectNotFoundException e) {
            logger.warn("Project not found with ID: {}", id);
            return ResponseEntity.status(404).body("Project with ID " + id + " not found.");
        } catch (Exception e) {
            logger.error("Failed to delete project with ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(500).body("Failed to delete project with ID " + id + ": " + e.getMessage());
        }
    }

    // Get sorted projects
    @GetMapping("/project/sorted/{sortBy}")
    public ResponseEntity<List<Project>> getSortedProjects(@PathVariable String sortBy) {
        try {
            List<Project> projects;
            switch (sortBy.toLowerCase()) {
                case "budget":
                    projects = projectRepository.findAllByOrderByBudgetAsc();
                    break;
                case "startdate":
                    projects = projectRepository.findAllByOrderByStartDateAsc();
                    break;
                default:
                    throw new IllegalArgumentException("Invalid sort criteria: " + sortBy);
            }
            return ResponseEntity.ok(projects);
        } catch (IllegalArgumentException e) {
            logger.warn("Invalid sort criteria: {}", sortBy);
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            logger.error("Failed to fetch sorted projects: {}", e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }
}