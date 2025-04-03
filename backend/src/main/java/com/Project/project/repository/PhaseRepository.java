
package com.Project.project.repository;

import com.Project.project.model.Phase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PhaseRepository extends JpaRepository<Phase, Long> {
    Optional<Phase> findByName(String name);
}
