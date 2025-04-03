package com.Project.project.controller;


import com.Project.project.model.Employee;
import com.Project.project.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private EmployeeService EmployeeService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Employee employee) {
        Employee authenticatedEmployee = EmployeeService.authenticate(employee.getUsername(), employee.getPassword());
        if (authenticatedEmployee != null) {
            return ResponseEntity.ok(authenticatedEmployee.getRoles());
        }
//        return ResponseEntity.status(401).body("Invalid credentials");
        return ResponseEntity.ok("Login failed");
    }

}
