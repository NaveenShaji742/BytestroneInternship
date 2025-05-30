package com.Project.project.controller;

import com.Project.project.dto.MilestoneDTO;
import com.Project.project.model.Milestone;
import com.Project.project.model.Phase;
import com.Project.project.repository.PhaseRepository;
import com.Project.project.service.MilestoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/milestones")
public class MilestoneController {

    @Autowired
    private MilestoneService milestoneService;

    @Autowired
    private PhaseRepository phaseRepository;

    // Add a milestone to a project
    @PostMapping("/add/{projectID}")
    public Milestone addMilestone(@PathVariable Long projectID, @RequestBody MilestoneDTO milestoneDTO) {
        Milestone milestone = new Milestone();
        milestone.setMilestoneID(milestoneDTO.getMilestoneID());
        milestone.setSoWID(milestoneDTO.getSoWID());
        milestone.setTaskID(milestoneDTO.getTaskID());
        milestone.setFeatureDescription(milestoneDTO.getFeatureDescription());
        milestone.setStartDate(milestoneDTO.getStartDate());
        milestone.setTargetDate(milestoneDTO.getTargetDate());
        milestone.setCurrentStatus(milestoneDTO.getCurrentStatus());
        Phase phase = phaseRepository.findById(milestoneDTO.getCurrentPhase())
                .orElseThrow(() -> new RuntimeException("Phase not found with ID: " + milestoneDTO.getCurrentPhase()));
        milestone.setCurrentPhase(phase);
        return milestoneService.addMilestone(projectID, milestone);
    }

    // Get all milestones for a specific project
    @GetMapping("/project/{projectId}")
    public List<Milestone> getMilestoneByProjectId(@PathVariable Long projectId) {
        return milestoneService.getMilestonesByProject(projectId);
    }

    // Get all milestones
    @GetMapping("/project")
    public List<Milestone> getAllMilestones() {
        return milestoneService.getAllMilestones();
    }

    // Get a single milestone by ID
    @GetMapping("/{milestoneID}")
    public MilestoneDTO getMilestoneById(@PathVariable Long milestoneID) {
        Optional<Milestone> milestoneOpt = milestoneService.getMilestoneById(milestoneID);
        if (milestoneOpt.isEmpty()) {
            throw new RuntimeException("Milestone not found with ID: " + milestoneID);
        }
        Milestone milestone = milestoneOpt.get();
        MilestoneDTO milestoneDTO = new MilestoneDTO();
        milestoneDTO.setMilestoneID(milestone.getMilestoneID());
        milestoneDTO.setSoWID(milestone.getSoWID());
        milestoneDTO.setTaskID(milestone.getTaskID());
        milestoneDTO.setFeatureDescription(milestone.getFeatureDescription());
        milestoneDTO.setStartDate(milestone.getStartDate());
        milestoneDTO.setTargetDate(milestone.getTargetDate());
        milestoneDTO.setCurrentStatus(milestone.getCurrentStatus());
        milestoneDTO.setCurrentPhase(milestone.getCurrentPhase() != null ? milestone.getCurrentPhase().getId() : null);
        // Assuming Milestone has a Project reference
        milestoneDTO.setProjectID(milestone.getProject() != null ? milestone.getProject().getProjectID() : null);
        return milestoneDTO;
    }

    // Update a milestone
    @PutMapping("/update/{milestoneID}")
    public Milestone updateMilestone(@PathVariable Long milestoneID, @RequestBody MilestoneDTO milestoneDTO) {
        Milestone milestone = new Milestone();
        milestone.setMilestoneID(milestoneID);
        milestone.setSoWID(milestoneDTO.getSoWID());
        milestone.setTaskID(milestoneDTO.getTaskID());
        milestone.setFeatureDescription(milestoneDTO.getFeatureDescription());
        milestone.setStartDate(milestoneDTO.getStartDate());
        milestone.setTargetDate(milestoneDTO.getTargetDate());
        milestone.setCurrentStatus(milestoneDTO.getCurrentStatus());
        Phase phase = phaseRepository.findById(milestoneDTO.getCurrentPhase())
                .orElseThrow(() -> new RuntimeException("Phase not found with ID: " + milestoneDTO.getCurrentPhase()));
        milestone.setCurrentPhase(phase);
        return milestoneService.updateMilestone(milestoneID, milestone);
    }

    // Delete a milestone
    @DeleteMapping("/delete/{milestoneID}")
    public String deleteMilestone(@PathVariable Long milestoneID) {
        milestoneService.deleteMilestone(milestoneID);
        return "Milestone with ID " + milestoneID + " has been deleted.";
    }
}