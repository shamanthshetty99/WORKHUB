package com.company.ess;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.sql.*;

public class PasswordFixer {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "Admin123!";
        String newHash = encoder.encode(password);
        
        System.out.println("Updating password for admin@company.com...");
        System.out.println("New hash: " + newHash);
        
        String url = "jdbc:postgresql://localhost:5432/ess_portal";
        String user = "postgres";
        String dbPassword = "postgres";
        
        try (Connection conn = DriverManager.getConnection(url, user, dbPassword)) {
            String sql = "UPDATE employees SET password = ? WHERE email = 'admin@company.com'";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, newHash);
            int updated = stmt.executeUpdate();
            System.out.println("SUCCESS! Updated " + updated + " employee(s)");
        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
            e.printStackTrace();
        }
    }
}