
package com.Project.project.controller;

import com.Project.project.model.ContractType;
import com.Project.project.service.ContractTypeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contract-types")
@CrossOrigin("*")
public class ContractTypeController {
    private final ContractTypeService contractTypeService;

    public ContractTypeController(ContractTypeService contractTypeService) {
        this.contractTypeService = contractTypeService;
    }

    @GetMapping
    public List<ContractType> getAllContractTypes() {
        return contractTypeService.getAllContractTypes();
    }

    @PostMapping
    public ContractType addContractType(@RequestBody ContractType contractType) {
        return contractTypeService.addContractType(contractType);
    }

    @PutMapping("/{id}")
    public ContractType updateContractType(@PathVariable Long id, @RequestBody ContractType contractType) {
        return contractTypeService.updateContractType(id, contractType);
    }

    @DeleteMapping("/{id}")
    public String deleteContractType(@PathVariable Long id) {
        contractTypeService.deleteContractType(id);
        return "Contract Type deleted successfully!";
    }
}

