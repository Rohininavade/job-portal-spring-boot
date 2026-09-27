import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobService } from '../job.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
  })
export class JobCreateComponent {
  form!: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private jobService: JobService, private router: Router) {
    this.form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    type: ['Internship'],
    location: [''],
    stipendSalary: [''],
    skills: ['']
  });
  
  }

  submit() {
    if (this.form.invalid) return;
    this.jobService.create(this.form.value).subscribe({
      next: () => this.router.navigate(['/jobs']),
      error: err => this.error = err?.error?.message || 'Create failed'
    });
  }
}
