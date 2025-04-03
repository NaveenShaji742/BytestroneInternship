package com.Project.project.exception;

public class PhaseNotFoundException extends RuntimeException {
    public PhaseNotFoundException(Long id) {
        super("Phase with ID " + id + " not found.");
    }
}
