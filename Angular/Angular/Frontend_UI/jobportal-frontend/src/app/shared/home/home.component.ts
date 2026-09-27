import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // ✅ fixed property name
})
export class HomeComponent {
  constructor(private router: Router, public auth: AuthService) {}

  browseJobs() {
    this.router.navigate(['/jobs']);
  }

  postJob() {
    if (this.auth.isLoggedIn() && this.auth.getUserRole() === 'COMPANY') {
      this.router.navigate(['/jobs/create']);
    } else {
      this.router.navigate(['/signup']);
    }
  }
}
