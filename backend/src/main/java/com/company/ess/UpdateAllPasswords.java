package com.company.ess;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.sql.*;

public class UpdateAllPasswords {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "Admin123!";
        String hash = encoder.encode(password);
        
        String url = "jdbc:postgresql://localhost:5432/ess_portal";
        String user = "postgres";
        String dbPassword = "postgres";
        
        try (Connection conn = DriverManager.getConnection(url, user, dbPassword)) {
            String sql = "UPDATE employees SET password = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, hash);
            int updated = stmt.executeUpdate();
            
            System.out.println("SUCCESS! Updated " + updated + " employees");
            System.out.println("All users can now login with password: Admin123!");
            System.out.println("");
            System.out.println("Try these credentials:");
            System.out.println("ADMIN: admin@company.com / Admin123!");
            System.out.println("EMPLOYEE: john.doe@company.com / Admin123!");
        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
        }
    }
}