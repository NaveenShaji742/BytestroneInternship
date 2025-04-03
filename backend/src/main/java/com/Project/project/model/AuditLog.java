package com.Project.project.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String entityType;    // e.g., "Phase" or "ContractType"
    private String action;        // "ADD", "EDIT", "DELETE"
    private String performedBy;   // Username performing the action
    private LocalDateTime timestamp;

    public AuditLog() {}

    public AuditLog(String entityType, String action, String performedBy, LocalDateTime timestamp) {
        this.entityType = entityType;
        this.action = action;
        this.performedBy = performedBy;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public String getEntityType() { return entityType; }
    public String getAction() { return action; }
    public String getPerformedBy() { return performedBy; }
    public LocalDateTime getTimestamp() { return timestamp; }

    public void setId(Long id) { this.id = id; }
    public void setEntityType(String entityType) { this.entityType = entityType; }
    public void setAction(String action) { this.action = action; }
    public void setPerformedBy(String performedBy) { this.performedBy = performedBy; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
