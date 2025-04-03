package com.Project.project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "milestone_phases", uniqueConstraints = @UniqueConstraint(columnNames = "name"))
public class MilestonePhase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    public enum Status {
        ACTIVE, INACTIVE, BLOCKED, ON_HOLD, COMPLETED
    }

    // Default Constructor
    public MilestonePhase() {}

    // Parameterized Constructor
    public MilestonePhase(String name, String description, Status status) {
        this.name = name;
        this.description = description;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}
