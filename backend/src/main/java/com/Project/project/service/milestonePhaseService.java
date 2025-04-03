package com.Project.project.service;

import com.Project.project.model.MilestonePhase;
import com.Project.project.exception.MilestonePhaseNotFoundException;
import com.Project.project.repository.MilestonePhaseRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class milestonePhaseService {
    private final MilestonePhaseRepository milestonePhaseRepository;

    public milestonePhaseService(MilestonePhaseRepository milestonePhaseRepository) {
        this.milestonePhaseRepository = milestonePhaseRepository;
    }

    public List<MilestonePhase> getAllMilestonePhases() {
        return milestonePhaseRepository.findAll();
    }

    public MilestonePhase addMilestonePhase(MilestonePhase milestonePhase) {
        if (milestonePhaseRepository.findByName(milestonePhase.getName()).isPresent()) {
            throw new IllegalArgumentException("Milestone Phase name must be unique");
        }
        return milestonePhaseRepository.save(milestonePhase);
    }

    public MilestonePhase updateMilestonePhase(Long id, MilestonePhase updatedMilestonePhase) {
        return milestonePhaseRepository.findById(id).map(milestonePhase -> {
            milestonePhase.setName(updatedMilestonePhase.getName());
            milestonePhase.setDescription(updatedMilestonePhase.getDescription());
            milestonePhase.setStatus(updatedMilestonePhase.getStatus());
            return milestonePhaseRepository.save(milestonePhase);
        }).orElseThrow(() -> new MilestonePhaseNotFoundException(id));
    }

    public void deleteMilestonePhase(Long id) {
        if (!milestonePhaseRepository.existsById(id)) {
            throw new MilestonePhaseNotFoundException(id);
        }
        milestonePhaseRepository.deleteById(id);
    }
}
