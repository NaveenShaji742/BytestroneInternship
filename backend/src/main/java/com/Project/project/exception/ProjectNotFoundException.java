package com.Project.project.exception;

public class ProjectNotFoundException extends RuntimeException {
    public ProjectNotFoundException(Long projectID) {
        super("Could not find the project with ProjectID " + projectID);
    }
}
