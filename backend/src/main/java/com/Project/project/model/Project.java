package com.Project.project.model;

import com.Project.project.dto.ProjectDTO;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment
    private Long projectID;

    @Column(nullable = false)
    private String clientName;

    @Column(unique = true, nullable = false)
    private String projectName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String engineeringManager;

    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal budget;
    private String status;
    @Column(columnDefinition = "TEXT")
    private String scope;

    @ManyToOne (cascade = CascadeType.ALL)
    @JoinColumn(name = "contract_id")
    private ContractType contractTypeName;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne (cascade = CascadeType.ALL)
    @JoinColumn(name = "phase_id")
    private Phase phaseName;

    public Throwable getId() {
        return null;
    }

    // Constructors
    public Project(){
        super();
    }
    public Project(ProjectDTO newProject) {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
//        this.phaseName=newProject.getPhaseName();
        this.description = newProject.getDescription();
        this.budget = newProject.getBudget();
        this.clientName = newProject.getClientName();
        this.endDate = newProject.getEndDate();
        this.engineeringManager = newProject.getEngineeringManager();
        this.projectName = newProject.getProjectName();
        this.scope = newProject.getScope();
        this.startDate = newProject.getStartDate();
    }


    // Getters and Setters

    public Long getProjectID() {
        return projectID;
    }

    public void setProjectID(Long projectID) {
        this.projectID = projectID;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEngineeringManager() {
        return engineeringManager;
    }

    public void setEngineeringManager(String engineeringManager) {
        this.engineeringManager = engineeringManager;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getBudget() {
        return budget;
    }

    public void setBudget(BigDecimal budget) {
        this.budget = budget;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public ContractType getContractTypeName() {
        return contractTypeName;
    }

    public void setContractTypeName(ContractType contractTypeName) {
        this.contractTypeName = contractTypeName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Phase getPhaseName() {
        return phaseName;
    }

    public void setPhaseName(Phase phaseName) {
        this.phaseName = phaseName;
    }

    public String getStatus() { return status;}

    public void setStatus(String status) {this.status = status;}

}
