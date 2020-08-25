import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.paramMap.subscribe((params) => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    const auth = this.authService.userValue;
    if (auth) {
      this.authNavbar = true;
    } else {
      this.authNavbar = false;
    }
  }

  logout() {
    this.authService.logout();
  }
}
