package com.example.jobportal.model;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "applications")
public class Application {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Job job;

    @ManyToOne
    private User applicant; // job seeker

    @Column(length = 4000)
    private String coverLetter;

    private String resumeUrl;
    private String status = "APPLIED"; // APPLIED, SHORTLISTED, REJECTED, HIRED
    private LocalDateTime appliedAt = LocalDateTime.now();
}

