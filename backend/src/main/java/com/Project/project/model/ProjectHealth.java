package com.Project.project.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ProjectHealth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment primary key
    private Long healthID;

    @ManyToOne
    @JoinColumn(name = "projectID", nullable = false) // Foreign key to Project table
    private Project project;

    @Column(nullable = false)
    private String overallHealth;

    @Column(nullable = false)
    private String scheduleStatus;

    @Column(nullable = false)
    private String scopeStatus;

    @Column(nullable = false)
    private String budgetStatus;

    private String keyHighlights;
    private String keyDelays;
    private String concernsChallenges;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public ProjectHealth() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getHealthID() {
        return healthID;
    }

    public void setHealthID(Long healthID) {
        this.healthID = healthID;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getOverallHealth() {
        return overallHealth;
    }

    public void setOverallHealth(String overallHealth) {
        this.overallHealth = overallHealth;
    }

    public String getScheduleStatus() {
        return scheduleStatus;
    }

    public void setScheduleStatus(String scheduleStatus) {
        this.scheduleStatus = scheduleStatus;
    }

    public String getScopeStatus() {
        return scopeStatus;
    }

    public void setScopeStatus(String scopeStatus) {
        this.scopeStatus = scopeStatus;
    }

    public String getBudgetStatus() {
        return budgetStatus;
    }

    public void setBudgetStatus(String budgetStatus) {
        this.budgetStatus = budgetStatus;
    }

    public String getKeyHighlights() {
        return keyHighlights;
    }

    public void setKeyHighlights(String keyHighlights) {
        this.keyHighlights = keyHighlights;
    }

    public String getKeyDelays() {
        return keyDelays;
    }

    public void setKeyDelays(String keyDelays) {
        this.keyDelays = keyDelays;
    }

    public String getConcernsChallenges() {
        return concernsChallenges;
    }

    public void setConcernsChallenges(String concernsChallenges) {
        this.concernsChallenges = concernsChallenges;
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
