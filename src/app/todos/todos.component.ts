import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { JwtResponse } from '../_models/jwt-response';
import { User } from '../_models/user';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.user = this.authService.userValue;
  }

  ngOnInit(): void {
    // if (!this.authService.isAuthenticated) {
    //   console.log(this.authService.isAuthenticated);
    //   this.router.navigate(['/']);
    // }
  }
}
