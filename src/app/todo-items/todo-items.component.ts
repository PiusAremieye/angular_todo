import { Component, OnInit } from '@angular/core';
import { TodoItemService } from '../_services/todo-item.service';
import { first } from 'rxjs/operators';
import { Todo } from '../_models/todo';
import { Item } from '../_models/item';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css'],
})
export class TodoItemsComponent implements OnInit {
  todo: Todo;
  items: [];
  itemsLen: number;
  todoId: number;
  itemForm: FormGroup;
  isSubmitted: boolean;
  errorMessage: string;

  constructor(
    private todoItemService: TodoItemService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      done: [false, Validators.required],
    });

    this.todoId = this.route.snapshot.params['id'];
    this.todoItemService
      .viewTodo(this.todoId)
      .pipe(first())
      .subscribe((todo) => {
        this.todo = todo;
        this.items = this.todo.items;
        this.itemsLen = this.items.length;
      });
  }

  get formControls() {
    return this.itemForm.controls;
  }

  addItem() {
    this.isSubmitted = true;

    if (this.itemForm.invalid) {
      return;
    }

    this.todoId = this.route.snapshot.params['id'];

    this.todoItemService
      .addItem(this.itemForm.value, this.todoId)
      .pipe(first())
      .subscribe(
        () => {},
        (error) => {
          this.errorMessage = error;
        }
      );
  }

  deleteTodo(todo_id: number, item_id: number) {
    console.log(todo_id + ' === ' + item_id);

    // todo.isDeleting = true;
    this.todoItemService.deleteItem(todo_id, item_id).pipe(first()).subscribe();
  }

  refreshItems() {
    this.todoId = this.route.snapshot.params['id'];
    this.todoItemService
      .viewTodo(this.todoId)
      .pipe(first())
      .subscribe((todo) => {
        this.todo = todo;
        this.items = this.todo.items;
      });
  }
}
