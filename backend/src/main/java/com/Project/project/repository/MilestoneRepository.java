package com.Project.project.repository;

import com.Project.project.model.Milestone;
import com.Project.project.model.Project;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
    List<Milestone> findByProject(Project projectID); // Find milestones by project ID

    @Modifying
    @Transactional
    void deleteByProjectId(Long id);
}
