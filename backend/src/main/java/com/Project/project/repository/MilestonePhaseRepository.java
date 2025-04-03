package com.Project.project.repository;

import com.Project.project.model.MilestonePhase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MilestonePhaseRepository extends JpaRepository<MilestonePhase, Long> {
    Optional<MilestonePhase> findByName(String name);
}
