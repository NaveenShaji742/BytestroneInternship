package com.Project.project.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Milestone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment
    private Long milestoneID;

    @ManyToOne
    @JoinColumn(name = "projectID", nullable = false) // Foreign key reference to Project table
    private Project project;

    private Long soWID;
    private Long taskID;

    @Column(columnDefinition = "TEXT")
    private String featureDescription;

    private LocalDate startDate;
    private LocalDate targetDate;

    private String currentStatus;

    @ManyToOne
    @JoinColumn(name = "current_phase", nullable = false)

    private Phase currentPhase;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public Milestone() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getMilestoneID() {
        return milestoneID;
    }

    public void setMilestoneID(Long milestoneID) {
        this.milestoneID = milestoneID;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Long getSoWID() {
        return soWID;
    }

    public void setSoWID(Long soWID) {
        this.soWID = soWID;
    }

    public Long getTaskID() {
        return taskID;
    }

    public void setTaskID(Long taskID) {
        this.taskID = taskID;
    }

    public String getFeatureDescription() {
        return featureDescription;
    }

    public void setFeatureDescription(String featureDescription) {
        this.featureDescription = featureDescription;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(LocalDate targetDate) {
        this.targetDate = targetDate;
    }

    public String getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(String currentStatus) {
        this.currentStatus = currentStatus;
    }

    public Phase getCurrentPhase() {
        return currentPhase;
    }

    public void setCurrentPhase(Phase currentPhase) {
        this.currentPhase = currentPhase;
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

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Milestone{" +
                "milestoneID=" + milestoneID +
                ", project=" + project +
                ", soWID=" + soWID +
                ", taskID=" + taskID +
                ", featureDescription='" + featureDescription + '\'' +
                ", startDate=" + startDate +
                ", targetDate=" + targetDate +
                ", currentStatus='" + currentStatus + '\'' +
                ", currentPhase=" + currentPhase +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
