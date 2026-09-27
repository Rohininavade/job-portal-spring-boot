import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../application.service';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-applicants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.scss']
})
export class ViewApplicantsComponent implements OnInit {
  jobId!: number;
  apps: any[] = [];
  successMessage = "";


  constructor(private route: ActivatedRoute, private appService: ApplicationService) {}

  ngOnInit() {
    this.jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    this.load();
  }

  load() {
    this.appService.getByJob(this.jobId).subscribe((res: any) => this.apps = res);
  }

  saveStatus(app: any) {
  this.appService.updateStatus(app.id, app.newStatus).subscribe({
    next: () => {
      this.successMessage = "Status updated successfully!";
      app.status = app.newStatus; // Update local data without reload

      setTimeout(() => {
        this.successMessage = "";
      }, 2000);
    },
    error: () => alert("Failed to update status")
  });
}
selectStatus(app: any, status: string) {
  app.newStatus = status;
  app.showOptions = false;
}


}
