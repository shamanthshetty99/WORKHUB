package com.company.ess;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class EssPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(EssPortalApplication.class, args);
    }

}