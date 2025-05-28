package com.Project.project.service;

import com.Project.project.exception.ContractTypeNotFoundException;
import com.Project.project.model.ContractType;
import com.Project.project.repository.ContractTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractTypeService {
    private final ContractTypeRepository contractTypeRepository;
    private final AuditTrailService auditTrailService;

    public ContractTypeService(ContractTypeRepository contractTypeRepository, AuditTrailService auditTrailService) {
        this.contractTypeRepository = contractTypeRepository;
        this.auditTrailService = auditTrailService;
    }

    public List<ContractType> getAll() {
        return contractTypeRepository.findAll();
    }

    public ContractType add(ContractType contractType) {
        if (contractTypeRepository.findByName(contractType.getName()).isPresent()) {
            throw new IllegalArgumentException("Contract type name must be unique");
        }
        ContractType saved = contractTypeRepository.save(contractType);
        auditTrailService.log("ContractType", "ADD", "admin");
        return saved;
    }

    public ContractType update(Long id, ContractType updated) {
        return contractTypeRepository.findById(id).map(existing -> {
            if (!existing.getName().equals(updated.getName()) &&
                    contractTypeRepository.findByName(updated.getName()).isPresent()) {
                throw new IllegalArgumentException("Contract type name must be unique");
            }
            existing.setName(updated.getName());
            existing.setCode(updated.getCode());
            existing.setDescription(updated.getDescription());
            auditTrailService.log("ContractType", "EDIT", "admin");
            return contractTypeRepository.save(existing);
        }).orElseThrow(() -> new ContractTypeNotFoundException(id));
    }

    public void delete(Long id) {
        if (!contractTypeRepository.existsById(id)) {
            throw new ContractTypeNotFoundException(id);
        }
        contractTypeRepository.deleteById(id);
        auditTrailService.log("ContractType", "DELETE", "admin");
    }
}
