import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(`${this.api}/signup`, data);
  }

  login(credentials: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.api}/login`, credentials)
      .pipe(tap(res => {
        if (res?.token) {
          sessionStorage.setItem('token', res.token);   // ✅ here
        }
      }));
  }

  logout() {
    sessionStorage.clear();   // ✅ here
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');   // ✅ here
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  getUserRole(): string | null {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.role || decoded.userType || null : null;
  }

  getUserId(): number | null {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.userId || decoded.id : null;
  }
}
