package com.Project.project.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class AuditTrail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String entityType; // "Phase" or "ContractType"
    private String action;     // "ADD", "EDIT", "DELETE"
    private String username;
    private LocalDateTime timestamp;

    public AuditTrail() {}

    public AuditTrail(String entityType, String action, String username) {
        this.entityType = entityType;
        this.action = action;
        this.username = username;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
