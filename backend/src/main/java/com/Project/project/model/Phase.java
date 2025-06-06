package com.Project.project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "phases", uniqueConstraints = @UniqueConstraint(columnNames = "name"))
public class Phase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String phaseName;

    private String description;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    public enum Status {
        ACTIVE, INACTIVE, BLOCKED, ON_HOLD, READY_FOR_DEMO
    }

    // Default Constructor
    public Phase() {}

    // Parameterized Constructor
    public Phase(Long id, String phaseName, String description, Status status) {
        this.id = id;
        this.phaseName = phaseName;
        this.description = description;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getPhaseName() {
        return phaseName;
    }

    public void setPhaseName(String phaseName) {
        this.phaseName = phaseName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    // toString() method
    @Override
    public String toString() {
        return "Phase{" +
                "id=" + id +
                ", name='" + phaseName + '\'' +
                ", description='" + description + '\'' +
                ", status=" + status +
                '}';
    }
}
