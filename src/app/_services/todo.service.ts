import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Todo } from '../_models/todo';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

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

  get token() {
    const token = localStorage.getItem('Token');
    return token;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.token}`,
    }),
  };

  requestParams = {
    params: new HttpParams({ fromString: '_page=1' }),
  };

  addTodo(todo: Todo): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/todos`, todo, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getTodos() {
    return this.http.get<Todo[]>(
      `${environment.apiUrl}/todos`,
      this.httpOptions
    );
  }

  deleteTodo(id: number) {
    return this.http
      .delete(`${environment.apiUrl}/todos/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
