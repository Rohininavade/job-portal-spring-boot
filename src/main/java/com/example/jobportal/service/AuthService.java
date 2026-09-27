package com.example.jobportal.service;

import com.example.jobportal.dto.*;
import com.example.jobportal.model.*;
import com.example.jobportal.repository.UserRepository;
import com.example.jobportal.security.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username exists");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email exists");
        }
        User u = new User();
        u.setUsername(req.getUsername());
        u.setEmail(req.getEmail());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        u.setRole(req.getRole() == null ? Role.JOB_SEEKER : req.getRole());
        u.setName(req.getName());
        userRepository.save(u);
    }

    public String login(AuthRequest req) {
        var opt = userRepository.findByUsername(req.getUsername());
        if (opt.isEmpty()) throw new RuntimeException("Invalid credentials");
        var user = opt.get();
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return jwtUtil.generateToken(user.getId(), user.getUsername(), user.getRole().name());
    }
}

