package com.Project.project.dto;

import java.time.LocalDate;

public class MilestoneDTO {

    private Long milestoneID;
    private Long soWID;
    private Long taskID;
    private String featureDescription;
    private LocalDate startDate;
    private LocalDate targetDate;
    private String currentStatus;
    private Long currentPhase;
    private Long projectID; // ✅ Add this

    // Getters and Setters

    public Long getMilestoneID() {
        return milestoneID;
    }

    public void setMilestoneID(Long milestoneID) {
        this.milestoneID = milestoneID;
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

    public Long getCurrentPhase() {
        return currentPhase;
    }

    public void setCurrentPhase(Long currentPhase) {
        this.currentPhase = currentPhase;
    }

    public Long getProjectID() {
        return projectID;
    }

    public void setProjectID(Long projectID) {
        this.projectID = projectID;
    }
}
