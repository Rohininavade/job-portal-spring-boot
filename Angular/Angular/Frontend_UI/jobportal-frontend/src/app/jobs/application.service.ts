import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private base = `${environment.apiBaseUrl}/applications`;

  constructor(private http: HttpClient) {}

  apply(data: any) {
    return this.http.post(`${this.base}/apply`, data);
  }

  getByJob(jobId: number) {
    return this.http.get(`${this.base}/job/${jobId}`);
  }

  getByUser(userId: number) {
    return this.http.get(`${this.base}/user/${userId}`);
  }

  updateStatus(id: number, status: string) {
    return this.http.put(`${this.base}/${id}/status`, { status });
  }

  getJob(id: number) {
  return this.http.get(`${environment.apiBaseUrl}/jobs/${id}`);
}

}
