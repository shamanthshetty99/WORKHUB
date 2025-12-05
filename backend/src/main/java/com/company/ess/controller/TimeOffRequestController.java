package com.company.ess.controller;

import com.company.ess.dto.PageResponse;
import com.company.ess.dto.TimeOffRequestDTO;
import com.company.ess.entity.TimeOffRequest;
import com.company.ess.service.TimeOffService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/time-off-requests")
public class TimeOffRequestController {

    @Autowired
    private TimeOffService timeOffService;

    @GetMapping
    public ResponseEntity<PageResponse<TimeOffRequestDTO>> getAllRequests(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        PageResponse<TimeOffRequestDTO> response = timeOffService.getAllRequests(page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimeOffRequestDTO> getRequestById(@PathVariable Long id) {
        TimeOffRequestDTO request = timeOffService.getRequestById(id);
        return ResponseEntity.ok(request);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<PageResponse<TimeOffRequestDTO>> getRequestsByEmployeeId(
            @PathVariable Long employeeId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        PageResponse<TimeOffRequestDTO> response = timeOffService.getRequestsByEmployeeId(employeeId, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<PageResponse<TimeOffRequestDTO>> getRequestsByStatus(
            @PathVariable TimeOffRequest.Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        PageResponse<TimeOffRequestDTO> response = timeOffService.getRequestsByStatus(status, page, size);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<TimeOffRequestDTO> createRequest(@Valid @RequestBody TimeOffRequestDTO requestDTO) {
        TimeOffRequestDTO created = timeOffService.createRequest(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TimeOffRequestDTO> updateRequestStatus(
            @PathVariable Long id,
            @RequestParam TimeOffRequest.Status status,
            @RequestParam(required = false) Long approverId,
            @RequestParam(required = false) String rejectionReason) {
        
        TimeOffRequestDTO updated = timeOffService.updateRequestStatus(id, status, approverId, rejectionReason);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        timeOffService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }
}