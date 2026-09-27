package com.example.jobportal.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 5000)
    private String description;

    private String type; // "Full-Time", "Internship" etc
    private String location;
    private String stipendSalary;
    private String skills; // comma separated for MVP

    private LocalDateTime deadline;
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    private User company; // owner (company user)
}
