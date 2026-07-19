package com.app.complaint.controller;

import com.app.complaint.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "*") 
public class DashboardController {

    @Autowired
    private ComplaintService complaintService;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getDashboardAnalytics() {
        return ResponseEntity.ok(complaintService.getDashboardStats());
    }
}