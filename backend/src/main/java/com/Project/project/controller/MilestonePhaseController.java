package com.Project.project.controller;

import com.Project.project.service.milestonePhaseService;
import com.Project.project.model.MilestonePhase;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/milestone-phases")
@CrossOrigin("*")
public class MilestonePhaseController {
    private final milestonePhaseService milestonePhaseService;

    public MilestonePhaseController(milestonePhaseService milestonePhaseService) {
        this.milestonePhaseService = milestonePhaseService;
    }

    @GetMapping
    public List<MilestonePhase> getAllMilestonePhases() {
        return milestonePhaseService.getAllMilestonePhases();
    }

    @PostMapping
    public MilestonePhase addMilestonePhase(@RequestBody MilestonePhase milestonePhase) {
        return milestonePhaseService.addMilestonePhase(milestonePhase);
    }

    @PutMapping("/{id}")
    public MilestonePhase updateMilestonePhase(@PathVariable Long id, @RequestBody MilestonePhase milestonePhase) {
        return milestonePhaseService.updateMilestonePhase(id, milestonePhase);
    }

    @DeleteMapping("/{id}")
    public String deleteMilestonePhase(@PathVariable Long id) {
        milestonePhaseService.deleteMilestonePhase(id);
        return "Milestone Phase deleted successfully!";
    }
}
