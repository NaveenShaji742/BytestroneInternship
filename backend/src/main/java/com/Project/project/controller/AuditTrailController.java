package com.Project.project.controller;

import com.Project.project.model.AuditTrail;
import com.Project.project.repository.AuditTrailRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
@CrossOrigin(origins = "*") // Adjust if needed
public class AuditTrailController {

    private final AuditTrailRepository auditTrailRepository;

    public AuditTrailController(AuditTrailRepository auditTrailRepository) {
        this.auditTrailRepository = auditTrailRepository;
    }

    // ✅ Get all audit logs
    @GetMapping
    public List<AuditTrail> getAllAuditLogs() {
        return auditTrailRepository.findAllByOrderByTimestampDesc();
    }

    // ✅ Filter by entity type (optional)
    @GetMapping("/{entityType}")
    public List<AuditTrail> getAuditLogsByEntity(@PathVariable String entityType) {
        return auditTrailRepository.findByEntityTypeOrderByTimestampDesc(entityType);
    }
}
