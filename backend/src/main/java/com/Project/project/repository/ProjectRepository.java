package com.Project.project.repository;

import com.Project.project.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    // Sort projects by budget in ascending order
    List<Project> findAllByOrderByBudgetAsc();

    // Sort projects by start date in ascending order
    List<Project> findAllByOrderByStartDateAsc();

    // Sort projects by created date in ascending order
    List<Project> findAllByOrderByCreatedAtAsc();
}
