package com.app.complaint.controller;

import com.app.complaint.entity.Complaint;
import com.app.complaint.entity.enums.Status;
import com.app.complaint.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping("/submit")
    public ResponseEntity<Complaint> createComplaint(@RequestHeader("user-id") Long userId, @RequestBody Complaint complaint) {
        return ResponseEntity.ok(complaintService.submitComplaint(userId, complaint));
    }

    @GetMapping("/my-complaints")
    public ResponseEntity<List<Complaint>> getMyComplaints(@RequestHeader("user-id") Long userId) {
        return ResponseEntity.ok(complaintService.getUserComplaints(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @PutMapping("/{complaintId}/update")
    public ResponseEntity<Complaint> updateStatus(
            @PathVariable Long complaintId,
            @RequestParam Status status,
            @RequestParam(required = false) String resolutionNote) {
        return ResponseEntity.ok(complaintService.updateComplaintStatus(complaintId, status, resolutionNote));
    }
}