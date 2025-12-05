package com.company.ess.service;

import com.company.ess.dto.EmployeeDTO;
import com.company.ess.dto.PageResponse;
import com.company.ess.entity.Employee;
import com.company.ess.exception.BadRequestException;
import com.company.ess.exception.ResourceNotFoundException;
import com.company.ess.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        return convertToDTO(employee);
    }

    public EmployeeDTO getEmployeeByEmail(String email) {
        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with email: " + email));
        return convertToDTO(employee);
    }

    public PageResponse<EmployeeDTO> getAllEmployees(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Employee> employeePage = employeeRepository.findAll(pageable);
        return convertToPageResponse(employeePage);
    }

    public PageResponse<EmployeeDTO> searchEmployees(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Employee> employeePage = employeeRepository.searchEmployees(query, pageable);
        return convertToPageResponse(employeePage);
    }

    @Transactional
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        // Check if email already exists
        if (employeeRepository.findByEmail(employeeDTO.getEmail()).isPresent()) {
            throw new BadRequestException("Email already exists: " + employeeDTO.getEmail());
        }

        // Check if employee code already exists
        if (employeeRepository.findByEmployeeCode(employeeDTO.getEmployeeCode()).isPresent()) {
            throw new BadRequestException("Employee code already exists: " + employeeDTO.getEmployeeCode());
        }

        Employee employee = convertToEntity(employeeDTO);
        
        // Encode password if provided
        if (employeeDTO.getEmail() != null) {
            employee.setPassword(passwordEncoder.encode("DefaultPassword123!"));
        }

        Employee savedEmployee = employeeRepository.save(employee);
        return convertToDTO(savedEmployee);
    }

    @Transactional
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        // Update fields
        if (employeeDTO.getFirstName() != null) {
            existingEmployee.setFirstName(employeeDTO.getFirstName());
        }
        if (employeeDTO.getLastName() != null) {
            existingEmployee.setLastName(employeeDTO.getLastName());
        }
        if (employeeDTO.getPhone() != null) {
            existingEmployee.setPhone(employeeDTO.getPhone());
        }
        if (employeeDTO.getDateOfBirth() != null) {
            existingEmployee.setDateOfBirth(employeeDTO.getDateOfBirth());
        }
        if (employeeDTO.getGender() != null) {
            existingEmployee.setGender(employeeDTO.getGender());
        }
        if (employeeDTO.getAddress() != null) {
            existingEmployee.setAddress(employeeDTO.getAddress());
        }
        if (employeeDTO.getCity() != null) {
            existingEmployee.setCity(employeeDTO.getCity());
        }
        if (employeeDTO.getState() != null) {
            existingEmployee.setState(employeeDTO.getState());
        }
        if (employeeDTO.getZipCode() != null) {
            existingEmployee.setZipCode(employeeDTO.getZipCode());
        }
        if (employeeDTO.getCountry() != null) {
            existingEmployee.setCountry(employeeDTO.getCountry());
        }

        Employee updatedEmployee = employeeRepository.save(existingEmployee);
        return convertToDTO(updatedEmployee);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        
        // Soft delete - set isActive to false
        employee.setIsActive(false);
        employeeRepository.save(employee);
    }

    public EmployeeDTO convertToDTO(Employee employee) {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(employee.getId());
        dto.setEmployeeCode(employee.getEmployeeCode());
        dto.setEmail(employee.getEmail());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setPhone(employee.getPhone());
        dto.setDateOfBirth(employee.getDateOfBirth());
        dto.setGender(employee.getGender());
        dto.setDepartment(employee.getDepartment());
        dto.setPosition(employee.getPosition());
        dto.setManagerId(employee.getManagerId());
        dto.setHireDate(employee.getHireDate());
        dto.setSalary(employee.getSalary());
        dto.setAddress(employee.getAddress());
        dto.setCity(employee.getCity());
        dto.setState(employee.getState());
        dto.setZipCode(employee.getZipCode());
        dto.setCountry(employee.getCountry());
        dto.setProfileImageUrl(employee.getProfileImageUrl());
        dto.setIsActive(employee.getIsActive());
        dto.setRole(employee.getRole());
        dto.setCreatedAt(employee.getCreatedAt());
        dto.setUpdatedAt(employee.getUpdatedAt());

        // Get manager name if manager exists
        if (employee.getManagerId() != null) {
            employeeRepository.findById(employee.getManagerId()).ifPresent(manager -> {
                dto.setManagerName(manager.getFirstName() + " " + manager.getLastName());
            });
        }

        return dto;
    }

    private Employee convertToEntity(EmployeeDTO dto) {
        Employee employee = new Employee();
        employee.setEmployeeCode(dto.getEmployeeCode());
        employee.setEmail(dto.getEmail());
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setPhone(dto.getPhone());
        employee.setDateOfBirth(dto.getDateOfBirth());
        employee.setGender(dto.getGender());
        employee.setDepartment(dto.getDepartment());
        employee.setPosition(dto.getPosition());
        employee.setManagerId(dto.getManagerId());
        employee.setHireDate(dto.getHireDate());
        employee.setSalary(dto.getSalary());
        employee.setAddress(dto.getAddress());
        employee.setCity(dto.getCity());
        employee.setState(dto.getState());
        employee.setZipCode(dto.getZipCode());
        employee.setCountry(dto.getCountry());
        employee.setProfileImageUrl(dto.getProfileImageUrl());
        employee.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);
        employee.setRole(dto.getRole() != null ? dto.getRole() : Employee.Role.EMPLOYEE);
        return employee;
    }

    private PageResponse<EmployeeDTO> convertToPageResponse(Page<Employee> page) {
        PageResponse<EmployeeDTO> response = new PageResponse<>();
        response.setContent(page.getContent().stream().map(this::convertToDTO).toList());
        response.setPageNumber(page.getNumber());
        response.setPageSize(page.getSize());
        response.setTotalElements(page.getTotalElements());
        response.setTotalPages(page.getTotalPages());
        response.setLast(page.isLast());
        response.setFirst(page.isFirst());
        return response;
    }
}