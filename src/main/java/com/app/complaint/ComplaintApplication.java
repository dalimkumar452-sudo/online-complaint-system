package com.app.complaint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ComplaintApplication {
    public static void main(String[] args) {
        SpringApplication.run(ComplaintApplication.class, args);
        System.out.println("🚀 Backend Server Started on Port 8080!");
    }
}