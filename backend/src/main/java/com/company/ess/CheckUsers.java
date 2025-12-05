package com.company.ess;

import java.sql.*;

public class CheckUsers {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/ess_portal";
        String user = "postgres";
        String password = "postgres";
        
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            String sql = "SELECT id, email, first_name, last_name, role FROM employees ORDER BY id";
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            
            System.out.println("=== ALL USERS IN DATABASE ===");
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id"));
                System.out.println("Email: " + rs.getString("email"));
                System.out.println("Name: " + rs.getString("first_name") + " " + rs.getString("last_name"));
                System.out.println("Role: " + rs.getString("role"));
                System.out.println("---");
            }
        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
        }
    }
}