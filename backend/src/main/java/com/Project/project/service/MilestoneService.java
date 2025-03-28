package com.Project.project.service;

import com.Project.project.model.Milestone;
import com.Project.project.model.Project;
import com.Project.project.repository.MilestoneRepository;
import com.Project.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MilestoneService {

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private ProjectRepository projectRepository;

    // Add a milestone to a project
    public Milestone addMilestone(Long projectID, Milestone milestone) {
        Optional<Project> projectOptional = projectRepository.findById(projectID);
        if (projectOptional.isPresent()) {
            milestone.setProject(projectOptional.get());
            return milestoneRepository.save(milestone);
        }
        throw new RuntimeException("Project not found with ID: " + projectID);
    }

    // Get all milestones for a project
    public List<Milestone> getMilestonesByProject(Long projectID) {
        Optional<Project> projectOptional = projectRepository.findById(projectID);
        if (projectOptional.isPresent()) {
            return milestoneRepository.findByProject(projectOptional.get());
        }
        throw new RuntimeException("Project not found with ID: " + projectID);

    }

    // Get a single milestone
    public Optional<Milestone> getMilestoneById(Long milestoneID) {
        return milestoneRepository.findById(milestoneID);
    }

    // Update a milestone
    public Milestone updateMilestone(Long milestoneID, Milestone milestoneDetails) {
        return milestoneRepository.findById(milestoneID).map(milestone -> {
            milestone.setFeatureDescription(milestoneDetails.getFeatureDescription());
            milestone.setStartDate(milestoneDetails.getStartDate());
            milestone.setTargetDate(milestoneDetails.getTargetDate());
            milestone.setCurrentStatus(milestoneDetails.getCurrentStatus());
            milestone.setUpdatedAt(milestoneDetails.getUpdatedAt());
            return milestoneRepository.save(milestone);
        }).orElseThrow(() -> new RuntimeException("Milestone not found with ID: " + milestoneID));
    }

    // Delete a milestone
    public void deleteMilestone(Long milestoneID) {
        milestoneRepository.deleteById(milestoneID);
    }


}
