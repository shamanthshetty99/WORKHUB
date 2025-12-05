package com.company.ess.dto;

public class LoginResponse {

    private String token;
    private String type = "Bearer";
    private EmployeeDTO employee;

    // Constructors
    public LoginResponse() {
    }

    public LoginResponse(String token, EmployeeDTO employee) {
        this.token = token;
        this.employee = employee;
        this.type = "Bearer";
    }

    public LoginResponse(String token, String type, EmployeeDTO employee) {
        this.token = token;
        this.type = type;
        this.employee = employee;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public EmployeeDTO getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeDTO employee) {
        this.employee = employee;
    }
}