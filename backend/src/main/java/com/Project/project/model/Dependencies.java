package com.Project.project.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Dependencies {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment primary key
    private Long dependencyID;

    @ManyToOne
    @JoinColumn(name = "projectID", nullable = false) // Foreign key to Project table
    private Project project;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private String owner;

    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public Dependencies() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getDependencyID() {
        return dependencyID;
    }

    public void setDependencyID(Long dependencyID) {
        this.dependencyID = dependencyID;
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

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
