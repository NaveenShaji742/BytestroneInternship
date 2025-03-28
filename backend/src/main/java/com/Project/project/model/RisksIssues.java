package com.Project.project.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class RisksIssues {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment primary key
    private Long riskIssueID;

    @ManyToOne
    @JoinColumn(name = "projectID", nullable = false) // Foreign key to Project table
    private Project project;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private String severity;

    @Column(nullable = false)
    private String status;

    private String owner;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public RisksIssues() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getRiskIssueID() {
        return riskIssueID;
    }

    public void setRiskIssueID(Long riskIssueID) {
        this.riskIssueID = riskIssueID;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
