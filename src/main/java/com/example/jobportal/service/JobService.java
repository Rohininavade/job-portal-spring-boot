package com.example.jobportal.service;

import com.example.jobportal.dto.*;
import com.example.jobportal.model.*;
import com.example.jobportal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public Page<JobResponseDTO> listJobs(String title, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Job> p = (title == null || title.isBlank()) ?
                jobRepository.findAll(pageable) : jobRepository.findByTitleContainingIgnoreCase(title, pageable);
        return p.map(j -> {
            JobResponseDTO dto = new JobResponseDTO();
            dto.setId(j.getId());
            dto.setTitle(j.getTitle());
            dto.setDescription(j.getDescription());
            dto.setCompanyName(j.getCompany() != null ? j.getCompany().getName() : null);
            dto.setLocation(j.getLocation());
            dto.setSkills(j.getSkills());
            dto.setStipendSalary(j.getStipendSalary());
            return dto;
        });
    }

    public JobResponseDTO createJob(JobRequestDTO dto, String companyUsername) {
        var company = userRepository.findByUsername(companyUsername)
                .orElseThrow(() -> new RuntimeException("Company user not found"));
        Job job = new Job();
        job.setTitle(dto.getTitle());
        job.setDescription(dto.getDescription());
        job.setType(dto.getType());
        job.setLocation(dto.getLocation());
        job.setStipendSalary(dto.getStipendSalary());
        job.setSkills(dto.getSkills());
        job.setCompany(company);
        jobRepository.save(job);
        JobResponseDTO res = new JobResponseDTO();
        res.setId(job.getId());
        res.setTitle(job.getTitle());
        res.setDescription(job.getDescription());
        res.setCompanyName(company.getName());
        res.setLocation(job.getLocation());
        res.setSkills(job.getSkills());
        res.setStipendSalary(job.getStipendSalary());
        return res;
    }
    
    public JobResponseDTO get(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        JobResponseDTO dto = new JobResponseDTO();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setCompanyName(job.getCompany() != null ? job.getCompany().getName() : null);
        dto.setLocation(job.getLocation());
        dto.setSkills(job.getSkills());

        return dto;
    }


}

