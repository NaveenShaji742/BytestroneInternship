package com.Project.project.service;



import com.Project.project.model.Employee;
import com.Project.project.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee authenticate(String username, String password) {
        Employee employee = employeeRepository.findByUsername(username).get(0);
        if (employee != null && employee.getPassword().equals(password)) {
            return employee;
        }
        return null;
    }
}

