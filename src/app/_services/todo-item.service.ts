import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Todo } from '../_models/todo';
import { Item } from '../_models/item';

@Injectable({
  providedIn: 'root',
})
export class TodoItemService {
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

  viewTodo(id: number) {
    return this.http.get<Todo>(
      `${environment.apiUrl}/todos/${id}`,
      this.httpOptions
    );
  }

  addItem(item: Item, id: number): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/todos/${id}/items`, item, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteItem(todo_it: number, item_id: number) {
    return this.http
      .delete(
        `${environment.apiUrl}/todos/${todo_it}/items/${item_id}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
}
