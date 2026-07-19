package com.app.complaint.repository;

import com.app.complaint.entity.Complaint;
import com.app.complaint.entity.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUserId(Long userId);
    long countByStatus(Status status);
}