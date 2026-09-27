package com.example.jobportal.controller;

import com.example.jobportal.dto.*;
import com.example.jobportal.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping
    public Page<JobResponseDTO> list(@RequestParam(required = false) String title,
                                     @RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "10") int size) {
        return jobService.listJobs(title, page, size);
    }

    @PostMapping
    public JobResponseDTO create(@Valid @RequestBody JobRequestDTO dto, Authentication auth) {
        String username = (String) auth.getPrincipal();
        return jobService.createJob(dto, username);
    }
    
    @GetMapping("/{id}")
    public JobResponseDTO get(@PathVariable Long id) {
        return jobService.get(id);
    }

}
