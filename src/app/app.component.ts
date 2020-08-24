import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    if (this.authService.userValue) {
      this.router.navigate(['/todos']);
    }
  }
  title = 'todo-app';

  ngOnInit(): void {}
}
