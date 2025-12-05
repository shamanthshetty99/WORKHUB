package com.company.ess.controller;

import com.company.ess.dto.AuthRequest;
import com.company.ess.dto.AuthResponse;
import com.company.ess.entity.Employee;
import com.company.ess.security.JwtUtil;
import com.company.ess.security.CustomUserDetailsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private CustomUserDetailsService userDetailsService;
    private JwtUtil jwtUtil;

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Autowired
    public void setUserDetailsService(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Autowired
    public void setJwtUtil(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    authRequest.getEmail(),
                    authRequest.getPassword()
                )
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final Employee employee = userDetailsService.getEmployeeByEmail(authRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        AuthResponse response = new AuthResponse();
        response.setToken(jwt);
        response.setEmail(employee.getEmail());
        response.setFirstName(employee.getFirstName());
        response.setLastName(employee.getLastName());
        response.setRole(employee.getRole().name());
        response.setEmployeeId(employee.getId());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            String email = jwtUtil.extractUsername(jwt);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            
            if (email != null && jwtUtil.validateToken(jwt, userDetails)) {
                Employee employee = userDetailsService.getEmployeeByEmail(email);
                
                AuthResponse response = new AuthResponse();
                response.setToken(jwt);
                response.setEmail(employee.getEmail());
                response.setFirstName(employee.getFirstName());
                response.setLastName(employee.getLastName());
                response.setRole(employee.getRole().name());
                response.setEmployeeId(employee.getId());
                
                return ResponseEntity.ok(response);
            }
        }
        
        return ResponseEntity.status(401).body("Invalid token");
    }
}