import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-authentication',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
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
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  get formControls() {
    return this.authForm.controls;
  }

  register() {
    this.isSubmitted = true;

    if (this.authForm.invalid) {
      console.log('Error trying to create account');
      return;
    }
    this.authService
      .register(this.authForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log('Account created!');
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }
}
