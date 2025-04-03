
package com.Project.project.service;

import com.Project.project.model.ContractType;
import com.Project.project.exception.ContractTypeNotFoundException;
import com.Project.project.repository.ContractTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractTypeService {
    private final ContractTypeRepository contractTypeRepository;

    public ContractTypeService(ContractTypeRepository contractTypeRepository) {
        this.contractTypeRepository = contractTypeRepository;
    }

    public List<ContractType> getAllContractTypes() {
        return contractTypeRepository.findAll();
    }

    public ContractType addContractType(ContractType contractType) {
        if (contractTypeRepository.findByName(contractType.getName()).isPresent()) {
            throw new IllegalArgumentException("Contract Type name must be unique");
        }
        return contractTypeRepository.save(contractType);
    }

    public ContractType updateContractType(Long id, ContractType updatedContractType) {
        return contractTypeRepository.findById(id).map(contractType -> {
            if (!contractType.getName().equals(updatedContractType.getName()) &&
                    contractTypeRepository.findByName(updatedContractType.getName()).isPresent()) {
                throw new IllegalArgumentException("Contract Type name must be unique");
            }
            contractType.setName(updatedContractType.getName());
            contractType.setContractCode(updatedContractType.getContractCode());
            contractType.setDescription(updatedContractType.getDescription());
            return contractTypeRepository.save(contractType);
        }).orElseThrow(() -> new ContractTypeNotFoundException(id));
    }

    public void deleteContractType(Long id) {
        if (!contractTypeRepository.existsById(id)) {
            throw new ContractTypeNotFoundException(id);
        }
        contractTypeRepository.deleteById(id);
    }
}
