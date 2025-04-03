package com.Project.project.exception;

public class ContractTypeNotFoundException extends RuntimeException {
    public ContractTypeNotFoundException(Long id) {
        super("Contract Type with ID " + id + " not found.");
    }
}
