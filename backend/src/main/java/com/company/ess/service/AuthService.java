package com.company.ess.service;

import com.company.ess.dto.EmployeeDTO;
import com.company.ess.dto.LoginRequest;
import com.company.ess.dto.LoginResponse;
import com.company.ess.entity.Employee;
import com.company.ess.repository.EmployeeRepository;
import com.company.ess.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeService employeeService;

    public LoginResponse login(LoginRequest loginRequest) {
        // Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        // Load user details
        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());

        // Generate JWT token
        final String jwt = jwtUtil.generateToken(userDetails);

        // Get employee details
        Employee employee = employeeRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        EmployeeDTO employeeDTO = employeeService.convertToDTO(employee);

        return new LoginResponse(jwt, employeeDTO);
    }
}