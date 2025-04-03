package com.Project.project.exception;

public class EmployeeNotFoundException extends RuntimeException{
    public EmployeeNotFoundException(Long id){
        super("could not found the user with id " + id);
    }
}

