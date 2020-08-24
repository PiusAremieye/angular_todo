import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-authentication',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  errorMessage: string;
  isSubmitted = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.authForm.controls;
  }

  signin() {
    this.isSubmitted = true;

    if (this.authForm.invalid) {
      return;
    }

    this.authService
      .login(this.authForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/todos']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }
}
