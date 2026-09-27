package com.example.jobportal.service;

import com.example.jobportal.model.Application;
import com.example.jobportal.model.Job;
import com.example.jobportal.model.User;
import com.example.jobportal.repository.ApplicationRepository;
import com.example.jobportal.repository.JobRepository;
import com.example.jobportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    // Apply for a job
    public Application applyForJob(Long jobId, Long userId, String coverLetter, String resumeUrl) {
        Optional<Job> jobOpt = jobRepository.findById(jobId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (jobOpt.isEmpty() || userOpt.isEmpty()) {
            throw new RuntimeException("Job or User not found");
        }

        Application application = new Application();
        application.setJob(jobOpt.get());
        application.setApplicant(userOpt.get());
        application.setCoverLetter(coverLetter);
        application.setResumeUrl(resumeUrl);
        application.setStatus("APPLIED");

        return applicationRepository.save(application);
    }

    // Get all applications for a specific job (for employer)
    public List<Application> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    // Get all applications by a user (for job seeker)
    public List<Application> getApplicationsByUser(Long userId) {
        return applicationRepository.findByApplicantId(userId);
    }

    // Update application status (for employer)
    public Application updateApplicationStatus(Long id, String status) {
        Application app = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(status);
        return applicationRepository.save(app);
    }
}
