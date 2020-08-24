import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authNavbar: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    const auth = this.authService.userValue;
    console.log(auth);
    if (auth) {
      this.authNavbar = true;
    } else {
      this.authNavbar = false;
    }
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
