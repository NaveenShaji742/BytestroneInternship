
package com.Project.project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "contract_types", uniqueConstraints = @UniqueConstraint(columnNames = "name"))
public class ContractType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(unique = true)
    private String contractCode;

    private String description;

    // Default Constructor
    public ContractType() {}

    // Parameterized Constructor
    public ContractType(String name, String contractCode, String description) {
        this.name = name;
        this.contractCode = contractCode;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContractCode() {
        return contractCode;
    }

    public void setContractCode(String contractCode) {
        this.contractCode = contractCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

