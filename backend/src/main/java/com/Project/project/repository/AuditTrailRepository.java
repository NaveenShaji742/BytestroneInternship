package com.Project.project.repository;

import com.Project.project.model.AuditTrail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditTrailRepository extends JpaRepository<AuditTrail, Long> {
    List<AuditTrail> findAllByOrderByTimestampDesc();
    List<AuditTrail> findByEntityTypeOrderByTimestampDesc(String entityType);
}
