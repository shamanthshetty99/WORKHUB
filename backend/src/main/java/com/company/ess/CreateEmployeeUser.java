package com.company.ess;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.sql.*;

public class CreateEmployeeUser {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "Admin123!";
        String hash = encoder.encode(password);
        
        String url = "jdbc:postgresql://localhost:5432/ess_portal";
        String user = "postgres";
        String dbPassword = "postgres";
        
        try (Connection conn = DriverManager.getConnection(url, user, dbPassword)) {
            String sql = "UPDATE employees SET password = ?, role = 'EMPLOYEE' WHERE email = 'john.doe@company.com'";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, hash);
            int updated = stmt.executeUpdate();
            
            if (updated > 0) {
                System.out.println("SUCCESS! John Doe is now an EMPLOYEE");
                System.out.println("Email: john.doe@company.com");
                System.out.println("Password: Admin123!");
            } else {
                System.out.println("No user found");
            }
        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
        }
    }
}