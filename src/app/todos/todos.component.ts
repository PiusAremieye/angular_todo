import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../_services/todo.service';
import { User } from '../_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { Todo } from '../_models/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  user: User;
  todos: Todo[];
  todo: Todo;
  todosLen: number;
  todoForm: FormGroup;
  errorMessage: string;
  isSubmitted = false;

  constructor(
    private todoService: TodoService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.authService.userValue;
  }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
    });

    this.todoService
      .getTodos()
      .pipe(first())
      .subscribe((todos) => {
        this.todos = todos;
        this.todosLen = this.todos.length;
      });
  }

  get formControls() {
    return this.todoForm.controls;
  }

  addTodo() {
    this.isSubmitted = true;

    if (this.todoForm.invalid) {
      return;
    }

    this.todoService
      .addTodo(this.todoForm.value)
      .pipe(first())
      .subscribe(
        () => {},
        (error) => {
          this.errorMessage = error;
        }
      );
  }

  deleteTodo(id: number) {
    // todo.isDeleting = true;
    this.todoService.deleteTodo(id).pipe(first()).subscribe();
  }

  refreshTodos() {
    this.todoService
      .getTodos()
      .pipe(first())
      .subscribe((todos) => {
        this.todos = todos;
      });
  }
}
