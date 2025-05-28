package com.Project.project.service;

import com.Project.project.model.AuditTrail;
import com.Project.project.repository.AuditTrailRepository;
import org.springframework.stereotype.Service;

@Service
public class AuditTrailService {
    private final AuditTrailRepository auditTrailRepository;

    public AuditTrailService(AuditTrailRepository auditTrailRepository) {
        this.auditTrailRepository = auditTrailRepository;
    }

    public void log(String entityType, String action, String username) {
        auditTrailRepository.save(new AuditTrail(entityType, action, username));
    }
}
