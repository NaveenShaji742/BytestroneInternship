package com.Project.project.exception;

public class ContractTypeNotFoundException extends RuntimeException {
    public ContractTypeNotFoundException(Long id) {
        super("Contract Type not found with id: " + id);
    }
}
