package com.example.jobportal.dto;

import lombok.Data;
@Data
public class JobResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String companyName;
    private String location;
    private String skills;
    private String stipendSalary;
}
