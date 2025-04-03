package com.Project.project.exception;

public class MilestonePhaseNotFoundException extends RuntimeException {
    public MilestonePhaseNotFoundException(Long id) {
        super("Milestone Phase with ID " + id + " not found.");
    }
}
