package com.Project.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Project.project.model.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByUsername(String username);
}
