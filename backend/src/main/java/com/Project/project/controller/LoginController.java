package com.Project.project.controller;


import com.Project.project.model.User;
import com.Project.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        User authenticatedUser = userService.authenticate(user.getUsername(), user.getPassword());
        if (authenticatedUser != null) {
            return ResponseEntity.ok(authenticatedUser.getRoles());
        }
//        return ResponseEntity.status(401).body("Invalid credentials");
        return ResponseEntity.ok("Login failed");
    }

}
