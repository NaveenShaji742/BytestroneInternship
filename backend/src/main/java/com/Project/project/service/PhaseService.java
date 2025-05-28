package com.Project.project.service;

import com.Project.project.model.Phase;
import com.Project.project.exception.PhaseNotFoundException;
import com.Project.project.repository.PhaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhaseService {
    private final PhaseRepository phaseRepository;
    private final AuditTrailService auditTrailService;

    public PhaseService(PhaseRepository phaseRepository, AuditTrailService auditTrailService) {
        this.phaseRepository = phaseRepository;
        this.auditTrailService = auditTrailService;
    }

    public List<Phase> getAllPhases() {
        return phaseRepository.findAll();
    }

    public Phase addPhase(Phase phase) {
        if (phaseRepository.findByPhaseName(phase.getPhaseName()).isPresent()) {
            throw new IllegalArgumentException("Phase name must be unique");
        }
        Phase saved = phaseRepository.save(phase);
        auditTrailService.log("Phase", "ADD", "admin");
        return saved;
    }

    public Phase updatePhase(Long id, Phase updatedPhase) {
        return phaseRepository.findById(id).map(existing -> {
            if (!existing.getPhaseName().equals(updatedPhase.getPhaseName()) &&
                    phaseRepository.findByPhaseName(updatedPhase.getPhaseName()).isPresent()) {
                throw new IllegalArgumentException("Phase name must be unique");
            }
            existing.setPhaseName(updatedPhase.getPhaseName());
            existing.setDescription(updatedPhase.getDescription());
            existing.setStatus(updatedPhase.getStatus());
            auditTrailService.log("Phase", "EDIT", "admin");
            return phaseRepository.save(existing);
        }).orElseThrow(() -> new PhaseNotFoundException(id));
    }

    public void deletePhase(Long id) {
        if (!phaseRepository.existsById(id)) {
            throw new PhaseNotFoundException(id);
        }
        phaseRepository.deleteById(id);
        auditTrailService.log("Phase", "DELETE", "admin");
    }
}
