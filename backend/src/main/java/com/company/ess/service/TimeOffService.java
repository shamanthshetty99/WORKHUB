package com.company.ess.service;

import com.company.ess.dto.PageResponse;
import com.company.ess.dto.TimeOffRequestDTO;
import com.company.ess.entity.Employee;
import com.company.ess.entity.TimeOffRequest;
import com.company.ess.exception.BadRequestException;
import com.company.ess.exception.ResourceNotFoundException;
import com.company.ess.repository.EmployeeRepository;
import com.company.ess.repository.TimeOffRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class TimeOffService {

    @Autowired
    private TimeOffRequestRepository timeOffRequestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public TimeOffRequestDTO getRequestById(Long id) {
        TimeOffRequest request = timeOffRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Time-off request not found with id: " + id));
        return convertToDTO(request);
    }

    public PageResponse<TimeOffRequestDTO> getAllRequests(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<TimeOffRequest> requestPage = timeOffRequestRepository.findAllByOrderByCreatedAtDesc(pageable);
        return convertToPageResponse(requestPage);
    }

    public PageResponse<TimeOffRequestDTO> getRequestsByEmployeeId(Long employeeId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<TimeOffRequest> requestPage = timeOffRequestRepository.findByEmployeeId(employeeId, pageable);
        return convertToPageResponse(requestPage);
    }

    public PageResponse<TimeOffRequestDTO> getRequestsByStatus(TimeOffRequest.Status status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<TimeOffRequest> requestPage = timeOffRequestRepository.findByStatus(status, pageable);
        return convertToPageResponse(requestPage);
    }

    @Transactional
    public TimeOffRequestDTO createRequest(TimeOffRequestDTO requestDTO) {
        // Validate employee exists
        Employee employee = employeeRepository.findById(requestDTO.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + requestDTO.getEmployeeId()));

        // Validate dates
        if (requestDTO.getStartDate().isAfter(requestDTO.getEndDate())) {
            throw new BadRequestException("Start date must be before or equal to end date");
        }

        TimeOffRequest request = new TimeOffRequest();
        request.setEmployeeId(requestDTO.getEmployeeId());
        request.setLeaveType(requestDTO.getLeaveType());
        request.setStartDate(requestDTO.getStartDate());
        request.setEndDate(requestDTO.getEndDate());
        request.setReason(requestDTO.getReason());
        request.setStatus(TimeOffRequest.Status.PENDING);

        // Calculate total days
        long daysBetween = ChronoUnit.DAYS.between(requestDTO.getStartDate(), requestDTO.getEndDate()) + 1;
        request.setTotalDays((int) daysBetween);

        TimeOffRequest savedRequest = timeOffRequestRepository.save(request);
        return convertToDTO(savedRequest);
    }

    @Transactional
    public TimeOffRequestDTO updateRequestStatus(Long requestId, TimeOffRequest.Status status, 
                                                  Long approverId, String rejectionReason) {
        TimeOffRequest request = timeOffRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Time-off request not found with id: " + requestId));

        // Validate status transition
        if (request.getStatus() != TimeOffRequest.Status.PENDING) {
            throw new BadRequestException("Cannot update status of a request that is not pending");
        }

        request.setStatus(status);

        if (status == TimeOffRequest.Status.APPROVED || status == TimeOffRequest.Status.REJECTED) {
            if (approverId != null) {
                request.setApprovedBy(approverId);
                request.setApprovedAt(LocalDateTime.now());
            }
        }

        if (status == TimeOffRequest.Status.REJECTED && rejectionReason != null) {
            request.setRejectionReason(rejectionReason);
        }

        TimeOffRequest updatedRequest = timeOffRequestRepository.save(request);
        return convertToDTO(updatedRequest);
    }

    @Transactional
    public void deleteRequest(Long id) {
        TimeOffRequest request = timeOffRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Time-off request not found with id: " + id));

        // Only allow deletion of pending or cancelled requests
        if (request.getStatus() == TimeOffRequest.Status.APPROVED) {
            throw new BadRequestException("Cannot delete an approved request");
        }

        timeOffRequestRepository.delete(request);
    }

    private TimeOffRequestDTO convertToDTO(TimeOffRequest request) {
        TimeOffRequestDTO dto = new TimeOffRequestDTO();
        dto.setId(request.getId());
        dto.setEmployeeId(request.getEmployeeId());
        dto.setLeaveType(request.getLeaveType());
        dto.setStartDate(request.getStartDate());
        dto.setEndDate(request.getEndDate());
        dto.setTotalDays(request.getTotalDays());
        dto.setReason(request.getReason());
        dto.setStatus(request.getStatus());
        dto.setApprovedById(request.getApprovedBy());
        dto.setApprovedAt(request.getApprovedAt());
        dto.setRejectionReason(request.getRejectionReason());
        dto.setCreatedAt(request.getCreatedAt());
        dto.setUpdatedAt(request.getUpdatedAt());

        // Get employee name
        employeeRepository.findById(request.getEmployeeId()).ifPresent(employee -> {
            dto.setEmployeeName(employee.getFirstName() + " " + employee.getLastName());
        });

        // Get approver name if exists
        if (request.getApprovedBy() != null) {
            employeeRepository.findById(request.getApprovedBy()).ifPresent(approver -> {
                dto.setApprovedByName(approver.getFirstName() + " " + approver.getLastName());
            });
        }

        return dto;
    }

    private PageResponse<TimeOffRequestDTO> convertToPageResponse(Page<TimeOffRequest> page) {
        PageResponse<TimeOffRequestDTO> response = new PageResponse<>();
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