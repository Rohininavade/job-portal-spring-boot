import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobCreateComponent } from './jobs/job-create/job-create.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './shared/home/home.component';
import { ApplyJobComponent } from './jobs/apply-job/apply-job.component';
import { ViewApplicantsComponent } from './jobs/view-applicants/view-applicants.component';
import { MyApplicationsComponent } from './jobs/my-applications/my-applications.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Public Home Page
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Jobs routes
  { path: 'jobs', component: JobListComponent, canActivate: [AuthGuard] },
  { path: 'jobs/create', component: JobCreateComponent, canActivate: [AuthGuard] },
  { path: 'apply/:id', component: ApplyJobComponent, canActivate: [AuthGuard] },

  // Company-only: View applicants
  { path: 'applicants/:jobId', component: ViewApplicantsComponent, canActivate: [AuthGuard] },

  // Job seeker-only: My Applications
  { path: 'applications', component: MyApplicationsComponent, canActivate: [AuthGuard] },

  // Wildcard redirect
  { path: '**', redirectTo: '' }
];
