package com.example.jobportal.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class JobRequestDTO {
    @NotBlank private String title;
    private String description;
    private String type;
    private String location;
    private String stipendSalary;
    private String skills;
}
