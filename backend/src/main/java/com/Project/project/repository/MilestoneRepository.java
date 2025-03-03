package com.Project.project.repository;

import com.Project.project.model.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
    List<Milestone> findByProject_ProjectID(Long projectID); // Find milestones by project ID
}
