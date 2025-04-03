
package com.Project.project.service;

import com.Project.project.model.Phase;
import com.Project.project.exception.PhaseNotFoundException;
import com.Project.project.repository.PhaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhaseService {
    private final PhaseRepository phaseRepository;

    public PhaseService(PhaseRepository phaseRepository) {
        this.phaseRepository = phaseRepository;
    }

    public List<Phase> getAllPhases() {
        return phaseRepository.findAll();
    }

    public Phase addPhase(Phase phase) {
        if (phaseRepository.findByName(phase.getName()).isPresent()) {
            throw new IllegalArgumentException("Phase name must be unique");
        }
        return phaseRepository.save(phase);
    }

    public Phase updatePhase(Long id, Phase updatedPhase) {
        return phaseRepository.findById(id).map(phase -> {
            if (!phase.getName().equals(updatedPhase.getName()) &&
                    phaseRepository.findByName(updatedPhase.getName()).isPresent()) {
                throw new IllegalArgumentException("Phase name must be unique");
            }
            phase.setName(updatedPhase.getName());
            phase.setDescription(updatedPhase.getDescription());
            phase.setStatus(updatedPhase.getStatus());
            return phaseRepository.save(phase);
        }).orElseThrow(() -> new PhaseNotFoundException(id));
    }

    public void deletePhase(Long id) {
        if (!phaseRepository.existsById(id)) {
            throw new PhaseNotFoundException(id);
        }
        phaseRepository.deleteById(id);
    }
}
