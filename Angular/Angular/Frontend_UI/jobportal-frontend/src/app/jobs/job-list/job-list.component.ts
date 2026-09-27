import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../jobs/application.service'
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  form!: FormGroup;
  jobs: any[] = [];
  

  constructor(
    private jobService: JobService, 
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    public auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({ q: [''] });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    const q = this.form.get('q')?.value || '';
    this.jobService.list(q, 0, 20).subscribe((res: any) => {
      this.jobs = res.content ?? res;
    });
  }

  search() {
    this.load();
  }

  // ✅ Apply Job Logic
  applyJob(jobId: number) {
  const userId = this.auth.getUserId();

  if (!userId) {
    alert("Please login to apply.");
    this.router.navigate(['/login']);
    return;
  }

  // ✅ Redirect user to Apply Job page
  this.router.navigate(['/apply', jobId]);
}

viewApplicants(jobId: number) {
  this.router.navigate(['/applicants', jobId]);
}


}
