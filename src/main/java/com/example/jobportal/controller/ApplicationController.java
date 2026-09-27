package com.example.jobportal.controller;

import com.example.jobportal.model.Application;
import com.example.jobportal.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<Application> applyJob(@RequestBody Map<String, Object> request) {
        Long jobId = Long.parseLong(request.get("jobId").toString());
        Long userId = Long.parseLong(request.get("userId").toString());
        String coverLetter = request.get("coverLetter").toString();
        String resumeUrl = request.get("resumeUrl").toString();

        Application application = applicationService.applyForJob(jobId, userId, coverLetter, resumeUrl);
        return ResponseEntity.ok(application);
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicationsByJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsByJob(jobId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Application>> getApplicationsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(applicationService.getApplicationsByUser(userId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status));
    }
}
