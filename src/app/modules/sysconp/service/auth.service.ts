import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api-sysconp.onrender.com/auth/';
  private accessToken: string | any = null;
  private refreshToken: string | any = null;
  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(login:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login',login).pipe(
      tap(user => {
        this.accessToken = user.backendTokens.accessToken;
        this.refreshToken = user.backendTokens.refreshToken;
        this.userSubject.next(true);
        localStorage.setItem('accessToken', this.accessToken);
        localStorage.setItem('refreshToken', this.refreshToken);
        
      })
    );
  }

  refreshAccessToken(): Observable<any> {
    if (!this.refreshToken) {
      return of(null);
    }

    return this.http.post<any>(`${this.apiUrl}refresh`, { refreshToken: this.refreshToken }).pipe(
      tap(response => {
        this.accessToken = response.accessToken;
       
        localStorage.setItem('accessToken', this.accessToken);
      }),
      catchError(error => {
        this.logout(); 
        return of(null);
      })
    );
  }

  logout() {
    this.accessToken = null;
    this.refreshToken = null;
    this.userSubject.next(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
