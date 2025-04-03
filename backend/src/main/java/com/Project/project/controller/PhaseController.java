

package com.Project.project.controller;

import com.Project.project.model.Phase;
import com.Project.project.service.PhaseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/phases")
@CrossOrigin("*")
public class PhaseController {
    private final PhaseService phaseService;

    public PhaseController(PhaseService phaseService) {
        this.phaseService = phaseService;
    }

    @GetMapping
    public List<Phase> getAllPhases() {
        return phaseService.getAllPhases();
    }

    @PostMapping
    public Phase addPhase(@RequestBody Phase phase) {
        return phaseService.addPhase(phase);
    }

    @PutMapping("/{id}")
    public Phase updatePhase(@PathVariable Long id, @RequestBody Phase phase) {
        return phaseService.updatePhase(id, phase);
    }

    @DeleteMapping("/{id}")
    public String deletePhase(@PathVariable Long id) {
        phaseService.deletePhase(id);
        return "Phase deleted successfully!";
    }
}
