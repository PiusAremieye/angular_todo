import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';
import { JwtResponse } from '../_models/jwt-response';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authSubject: BehaviorSubject<Boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.authSubject = new BehaviorSubject<Boolean>(false);
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error.message}`
      );
    }
    return throwError(error.error.message);
  }

  get userValue(): User {
    const user_details = JSON.parse(localStorage.getItem('User_details'));
    return user_details;
  }

  register(signUpDetails: User): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/auth/signup`, signUpDetails)
      .pipe(catchError(this.handleError));
  }

  login(loginDetails: User): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/auth/login`, loginDetails)
      .pipe(
        tap(async (res: JwtResponse) => {
          if (res.loggin_details) {
            localStorage.setItem('Token', res.loggin_details.auth_token);
            localStorage.setItem(
              'User_details',
              JSON.stringify(res.loggin_details.user_details)
            );
            this.authSubject.next(true);
          }
        })
      )
      .pipe(catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('User_details');
    this.authSubject.next(false);
    this.router.navigate(['/']);
  }
}
