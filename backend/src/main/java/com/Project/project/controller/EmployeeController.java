package com.Project.project.controller;

import com.Project.project.exception.EmployeeNotFoundException;  // Use the correct exception class
import com.Project.project.model.Employee;  // Ensure you are using the correct employee model
import com.Project.project.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeRepository projectRepository;  // Use the injected repository instance

    @PostMapping("/employee")
    public Employee newEmployee(@RequestBody Employee newEmployee) {
        return projectRepository.save(newEmployee);  // Use projectRepository to save the employee
    }

    @GetMapping("/employee")
    public List<Employee> getAllEmployees() {
        return projectRepository.findAll();  // Use projectRepository to fetch all employees
    }

    @GetMapping("/employee/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));  // Correct exception class
    }

    @PutMapping("/employee/{id}")
    public Employee updateEmployee(@RequestBody Employee newEmployee, @PathVariable Long id) {
        return projectRepository.findById(id)
                .map(employee -> {
                    employee.setName(newEmployee.getName());
                    employee.setUsername(newEmployee.getUsername());
                    employee.setPassword(newEmployee.getPassword());
                    return projectRepository.save(employee);  // Save the updated employee
                })
                .orElseThrow(() -> new EmployeeNotFoundException(id));  // Correct exception class
    }

    @DeleteMapping("/employee/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        if (!projectRepository.existsById(id)) {
            throw new EmployeeNotFoundException(id);  // Correct exception class
        }
        projectRepository.deleteById(id);
        return "Employee with id " + id + " has been deleted successfully.";  // Fixed message formatting
    }
}
