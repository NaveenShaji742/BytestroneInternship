// src/main/java/com/project/model/HealthUpdate.java
package com.Project.project.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="health_updates")
public class HealthUpdate {
    @Id @GeneratedValue
    private Long id;

    private Long projectId;

    @Enumerated(EnumType.STRING)
    private Status overallHealth;      // GREEN/AMBER/RED
    @Enumerated(EnumType.STRING)
    private Status scheduleHealth;
    @Enumerated(EnumType.STRING)
    private Status scopeHealth;
    @Enumerated(EnumType.STRING)
    private Status budgetHealth;

    @Column(length=300)
    private String highlight1, highlight2, highlight3;
    @Column(length=300)
    private String delay1, delay2, delay3;
    @Column(length=300)
    private String concern1, concern2, concern3;

    @Column(length=1000)
    private String risks;      // JSON or text
    @Column(length=1000)
    private String dependencies;
    @Column(length=1000)
    private String trainingNeeds;

    private LocalDateTime timestamp = LocalDateTime.now();

    public enum Status { GREEN, AMBER, RED }
    // getters & setters omitted for brevity
}
