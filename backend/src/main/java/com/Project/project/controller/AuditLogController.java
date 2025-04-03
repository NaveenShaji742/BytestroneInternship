package com.Project.project.controller;

import com.Project.project.model.AuditLog;
import com.Project.project.repository.AuditLogRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin("*")
public class AuditLogController {
    private final AuditLogRepository auditLogRepository;

    public AuditLogController(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    // Retrieve audit logs for a given entity (e.g., "Phase" or "ContractType")
    @GetMapping("/{entityType}")
    public List<AuditLog> getAuditLogs(@PathVariable String entityType) {
        return auditLogRepository.findByEntityType(entityType);
    }
}
