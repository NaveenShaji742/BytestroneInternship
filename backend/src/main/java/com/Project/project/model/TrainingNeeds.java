package com.Project.project.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class TrainingNeeds {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment primary key
    private Long trainingNeedID;

    @ManyToOne
    @JoinColumn(name = "projectID", nullable = false) // Foreign key to Project table
    private Project project;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private int numberOfTeamMembers;

    @Column(nullable = false)
    private String priority;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public TrainingNeeds() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getTrainingNeedID() {
        return trainingNeedID;
    }

    public void setTrainingNeedID(Long trainingNeedID) {
        this.trainingNeedID = trainingNeedID;
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

    public int getNumberOfTeamMembers() {
        return numberOfTeamMembers;
    }

    public void setNumberOfTeamMembers(int numberOfTeamMembers) {
        this.numberOfTeamMembers = numberOfTeamMembers;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
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
