import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
// import { AuthService } from '.auth/auth.service';

@Injectable({ providedIn: 'root' })
export class JobService {
  private api = `${environment.apiBaseUrl}/jobs`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  list(title = '', page = 0, size = 10): Observable<any> {
  const headers = this.getAuthHeaders();
  let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
  if (title) params = params.set('title', title);
  return this.http.get(this.api, { headers, params });
}


  create(job: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.api, job, { headers });
  }

  get(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.api}/${id}`, { headers });
  }
}
