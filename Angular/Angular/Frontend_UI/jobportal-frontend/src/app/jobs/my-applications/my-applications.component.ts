import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {
  apps: any[] = [];

  constructor(private appService: ApplicationService, private auth: AuthService) {}

  ngOnInit() {
    const userId = this.auth.getUserId();
    if (userId === null) {
      console.error('User not logged in or token invalid');
      return;
    }

    this.appService.getByUser(userId).subscribe({
      next: (res: any) => this.apps = res,
      error: err => console.error('Error loading applications', err)
    });
  }
}
