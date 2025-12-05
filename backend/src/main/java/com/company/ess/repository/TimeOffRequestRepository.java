package com.company.ess.repository;

import com.company.ess.entity.TimeOffRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeOffRequestRepository extends JpaRepository<TimeOffRequest, Long> {

    Page<TimeOffRequest> findByEmployeeId(Long employeeId, Pageable pageable);

    Page<TimeOffRequest> findByStatus(TimeOffRequest.Status status, Pageable pageable);

    List<TimeOffRequest> findByEmployeeIdAndStatus(Long employeeId, TimeOffRequest.Status status);

    List<TimeOffRequest> findByEmployeeIdOrderByCreatedAtDesc(Long employeeId);

    Page<TimeOffRequest> findAllByOrderByCreatedAtDesc(Pageable pageable);
}