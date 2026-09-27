import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApplicationService } from '../../jobs/application.service'


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ IMPORTANT: include RouterModule
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    public auth: AuthService, 
    private router: Router,
    private applicationService: ApplicationService
) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
