package com.app.complaint.service;

import com.app.complaint.entity.Complaint;
import com.app.complaint.entity.User;
import com.app.complaint.entity.enums.Status;
import com.app.complaint.repository.ComplaintRepository;
import com.app.complaint.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    public Complaint submitComplaint(Long userId, Complaint complaint) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        complaint.setUser(user);
        return complaintRepository.save(complaint);
    }

    public List<Complaint> getUserComplaints(Long userId) {
        return complaintRepository.findByUserId(userId);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public Complaint updateComplaintStatus(Long complaintId, Status newStatus, String resolutionNote) {
        Complaint complaint = complaintRepository.findById(complaintId)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));
        
        complaint.setStatus(newStatus);
        if (resolutionNote != null && !resolutionNote.isEmpty()) {
            complaint.setResolutionNote(resolutionNote);
        }
        return complaintRepository.save(complaint);
    }

    public Map<String, Long> getDashboardStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalComplaints", complaintRepository.count());
        stats.put("openComplaints", complaintRepository.countByStatus(Status.OPEN));
        stats.put("inProgressComplaints", complaintRepository.countByStatus(Status.IN_PROGRESS));
        stats.put("resolvedComplaints", complaintRepository.countByStatus(Status.RESOLVED));
        return stats;
    }
}