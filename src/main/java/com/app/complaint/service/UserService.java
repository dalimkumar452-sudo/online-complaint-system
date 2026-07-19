package com.app.complaint.service;

import com.app.complaint.entity.User;
import com.app.complaint.entity.enums.Role;
import com.app.complaint.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        user.setRole(Role.USER); // Default role
        return userRepository.save(user);
    }
}