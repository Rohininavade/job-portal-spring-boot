import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApplicationService } from '../application.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent implements OnInit {

  jobId!: number;
  job: any;
  form!: FormGroup;
  alreadyApplied = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private appService: ApplicationService,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      coverLetter: [''],
      resumeUrl: ['']
    });
  }

  ngOnInit() {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadJob(this.jobId);
    this.checkIfAlreadyApplied();
  }

  apply() {
    const userId = this.auth.getUserId();
    if (!userId) return;

    const { coverLetter, resumeUrl } = this.form.value;

    this.appService.apply({ jobId: this.jobId, userId, coverLetter, resumeUrl })
      .subscribe({
        next: () => {
          alert("🎉 Application submitted successfully!");
          this.router.navigate(['/jobs']);
        },
        error: () => alert("Something went wrong")
      });
  }

  checkIfAlreadyApplied() {
    const userId = this.auth.getUserId();
    if (!userId) return;

    this.appService.getByUser(userId).subscribe({
    next: (apps) => {   // apps will be treated as any[]
      const appsArray = apps as any[];
      this.alreadyApplied = appsArray.some(a => a.job?.id === this.jobId);
    },
    error: err => console.error(err)
  });
  }

  loadJob(id: number) {
    this.appService.getJob(id).subscribe({
      next: (res) => this.job = res,
      error: (err) => console.error("Job fetch error", err)
    });
  }

  // Public method to use in template
  goBack() {
    this.router.navigate(['/jobs']);
  }
}
